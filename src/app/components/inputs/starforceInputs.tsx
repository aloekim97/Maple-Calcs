'use client';
import { Dispatch, SetStateAction, useState, useEffect, useCallback } from 'react';
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
  averageCost: string;
  averageBooms: string;
  luckyCost: string;
  unluckyCost: string;
  stats: {
    finalStats?: { stat: number; att: number };
    difference: { stat: number; att: number };
  };
  medianCost?: string;
}

export default function StarForce({ selectedGear, setSfRes }: StarForceProps) {
  const [inputs, setInputs] = useState<InputState>({
    itemLevel: selectedGear?.Level || '',
    startStar: '',
    endStar: '',
  });
  useEffect(() => {
    const savedEndStar = localStorage.getItem('endStar');
    if (savedEndStar) {
      setInputs(prev => ({
        ...prev,
        endStar: savedEndStar
      }));
    }
  }, []);

  // Save endStar to localStorage whenever it changes
  useEffect(() => {
    if (inputs.endStar) {
      localStorage.setItem('endStar', inputs.endStar);
    }
  }, [inputs.endStar]);

  // Debounced inputs for calculations
  const [debouncedInputs, setDebouncedInputs] = useState(inputs);
  
  const [events, setEvents] = useState({
    canStarforce: true,
    starCatch: false,
    safeguard: false,
    discount30: false,
    reducedBooms: false,
  });

  const [mvpDiscount, setMvpDiscount] = useState<string>('none');
  const [results, setResults] = useState<StarForceResults | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);

  // Debounce input changes (300ms delay)
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInputs(inputs);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [inputs]);

  const handleEventToggle = useCallback((eventName: keyof typeof events) => {
    setEvents((prev) => ({
      ...prev,
      [eventName]: !prev[eventName],
    }));
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'itemLevel' || name === 'startStar' || name === 'endStar') {
      // Only allow numbers or empty string
      if (value !== '' && isNaN(Number(value))) return;

      setInputs((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  }, []);

  // Gear change handler
  useEffect(() => {
    if (!selectedGear) return;

    const nonSfTypes = ['Badge', 'Emblem', 'Pocket'];
    const cannotStarforce =
      nonSfTypes.includes(selectedGear.Type) || selectedGear.Set === 'Genesis';

    setInputs((prev) => ({
      ...prev,
      itemLevel: selectedGear.Level || '',
    }));

    setEvents((prev) => ({
      ...prev,
      canStarforce: !cannotStarforce,
    }));
  }, [selectedGear]);

  // Main calculation effect (using debounced inputs)
  useEffect(() => {
    if (!selectedGear || !debouncedInputs.itemLevel || !debouncedInputs.endStar) {
      setResults(null);
      setSfRes(null);
      return;
    }

    const itemLevelNum = Number(debouncedInputs.itemLevel);
    const startStarNum = debouncedInputs.startStar 
      ? Math.max(0, Number(debouncedInputs.startStar)) 
      : 0;
    let endStarNum = Math.max(0, Number(debouncedInputs.endStar));

    // Apply star limits
    if (selectedGear.Set === 'Genesis') {
      endStarNum = Math.min(endStarNum, 22);
    } else {
      endStarNum = Math.min(endStarNum, 25);
    }

    // Validate inputs
    if (endStarNum <= startStarNum || isNaN(endStarNum) || isNaN(startStarNum)) {
      setResults(null);
      setSfRes(null);
      return;
    }

    // Update endStar if it was clamped
    if (endStarNum.toString() !== debouncedInputs.endStar) {
      setInputs(prev => ({
        ...prev,
        endStar: endStarNum.toString()
      }));
      return;
    }

    setIsCalculating(true);
    
    // Calculate in a timeout to prevent UI blocking
    const calculationTimer = setTimeout(() => {
      try {
        const attackValue = Number(selectedGear.ATK || selectedGear['M.ATK'] || 0);
        
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
  }, [debouncedInputs, events, mvpDiscount, selectedGear, setSfRes]);

  const isDisabled = !events.canStarforce;

  return (
    <div
      className={`flex flex-col grow bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] h-full w-full justify-between ${
        isDisabled ? 'opacity-50' : ''
      }`}
    >
      <div className="flex flex-col gap-[16px]">
        <div className="flex w-full justify-between">
          <div className="flex gap-[8px]">
            <Image
              src="image/Star_Icon.svg"
              width={16}
              height={16}
              alt="star"
            />
            <h4>Star Force Calculator</h4>
          </div>
          <Switch
            id="Can-Starforce"
            checked={events.canStarforce}
            onCheckedChange={() => handleEventToggle('canStarforce')}
            disabled={isDisabled}
          />
        </div>
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[16px] w-full">
            <div className="w-full">
              <p className="p3">MVP Discount</p>
              <Select
                value={mvpDiscount}
                onValueChange={setMvpDiscount}
                disabled={isDisabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="e.g. Silver" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>MVP Discount</SelectLabel>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="diamond">Diamond</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex gap-[16px] w-full">
            <div>
              <p className="p3">Start Star</p>
              <Input
                type="number"
                name="startStar"
                value={inputs.startStar}
                onChange={handleInputChange}
                placeholder="e.g. 0"
                disabled={isDisabled}
              />
            </div>
            <div>
              <p className="p3">End Star</p>
              <Input
                type="number"
                name="endStar"
                value={inputs.endStar}
                onChange={handleInputChange}
                placeholder="e.g. 15"
                disabled={isDisabled}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[1px] rounded-full bg-black opacity-20" />

      <div className="flex flex-col gap-[16px]">
        <div className="flex flex-col gap-[16px]">
          <Label htmlFor="Events">Events</Label>
          <div className="flex gap-[8px]">
            <Switch
              id="Star-Catching"
              checked={events.starCatch}
              onCheckedChange={() => handleEventToggle('starCatch')}
              disabled={isDisabled}
            />
            <Label htmlFor="Star-Catching">Star Catching</Label>
          </div>
          <div className="flex gap-[8px]">
            <Switch
              id="Safeguarding"
              checked={events.safeguard}
              onCheckedChange={() => handleEventToggle('safeguard')}
              disabled={isDisabled}
            />
            <Label htmlFor="Safeguarding">Safeguarding</Label>
          </div>
          <div className="flex gap-[8px]">
            <Switch
              id="30%-off"
              checked={events.discount30}
              onCheckedChange={() => handleEventToggle('discount30')}
              disabled={isDisabled}
            />
            <Label htmlFor="30%-off">30% off</Label>
          </div>
          <div className="flex gap-[8px]">
            <Switch
              id="-30%-booms"
              checked={events.reducedBooms}
              onCheckedChange={() => handleEventToggle('reducedBooms')}
              disabled={isDisabled}
            />
            <Label htmlFor="-30%-booms">-30% booms &lt;21</Label>
          </div>
        </div>

        {isCalculating ? (
          null
        ) : results && results.stats?.finalStats ? (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-lg">Star Force Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Average Cost:</strong>
                </p>
                <p>{results.averageCost}</p>
              </div>
              <div>
                <p>
                  <strong>Average Booms:</strong>
                </p>
                <p>{results.averageBooms}</p>
              </div>
              <div>
                <p>
                  <strong>Lucky Cost:</strong>
                </p>
                <p>{results.luckyCost}</p>
              </div>
              <div>
                <p>
                  <strong>Unlucky Cost:</strong>
                </p>
                <p>{results.unluckyCost}</p>
              </div>
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
        ) : null}
      </div>
    </div>
  );
}