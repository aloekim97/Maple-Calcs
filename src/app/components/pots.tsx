'use client';
import { useState } from 'react';
import { potCalc } from '../formulas/potentialcalc';
import { PotCalcResult } from '../formulas/cube/cubeprob';
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
  const [inputs, setInputs] = useState({
    itemType: 'hat',
    potentialType: 'stat',
    goal: '30',
    cubeType: 'black',
    itemLevel: '',
  });

  const [results, setResults] = useState<PotCalcResult>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const itemLevelNum = Number(inputs.itemLevel);
    const goalNum = Number(inputs.goal);

    if (!itemLevelNum || isNaN(goalNum)) {
      alert('Please fill all fields');
      return;
    }

    const potentialResult = potCalc(
      inputs.itemType as 'hat',
      itemLevelNum,
      inputs.potentialType as 'stat',
      goalNum,
      inputs.cubeType as 'black'
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
