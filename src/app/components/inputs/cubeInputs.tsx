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
import { PotLines } from '../gearcalc';

type PotentialTier = 'rare' | 'epic' | 'unique' | 'legendary';
export type CubeType = 'black' | 'red';

interface CubeProps {
  selectedGear: Item | null;
  setCubeResults: React.Dispatch<React.SetStateAction<PotCalcResult | null>>;
  setPotLines: React.Dispatch<React.SetStateAction<PotLines | null>>;
}

export default function Cube({
  selectedGear,
  setCubeResults,
  setPotLines,
}: CubeProps) {
  const [inputs, setInputs] = useState({
    itemType: selectedGear?.Type || '',
    startingTier: 'rare' as PotentialTier,
    desiredTier: 'legendary' as PotentialTier,
    cubeType: 'black' as CubeType,
    itemLevel: selectedGear?.Level || 0,
  });
  const [events, setEvents] = useState({
    canCube: true,
  });

  const [lines, setLines] = useState({
    line1: '{"any": 1}',
    line2: '{"any": 1}',
    line3: '{"any": 1}',
  });

  const NON_CUBE_TYPES = useMemo(
    () =>
      new Set([
        'Black_Heart',
        'Genesis_Badge',
        'Crystal_Ventus_Badge',
        'Cursed_Spellbook',
        'Stone_Of_Eternal_Life',
        'Pinky_Holy_Cup',
      ]),
    []
  );
  const disabledState = useMemo(() => {
    if (!selectedGear) return { isDisabled: false, reason: 'none' };

    // Hard disabled check
    if (NON_CUBE_TYPES.has(selectedGear['Item Name'])) {
      return { isDisabled: true, reason: 'hard' };
    }

    // User toggled disabled
    if (!events.canCube) {
      return { isDisabled: true, reason: 'soft' };
    }
    return { isDisabled: false, reason: 'none' };
  }, [selectedGear, NON_CUBE_TYPES, events.canCube]);

  useEffect(() => {
    if (!selectedGear) return;

    // Early return if gear is invalid
    if (!selectedGear['Item Name']) {
      console.error('Selected gear has no Item Name');
      return;
    }

    const cannotCube = NON_CUBE_TYPES.has(selectedGear['Item Name']);

    // Reset lines if cannot cube
    if (disabledState.reason === 'hard') {
      setLines({
        line1: '{"any": 1}',
        line2: '{"any": 1}',
        line3: '{"any": 1}',
      });
      localStorage.setItem(`potLine1`, '{"any": 1}');
      localStorage.setItem(`potLine2`, '{"any": 1}');
      localStorage.setItem(`potLine3`, '{"any": 1}');
      updateParentPotLines({
        line1: '{"any": 1}',
        line2: '{"any": 1}',
        line3: '{"any": 1}',
      });
    }
    if (disabledState.reason === 'soft') {
      setLines({
        line1: '{"any": 1}',
        line2: '{"any": 1}',
        line3: '{"any": 1}',
      });
      updateParentPotLines({
        line1: '{"any": 1}',
        line2: '{"any": 1}',
        line3: '{"any": 1}',
      });
    }
    if (disabledState.reason === 'none') {
      setLines({
        line1: localStorage.getItem('potline1'),
        line2: localStorage.getItem('potline2'),
        line3: localStorage.getItem('potline3'),
      });
      updateParentPotLines({
        line1: localStorage.getItem('potline1'),
        line2: localStorage.getItem('potline2'),
        line3: localStorage.getItem('potline3'),
      });
    }

    setEvents((prev) => ({
      ...prev,
      canCube: !cannotCube,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGear, NON_CUBE_TYPES]);

  useEffect(() => {
    if (disabledState.reason === 'soft') {
      setInputs((prev) => ({ ...prev, line1: '' }));
    }
    if (disabledState.reason === 'none') {
      setInputs((prev) => ({
        ...prev,
        line1: localStorage.getItem('potline'),
        line2: localStorage.getItem('potline2'),
        line3: localStorage.getItem('potline3'),
      }));
    }
  }, [disabledState.reason]);

  // Load saved potlines from localStorage
  const lineOptions = useMemo(() => {
    if (!inputs.itemType || !inputs.itemLevel)
      return { line1: {}, line2: {}, line3: {} };

    return {
      line1: getGoalOptions(inputs.itemType, inputs.itemLevel, 1),
      line2: getGoalOptions(inputs.itemType, inputs.itemLevel, 2),
      line3: getGoalOptions(inputs.itemType, inputs.itemLevel, 3),
    };
  }, [inputs.itemType, inputs.itemLevel]);

  // Load initial lines from localStorage
  useEffect(() => {
    const loadLines = () => {
      const newLines = {
        line1: localStorage.getItem('potLine1') || '{"any": 1}',
        line2: localStorage.getItem('potLine2') || '{"any": 1}',
        line3: localStorage.getItem('potLine3') || '{"any": 1}',
      };
      setLines(newLines);
      updateParentPotLines(newLines);
    };
    loadLines();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateParentPotLines = (currentLines: typeof lines) => {
    try {
      const parsedLines = {
        line1: currentLines.line1 ? JSON.parse(currentLines.line1) : undefined,
        line2: currentLines.line2 ? JSON.parse(currentLines.line2) : undefined,
        line3: currentLines.line3 ? JSON.parse(currentLines.line3) : undefined,
      };
      setPotLines(parsedLines);
    } catch (error) {
      console.error('Error parsing pot lines:', error);
      setPotLines(null);
    }
  };

  const handleLineChange = (line: keyof typeof lines, value: string) => {
    const newLines = {
      ...lines,
      [line]: value,
    };
    setLines(newLines);
    localStorage.setItem(`potLine${line.slice(-1)}`, value);
    updateParentPotLines(newLines);
  };

  // Update inputs when selectedGear changes
  useEffect(() => {
    if (selectedGear) {
      setInputs((prev) => ({
        ...prev,
        itemType: selectedGear.Type,
        itemLevel: selectedGear.Level,
      }));
    }
  }, [selectedGear]);

  const handleEventToggle = (eventName: keyof typeof events) => {
    setEvents((prev) => ({
      ...prev,
      [eventName]: !prev[eventName],
    }));
  };

  // Main calculation effect
  useEffect(() => {
    try {
      if (!inputs.itemType || !inputs.itemLevel || !events.canCube) {
        setCubeResults({
          averageCost: '0',
          totalProbability: 0,
          averageTries: 0,
          luckyCost: '0',
          unluckyCost: '0',
          medianCost: '0',
        });
        return;
      }

      const potentialResult = potCalc(
        inputs.itemLevel,
        inputs.cubeType,
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
  }, [events.canCube, inputs, lines, setCubeResults]);

  return (
    <div
      className={`flex flex-col grow bg-white p-[16px] rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] h-full w-full justify-between ${
        disabledState.isDisabled ? 'opacity-50' : ''
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
        {disabledState.reason !== 'hard' && (
          <Switch
            id="Can-Starforce"
            checked={events.canCube}
            onCheckedChange={() => handleEventToggle('canCube')}
            disabled={disabledState.reason === 'hard'}
          />
        )}
      </div>

      {/* Input fields */}
      <div className="flex flex-col gap-[16px]">
        <div className="flex w-full gap-[16px]">
          <div className="w-full">
            <p className="p3">Starting Tier</p>
            <Select
              value={inputs.startingTier}
              onValueChange={(value: PotentialTier) =>
                setInputs((prev) => ({ ...prev, startingTier: value }))
              }
              disabled={disabledState.isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Starting Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Starting Tier</SelectLabel>
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
              value={inputs.desiredTier}
              onValueChange={(value: PotentialTier) =>
                setInputs((prev) => ({ ...prev, desiredTier: value }))
              }
              disabled={disabledState.isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Desired Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Desired Tier</SelectLabel>
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
            disabled={disabledState.isDisabled}
            onValueChange={(value: CubeType) =>
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

        {/* Potential Lines */}
        {[1, 2, 3].map((lineNum) => (
          <div key={`line-${lineNum}`}>
            <p className="p3">
              Line {lineNum} {lineNum === 1 ? '(Primary)' : '(Secondary)'}
            </p>
            <Select
              value={lines[`line${lineNum}` as keyof typeof lines]}
              onValueChange={(value) =>
                handleLineChange(`line${lineNum}` as keyof typeof lines, value)
              }
              disabled={disabledState.isDisabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select Line ${lineNum}...`} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>
                    {lineNum === 1 ? 'Primary' : 'Secondary'} Line Options
                  </SelectLabel>
                  {Object.entries(
                    lineOptions[`line${lineNum}` as keyof typeof lineOptions]
                  ).map(([label, value]) => (
                    <SelectItem key={label} value={JSON.stringify(value)}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
                <SelectItem value={'{"any": 1}'}>Any</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
    </div>
  );
}
