'use client';
import { useState } from 'react';
import { potCalc } from '../formulas/potentialcalc';
import { PotCalcResult } from '../formulas/cube/comboprobability';
import {
  ITEM_PROBABILITIES,
  WSE_PROBABILITIES,
} from '../formulas/cube/potentialprobability';
import { getGoalOptions } from '../formulas/cube/potentialdropdown';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';

export default function Cube() {
  const allItemTypes = { ...ITEM_PROBABILITIES, ...WSE_PROBABILITIES };
  const [inputs, setInputs] = useState({
    itemType: 'hat',
    goal: '',
    cubeType: 'black',
    itemLevel: '150',
  });

  const handleGoalChange = (e: any) => {
    const selectedValue = JSON.parse(e.target.value);
    setSelectedGoal(selectedValue);
  };

  const [results, setResults] = useState<PotCalcResult>();
  const goalOptions = getGoalOptions(inputs.itemType, Number(inputs.itemLevel));
  const [selectedGoal, setSelectedGoal] = useState(
    goalOptions ? Object.values(goalOptions)[0] : null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const itemLevelNum = Number(inputs.itemLevel);

    const potentialResult = potCalc(
      itemLevelNum,
      selectedGoal,
      inputs.cubeType
    );

    setResults(potentialResult);
  };

  return (
    <div className="flex flex-col bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] w-full gap-[16px]">
      {/* Header */}
      <div className='flex w-full justify-between'>
        <div className='flex gap-[8px]'>
          <Image
            src="image/Cube_Icon.svg"
            width={14}
            height={16}
            alt='star'
          />
          <h4>Potential Calculator</h4>
        </div>
        <Switch
          defaultChecked
        />
      </div>
      {/* Input fields */}
      <div className="flex flex-col gap-[16px]">
        <div className='flex w-full gap-[16px]'>
          <div className="w-full">
            <p className='p3'>Starting Tier</p>
            <Select 
              value={inputs.cubeType} 
              onValueChange={(value) => setInputs(prev => ({ ...prev, cubeType: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Starting Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectLabel>Cube Type</SelectLabel>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="unique">Unique</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="w-full">
            <p className='p3'>Desired Tier</p>
            <Select 
              value={inputs.cubeType} 
              onValueChange={(value) => setInputs(prev => ({ ...prev, cubeType: value }))}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Desired Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                <SelectLabel>Cube Type</SelectLabel>
                  <SelectItem value="rare">Rare</SelectItem>
                  <SelectItem value="epic">Epic</SelectItem>
                  <SelectItem value="unique">Unique</SelectItem>
                  <SelectItem value="legendary">Legendary</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div> 
        </div>
        <div>
          <p className='p3'>Cube Type</p>
          <Select 
            value={inputs.cubeType} 
            onValueChange={(value) => setInputs(prev => ({ ...prev, cubeType: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select cube type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
               <SelectLabel>Cube Type</SelectLabel>
                <SelectItem value="black">Black Cube</SelectItem>
                <SelectItem value="red">Red Cube</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className='p3'>Line 1</p>
          <Select 
            value={inputs.cubeType} 
            onValueChange={(value) => setInputs(prev => ({ ...prev, cubeType: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select cube type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
               <SelectLabel>Cube Type</SelectLabel>
                <SelectItem value="black">Black Cube</SelectItem>
                <SelectItem value="red">Red Cube</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className='p3'>Line 2</p>
          <Select 
            value={inputs.cubeType} 
            onValueChange={(value) => setInputs(prev => ({ ...prev, cubeType: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select cube type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
               <SelectLabel>Cube Type</SelectLabel>
                <SelectItem value="black">Black Cube</SelectItem>
                <SelectItem value="red">Red Cube</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <p className='p3'>Line 3</p>
          <Select 
            value={inputs.cubeType} 
            onValueChange={(value) => setInputs(prev => ({ ...prev, cubeType: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select cube type..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
               <SelectLabel>Line 3</SelectLabel>
                <SelectItem value="black">Black Cube</SelectItem>
                <SelectItem value="red">Red Cube</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {results && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-lg">Potential Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Average Cost:</strong>
                </p>
                <p>{results.averageCost} mesos</p>
              </div>
              <div>
                <p>
                  <strong>Success Chance:</strong>
                </p>
                <p>{(results.totalProbability * 100).toFixed(6)}%</p>
              </div>
              <div>
                <p>
                  <strong>Average Attempts:</strong>
                </p>
                <p>{results.averageTry.toFixed(1)}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">Valid Combinations</h3>
              <div className="max-h-60 overflow-y-auto mt-2 border rounded p-2">
                {results.combinations.map((combo, i) => (
                  <div key={i} className="py-1 border-b last:border-b-0">
                    Line 1: {combo.line1}, Line 2: {combo.line2}, Line 3:{' '}
                    {combo.line3}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
