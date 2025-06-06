'use client';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import itemStats from '../../formulas/sf/itemstats';
import { calculateKMS } from '../../formulas/starforceCalc';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Item } from '../../../../types/item';

// Type definitions moved to top for better organization
interface StarForceProps {
  selectedGear: Item | null;
  setEndStar: Dispatch<SetStateAction<string>>;
  setSfRes: Dispatch<SetStateAction<StarForceResults | null>>;
}

type InputState = {
  itemLevel: number | string;
  startStar: string;
  endStar: string;
};

export interface StarForceResults {
  averageCost?: string;
  averageBooms?: string;
  luckyCost?: string;
  unluckyCost?: string;
  stats: {
    finalStats?: { stat: number; att: number };
    difference: { stat: number; att: number };
  };
  medianCost?: string;
  cost?: number;
}

interface EventState {
  canStarforce: boolean;
  starCatch: boolean;
  safeguard: boolean;
  discount30: boolean;
  reducedBooms: boolean;
  disabledReason?: 'none' | 'soft' | 'hard';
}

const MVP_DISCOUNT_OPTIONS = [
  { value: 'none', label: 'None' },
  { value: 'silver', label: 'Silver' },
  { value: 'gold', label: 'Gold' },
  { value: 'diamond', label: 'Diamond' },
];

const NON_SF_TYPES = new Set([
  'Black_Heart',
  'Genesis_Badge',
  `Mitra's_Rage`,
  `Crystal_Ventus_Badge`,
  'Cursed_Spellbook',
  'Stone_Of_Eternal_Life',
  'Pinky_Holy_Cup',
  'Seven_Days_Badge',
]);

