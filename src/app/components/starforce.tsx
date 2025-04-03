'use client';
import { Dispatch, SetStateAction, useState } from 'react';
import itemStats from '../formulas/sf/itemstats';
import { calculateKMS } from '../formulas/starforceCalc';
import { Input } from "@/components/ui/input";
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
} from "@/components/ui/select"
import { Item } from '../../../types/item';
import { useEffect } from 'react';

interface StarForceProps {
  selectedGear: Item | null;
  endStar: string;
  setEndStar: Dispatch<SetStateAction<string>>;
}

export default function StarForce({ selectedGear, endStar, setEndStar }: StarForceProps) {
  const [inputs, setInputs] = useState({
    itemLevel: selectedGear?.Level || null,
    startStar: '',
  });

  useEffect(() => {
    setInputs(prev => ({
      ...prev,
      itemLevel: selectedGear?.Level || null,
    }));
  }, [selectedGear]);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const itemLevelNum = Number(inputs.itemLevel);
    const startStarNum = Number(inputs.startStar);
    const endStarNum = Number(endStar);

    if (!itemLevelNum || isNaN(startStarNum) || isNaN(endStarNum)) {
      alert('Please fill all fields');
      return;
    }

    const starForceResult = calculateKMS(
      startStarNum,
      endStarNum,
      itemLevelNum
    );
    const statsResult = itemStats(startStarNum, endStarNum, itemLevelNum);

    setResults({
      ...starForceResult,
      stats: statsResult,
    });
  };

  return (
    <div className="flex flex-col grow bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] h-full w-full justify-between">
      <div className='flex flex-col gap-[16px]'>
        {/* HEADER */}
        <div className='flex w-full justify-between'>
          <div className='flex gap-[8px]'>
            <Image
              src="image/Star_Icon.svg"
              width={16}
              height={16}
              alt='star'
            />
            <h4>Star Force Calculator</h4>
          </div>
          <Switch
            defaultChecked
          />
        </div>
        {/* Input Fields */}
        <div className="flex flex-col gap-[16px]">
          <div className='flex gap-[16px] w-full'>
            <div className="w-full">
             <p className='p3'>MVP Discount</p>
             <Select
            //  onValueChange={field.onChange}             
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
          <div className='flex gap-[16px] w-full'>
            <div>
              <p className='p3'>Start Star</p>
              <Input
                type="number"
                name="startStar"
                value={inputs.startStar}
                onChange={handleInputChange}
                placeholder="e.g. 0"
              />
            </div>
            <div>
              <p className='p3'>End Star</p>
              <Input
                type="number"
                name="endStar"
                value={endStar}
                onChange={(e) => setEndStar(e.target.value)}
                placeholder="e.g. 15"
              />
            </div>
          </div>
        </div>
      </div>
      <div className='w-full h-[1px] rounded-full bg-black opacity-20'/>
      
      <div className="flex flex-col gap-[16px]">
        <div className='flex flex-col gap-[16px]'>
        <Label htmlFor="Events">Events</Label>
          <div className='flex gap-[8px]'>
            <Switch id="Star-Catching" />
            <Label htmlFor="Star-Catching">Star Catching</Label>
          </div>
          <div className='flex gap-[8px]'>
            <Switch id="Safeguarding" />
            <Label htmlFor="Safeguarding">Safeguarding</Label>
          </div>
          <div className='flex gap-[8px]'>
            <Switch id="30%-off" />
            <Label htmlFor="30%-off">30% off</Label>
          </div>
          <div className='flex gap-[8px]'>
            <Switch id="-30%-booms" />
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
    </div>
  );
}
