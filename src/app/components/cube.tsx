'use client';
import { useState, useEffect, useMemo } from 'react';
import { potCalc } from '../formulas/potentialcalc';
import { PotCalcResult } from '../formulas/cube/comboprobability';
import { getGoalOptions } from '../formulas/cube/potentialdropdown';
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
import { Item } from '../../../types/item';

interface CubeProps {
  selectedGear: Item | null;
}

export default function Cube({ selectedGear }: CubeProps) {
  const [inputs, setInputs] = useState({
    itemType: selectedGear?.Type || '',
    startingTier: 'rare',
    desiredTier: 'legendary',
    cubeType: 'black',
    itemLevel: selectedGear?.Level || 0,
  });

  const [lines, setLines] = useState({
    line1: '',
    line2: '',
    line3: '',
  });

  const [results, setResults] = useState<PotCalcResult>();

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
      setLines({ line1: '', line2: '', line3: '' });
    }
  }, [selectedGear]);

  const handleLineChange = (line: keyof typeof lines, value: string) => {
    setLines((prev) => ({ ...prev, [line]: value }));
  };

  const calculate = () => {
    try {
      const potentialResult = potCalc(
        inputs.itemLevel,
        inputs.cubeType,
        inputs.startingTier,
        inputs.desiredTier,
        {
          first: lines.line1 || '',
          second: lines.line2 || '',
          third: lines.line3 || '',
        },
        inputs.itemType
      );

      setResults(potentialResult);
    } catch (error) {
      console.error('Calculation error:', error);
      // Handle error (show toast, etc.)
    }
  };

  return (
    <div className="flex flex-col bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] w-full gap-[16px]">
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
        <Switch defaultChecked />
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
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Line 1..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Primary Line Options</SelectLabel>
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
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Line 2..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Secondary Line Options</SelectLabel>
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
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Line 3..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Secondary Line Options</SelectLabel>
                {Object.entries(lineOptions.line3).map(([label, value]) => (
                  <SelectItem key={label} value={JSON.stringify(value)}>
                    {label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <button
          onClick={calculate}
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate
        </button>

        {/* Results display */}
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
                    Line 1: {combo.lines}, Line 2: {combo.line2}, Line 3:{' '}
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
