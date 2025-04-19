'use client';
import { useState, useEffect, useMemo } from 'react';
import { potCalc } from '../../formulas/potentialcalc';
import { PotCalcResult } from '../../formulas/cube/potentialprobability';
import { getGoalOptions } from '../../formulas/cube/potentialdropdown';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Image from 'next/image';
import { Item } from '../../../../types/item';
import { Lines } from '../gearcalc';

export type CubeType = 'black' | 'red';

interface CubeProps {
  selectedGear: Item | null;
  setCubeResults: React.Dispatch<React.SetStateAction<PotCalcResult | null>>;
  setPotLines: React.Dispatch<React.SetStateAction<Lines | null>>;
}

export interface CubeHandle {
  calculate: () => { error?: string; success?: boolean };
}

export default function Cube({ selectedGear, setCubeResults }: CubeProps) {
  const [inputs, setInputs] = useState({
    itemType: selectedGear?.Type || '',
    startingTier: 'rare',
    desiredTier: 'legendary',
    cubeType: 'black',
    itemLevel: selectedGear?.Level || 0,
  });

  // Load saved potlines from localStorage
  const [lines, setLines] = useState({
    line1: '',
    line2: '',
    line3: '',
  });

  const [events, setEvents] = useState({
    canCube: true,
  });

  // Save potlines to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('potLine1', lines.line1);
    localStorage.setItem('potLine2', lines.line2);
    localStorage.setItem('potLine3', lines.line3);
  }, [lines.line1, lines.line2, lines.line3]);

  const lineOptions = useMemo(() => {
    if (!inputs.itemType || !inputs.itemLevel)
      return { line1: {}, line2: {}, line3: {} };

    return {
      line1: getGoalOptions(inputs.itemType, inputs.itemLevel, 1),
      line2: getGoalOptions(inputs.itemType, inputs.itemLevel, 2),
      line3: getGoalOptions(inputs.itemType, inputs.itemLevel, 3),
    };
  }, [inputs.itemType, inputs.itemLevel]);

  useEffect(() => {
    if (selectedGear) {
      setInputs((prev) => ({
        ...prev,
        itemType: selectedGear.Type,
        itemLevel: selectedGear.Level,
      }));
      localStorage.setItem('potLine1', 'any');
      localStorage.setItem('potLine2', 'any');
      localStorage.setItem('potLine3', 'any');
    }
  }, [selectedGear]);

  const handleLineChange = (line: keyof typeof lines, value: string) => {
    setLines((prev) => ({ ...prev, [line]: value }));
  };

  const handleEventToggle = (eventName: keyof typeof events) => {
    setEvents((prev) => ({
      ...prev,
      [eventName]: !prev[eventName],
    }));
  };

  // Main calculation effect
  useEffect(() => {
    try {
      if (!inputs.itemType || !inputs.itemLevel) {
        setCubeResults(null);
        return;
      }

      const potentialResult = potCalc(
        inputs.itemLevel,
        inputs.cubeType as 'black' | 'red',
        inputs.startingTier,
        inputs.desiredTier,
        {
          first: lines.line1,
          second: lines.line2,
          third: lines.line3,
        },
        inputs.itemType
      );

      setCubeResults(potentialResult);
    } catch (error) {
      console.error('Calculation error:', error);
      setCubeResults(null);
    }
  }, [inputs, lines, setCubeResults]);

  const isDisabled = !events.canCube;
  return (
    <div
      className={`flex flex-col grow bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] h-full w-full justify-between ${
        isDisabled ? 'opacity-50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex w-full justify-between">
        <div className="flex gap-[8px]">
          <Image
            src="/image/Cube_Icon.svg"
            width={14}
            height={16}
            alt="Cube icon"
          />
          <h4>Potential Calculator</h4>
        </div>
        <Switch
          id="Can-Starforce"
          checked={events.canCube}
          onCheckedChange={() => handleEventToggle('canCube')}
        />
      </div>

      {/* Input fields */}
      <div className="flex flex-col gap-[16px]">
        {/* Tier and cube type selects... */}
        <div className="flex w-full gap-[16px]">
          <div className="w-full">
            <p className="p3">Starting Tier</p>
            <Select
              value={inputs.cubeType}
              onValueChange={(value) =>
                setInputs((prev) => ({ ...prev, cubeType: value }))
              }
              disabled={isDisabled}
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
            <p className="p3">Desired Tier</p>
            <Select
              value={inputs.cubeType}
              onValueChange={(value) =>
                setInputs((prev) => ({ ...prev, cubeType: value }))
              }
              disabled={isDisabled}
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
          <p className="p3">Cube Type</p>
          <Select
            value={inputs.cubeType}
            disabled={isDisabled}
            onValueChange={(value) =>
              setInputs((prev) => ({ ...prev, cubeType: value }))
            }
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
          <p className="p3">Line 1 (Primary)</p>
          <Select
            value={lines.line1}
            onValueChange={(value) => handleLineChange('line1', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Line 1..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Primary Line Options</SelectLabel>
                <SelectItem value={'any: 1'}>Any</SelectItem>
                {Object.entries(lineOptions.line1).map(([label, value]) => (
                  <SelectItem key={label} value={JSON.stringify(value)}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <div>
          <p className="p3">Line 2 (Secondary)</p>
          <Select
            value={lines.line2}
            onValueChange={(value) => handleLineChange('line2', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Line 2..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Secondary Line Options</SelectLabel>
                <SelectItem value={'any: 1'}>Any</SelectItem>
                {Object.entries(lineOptions.line2).map(([label, value]) => (
                  <SelectItem key={label} value={JSON.stringify(value)}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Line 3 (Secondary) */}
        <div>
          <p className="p3">Line 3 (Secondary)</p>
          <Select
            value={lines.line3}
            onValueChange={(value) => handleLineChange('line3', value)}
            disabled={isDisabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Line 3..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Secondary Line Options</SelectLabel>
                <SelectItem value={'any: 1'}>Any</SelectItem>
                {Object.entries(lineOptions.line3).map(([label, value]) => (
                  <SelectItem key={label} value={JSON.stringify(value)}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