export default function StarForce({ selectedGear, setSfRes }: StarForceProps) {
  // State initialization
  const [inputs, setInputs] = useState<InputState>({
    itemLevel: selectedGear?.Level || '',
    startStar: '',
    endStar: '',
  });

  const [events, setEvents] = useState<EventState>({
    canStarforce: true,
    starCatch: false,
    safeguard: false,
    discount30: false,
    reducedBooms: false,
  });

  const [mvpDiscount, setMvpDiscount] = useState<string>('none');
  const [results, setResults] = useState<StarForceResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [debouncedInputs, setDebouncedInputs] = useState(inputs);

  // Memoized derived values
  const disabledState = useMemo(() => {
    if (!selectedGear) return { isDisabled: false, reason: 'none' };

    // Hard disabled check
    if (
      NON_SF_TYPES.has(selectedGear['Item Name']) ||
      selectedGear.Set === 'Genesis' ||
      selectedGear.Set === 'Ruin Force Shield' ||
      selectedGear['Item Name'].startsWith('P.No')
    ) {
      return { isDisabled: true, reason: 'hard' };
    }

    // User toggled disabled
    if (!events.canStarforce) {
      return { isDisabled: true, reason: 'soft' };
    }
    return { isDisabled: false, reason: 'none' };
  }, [selectedGear, events.canStarforce]);

  useEffect(() => {
    if (disabledState.reason === 'soft') {
      setInputs((prev) => ({ ...prev, startStar: '', endStar: '' }));
    }
    if (disabledState.reason === 'none') {
      setInputs((prev) => ({
        ...prev,
        endStar: localStorage.getItem('endStar'),
      }));
    }
  }, [disabledState.reason]);

  const attackValue = useMemo(
    () => Number(selectedGear?.ATK || selectedGear?.['M.ATK'] || 0),
    [selectedGear]
  );

  // Event handlers
  const handleEventToggle = useCallback((eventName: keyof EventState) => {
    setEvents((prev) => ({ ...prev, [eventName]: !prev[eventName] }));
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      if (['itemLevel', 'startStar', 'endStar'].includes(name)) {
        if (value !== '' && isNaN(Number(value))) return;
        setInputs((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  // Effects
  useEffect(() => {
    const savedEndStar = localStorage.getItem('endStar');
    if (savedEndStar) {
      setInputs((prev) => ({ ...prev, endStar: savedEndStar }));
    }
  }, []);

  useEffect(() => {
    if (inputs.endStar) {
      localStorage.setItem('endStar', inputs.endStar);
    }
  }, [inputs.endStar]);

  // Debounce effect
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedInputs(inputs), 300);
    return () => clearTimeout(timer);
  }, [inputs]);

  // Gear change effect
  useEffect(() => {
    if (!selectedGear) return;

    const cannotStarforce =
      NON_SF_TYPES.has(selectedGear['Item Name']) ||
      selectedGear.Set === 'Genesis' ||
      selectedGear['Item Name'].startsWith('P.No');

    setInputs((prev) => {
      let currentEndStar;
      if (
        NON_SF_TYPES.has(selectedGear['Item Name']) ||
        selectedGear['Item Name'].startsWith('P.No')
      )
        currentEndStar = 0;
      else if (selectedGear.Set === 'Genesis') currentEndStar = 22;
      else currentEndStar = localStorage.getItem('endStar') || '0';
      return {
        ...prev,
        itemLevel: selectedGear.Level || '',
        endStar: currentEndStar,
      };
    });

    setEvents((prev) => ({
      ...prev,
      canStarforce: !cannotStarforce,
      disabledReason: cannotStarforce ? 'hard' : prev.disabledReason || 'none',
    }));
  }, [selectedGear]);

  // Main calculation effect
  useEffect(() => {
    if (
      !selectedGear ||
      !debouncedInputs.itemLevel ||
      !debouncedInputs.endStar ||
      selectedGear.Set === 'Genesis'
    ) {
      setResults(null);
      setSfRes(null);
      return;
    }

    const itemLevelNum = Number(debouncedInputs.itemLevel);
    const startStarNum = debouncedInputs.startStar
      ? Math.max(0, Number(debouncedInputs.startStar))
      : 0;
    let endStarNum = Math.max(0, Number(debouncedInputs.endStar));

    // Determine max stars based on gear level
    const getMaxStars = (level) => {
      if (!level) return 0;
      if (level < 95) return 5;
      if (level < 108) return 8;
      if (level < 118) return 10;
      if (level < 128) return 15;
      if (level < 138) return 20;
      return 30;
    };

    // Apply star limits
    const maxAllowedStars =
      selectedGear.Set === 'Genesis' ? 22 : getMaxStars(itemLevelNum);

    endStarNum = Math.min(endStarNum, maxAllowedStars);

    // Validate inputs
    if (
      endStarNum <= startStarNum ||
      isNaN(endStarNum) ||
      isNaN(startStarNum) ||
      startStarNum > maxAllowedStars
    ) {
      setResults(null);
      setSfRes(null);
      return;
    }

    // Update endStar if clamped
    if (endStarNum.toString() !== debouncedInputs.endStar) {
      setInputs((prev) => ({
        ...prev,
        endStar: endStarNum.toString(),
        // Also ensure startStar doesn't exceed new max
        startStar: Math.min(
          Number(prev.startStar || 0),
          maxAllowedStars
        ).toString(),
      }));
      return;
    }

    setIsCalculating(true);

    const calculationTimer = setTimeout(() => {
      try {
        const starForceResult = calculateKMS(
          startStarNum,
          endStarNum,
          itemLevelNum,
          events.starCatch,
          events.safeguard,
          events.discount30,
          events.reducedBooms,
          mvpDiscount
        );

        const statsResult = itemStats(
          startStarNum,
          endStarNum,
          itemLevelNum,
          attackValue,
          selectedGear.Type === 'Weapon' ? 'Weapon' : undefined
        );

        const resultData = {
          ...starForceResult,
          stats: statsResult,
          maxAllowedStars, // Include in results for display
        };

        setResults(resultData);
        setSfRes(resultData);
      } catch (error) {
        console.error('Star Force calculation error:', error);
        setResults(null);
        setSfRes(null);
      } finally {
        setIsCalculating(false);
      }
    }, 0);

    return () => clearTimeout(calculationTimer);
  }, [
    debouncedInputs,
    events,
    mvpDiscount,
    selectedGear,
    setSfRes,
    attackValue,
  ]);

  // Render helpers
  const renderResults = useMemo(() => {
    if (isCalculating) return null;
    if (!results?.stats?.finalStats) return null;

    return (
      <div className="mt-6 space-y-4">
        <h3 className="font-medium text-lg">Star Force Results</h3>
        <div className="grid grid-cols-2 gap-4">
          <ResultItem label="Average Cost" value={results.averageCost} />
          <ResultItem label="Average Booms" value={results.averageBooms} />
          <ResultItem label="Lucky Cost" value={results.luckyCost} />
          <ResultItem label="Unlucky Cost" value={results.unluckyCost} />
        </div>

        <div className="mt-4">
          <h3 className="font-medium">Stat Differences</h3>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p>
                <strong>Final Stats:</strong>
              </p>
              <p>ATK: {results.stats.finalStats.att}</p>
              <p>STAT: {results.stats.finalStats.stat}</p>
            </div>
            <div>
              <p>
                <strong>Difference:</strong>
              </p>
              <p>ATK: +{results.stats.difference.att}</p>
              <p>STAT: +{results.stats.difference.stat}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }, [results, isCalculating]);

  return (
    <div
      className={`flex flex-col grow bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] h-full w-full justify-between ${
        disabledState.isDisabled ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-col gap-[8px]">
        <div className="flex w-full justify-between items-center">
          <div className="flex gap-2 items-center">
            <Image
              src="https://5pd8q9yvpv.ufs.sh/f/8nGwjuDDSJXHFfx84xZEOVRa453eNj2hcwmvSiBgztn9fCox"
              width={16}
              height={16}
              alt="star"
            />
            <h4>Star Force Calculator</h4>
          </div>
          {disabledState.reason !== 'hard' && (
            <Switch
              id="Can-Starforce"
              checked={events.canStarforce}
              onCheckedChange={() => handleEventToggle('canStarforce')}
              disabled={disabledState.reason === 'hard'}
            />
          )}
        </div>

        <div className="flex flex-col gap-[8px]">
          <div className="flex gap-[8px] w-full">
            <div className="w-full">
              <p className="p3">MVP Discount</p>
              <Select
                value={mvpDiscount}
                onValueChange={setMvpDiscount}
                disabled={disabledState.isDisabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="e.g. Silver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>MVP Discount</SelectLabel>
                    {MVP_DISCOUNT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-[8px] w-full">
            <InputField
              label="Start Star"
              name="startStar"
              value={inputs.startStar ?? ''}
              onChange={handleInputChange}
              placeholder="e.g. 0"
              disabled={disabledState.isDisabled}
            />
            <InputField
              label="End Star"
              name="endStar"
              value={inputs.endStar ?? ''}
              onChange={handleInputChange}
              placeholder="e.g. 15"
              disabled={disabledState.isDisabled}
            />
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] rounded-full bg-black opacity-20" />

      <div className="flex flex-col gap-[8px]">
        <div className="flex flex-col gap-[16px]">
          <h5>Events</h5>
          <EventSwitch
            id="Star-Catching"
            checked={events.starCatch}
            onToggle={() => handleEventToggle('starCatch')}
            label="Star Catching"
            disabled={disabledState.isDisabled}
          />
          <EventSwitch
            id="Safeguarding"
            checked={events.safeguard}
            onToggle={() => handleEventToggle('safeguard')}
            label="Safeguarding"
            disabled={disabledState.isDisabled}
          />
          <EventSwitch
            id="30%-off"
            checked={events.discount30}
            onToggle={() => handleEventToggle('discount30')}
            label="30% off"
            disabled={disabledState.isDisabled}
          />
          <EventSwitch
            id="-30%-booms"
            checked={events.reducedBooms}
            onToggle={() => handleEventToggle('reducedBooms')}
            label="-30% booms <21"
            disabled={disabledState.isDisabled}
          />
        </div>

        {renderResults}
      </div>
    </div>
  );
}

// Helper components for better readability
const InputField = ({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof Input>) => (
  <div>
    <p className="p3">{label}</p>
    <Input type="number" {...props} />
  </div>
);

const EventSwitch = ({
  id,
  checked,
  onToggle,
  label,
  disabled,
}: {
  id: string;
  checked: boolean;
  onToggle: () => void;
  label: string;
  disabled?: boolean;
}) => (
  <div className="flex gap-2 items-center">
    <Switch
      id={id}
      checked={checked}
      onCheckedChange={onToggle}
      disabled={disabled}
    />
    <Label htmlFor={id}>{label}</Label>
  </div>
);

const ResultItem = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p>
      <strong>{label}:</strong>
    </p>
    <p>{value || '-'}</p>
  </div>
);
