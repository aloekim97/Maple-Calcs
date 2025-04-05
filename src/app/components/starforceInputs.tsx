'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import itemStats from '../formulas/sf/itemstats';
import { calculateKMS } from '../formulas/starforceCalc';
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
import { Item } from '../../../types/item';
import { useEffect } from 'react';

interface StarForceProps {
  selectedGear: Item | null;
  setEndStar: Dispatch<SetStateAction<string> | ''>;
  setSfRes: Dispatch<SetStateAction<StarForceResults | null>>;
}
type InputState = {
  itemLevel: number | null;
  startStar: number;
  endStar: string;
};

export interface StarForceResults {
  averageCost: string;
  averageBooms: string;
  luckyCost: string;
  unluckyCost: string;
  stats: any;
}

export default function StarForce({
  selectedGear,
  setEndStar,
  setSfRes,
}: StarForceProps) {
  const [inputs, setInputs] = useState<InputState>({
    itemLevel: selectedGear?.Level || null,
    startStar: 0,
    endStar: '',
  });

  // Add state for the switches
  const [events, setEvents] = useState({
    starCatch: false,
    safeguard: false,
    discount30: false,
    reducedBooms: false,
  });

  // Add state for MVP discount
  const [mvpDiscount, setMvpDiscount] = useState<string>('none');

  const [results, setResults] = useState<{
    averageCost: string;
    averageBooms: string;
    luckyCost: string;
    unluckyCost: string;
    stats: {
      finalStats: { stat: number; att: number };
      difference: { stat: number; att: number };
    };
  }>();
  useEffect(() => {
    setInputs((prev) => ({
      ...prev,
      itemLevel: selectedGear?.Level || null,
    }));
  }, [selectedGear]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setInputs((prev) => ({
      ...prev,
      [name]:
        name === 'itemLevel' || name === 'startStar'
          ? Number(value) || 0 // Convert to number, fallback to 0
          : value,
    }));
  };

  // Handler for event switches
  const handleEventToggle = (eventName: keyof typeof events) => {
    setEvents((prev) => ({
      ...prev,
      [eventName]: !prev[eventName],
    }));
  };

  const calculate = () => {
    const itemLevelNum = inputs.itemLevel ?? 0;
    const startStarNum = inputs.startStar;
    const endStarNum = Number(inputs.endStar);

    if (!itemLevelNum || isNaN(startStarNum) || isNaN(endStarNum)) {
      alert('Please fill all fields with valid numbers');
      return;
    }

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

      const statsResult = itemStats(startStarNum, endStarNum, itemLevelNum);
      setEndStar(inputs.endStar);
      setSfRes({
        ...starForceResult,
        stats: statsResult,
      });
    } catch (error) {
      console.error('Calculation error:', error);
      alert('An error occurred during calculation');
      setSfRes(null);
    }
  };

  return (
    <div className="flex flex-col grow bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] h-full w-full justify-between">
      <div className="flex flex-col gap-[16px]">
        {/* HEADER */}
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
          <Switch defaultChecked />
        </div>
        {/* Input Fields */}
        <div className="flex flex-col gap-[16px]">
          <div className="flex gap-[16px] w-full">
            <div className="w-full">
              <p className="p3">MVP Discount</p>
              <Select value={mvpDiscount} onValueChange={setMvpDiscount}>
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
            />
            <Label htmlFor="Star-Catching">Star Catching</Label>
          </div>
          <div className="flex gap-[8px]">
            <Switch
              id="Safeguarding"
              checked={events.safeguard}
              onCheckedChange={() => handleEventToggle('safeguard')}
            />
            <Label htmlFor="Safeguarding">Safeguarding</Label>
          </div>
          <div className="flex gap-[8px]">
            <Switch
              id="30%-off"
              checked={events.discount30}
              onCheckedChange={() => handleEventToggle('discount30')}
            />
            <Label htmlFor="30%-off">30% off</Label>
          </div>
          <div className="flex gap-[8px]">
            <Switch
              id="-30%-booms"
              checked={events.reducedBooms}
              onCheckedChange={() => handleEventToggle('reducedBooms')}
            />
            <Label htmlFor="-30%-booms">-30% booms &lt;21</Label>
          </div>
        </div>

        {results && (
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
        )}
      </div>
      <button
        onClick={calculate}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Calculate
      </button>
    </div>
  );
}
