'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
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
type DisabledReason = 'none' | 'soft' | 'hard';

interface CubeProps {
  selectedGear: Item | null;
  setCubeResults: React.Dispatch<React.SetStateAction<PotCalcResult | null>>;
  setPotLines: React.Dispatch<React.SetStateAction<PotLines | null>>;
}

const DEFAULT_LINES = {
  line1: '{"any": 1}',
  line2: '{"any": 1}',
  line3: '{"any": 1}',
};

const NON_CUBE_TYPES = new Set([
  'Black_Heart',
  'Genesis_Badge',
  'Crystal_Ventus_Badge',
  'Cursed_Spellbook',
  'Stone_Of_Eternal_Life',
  'Pinky_Holy_Cup',
  'Seven_Days_Badge',
]);

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

  const [disabledState, setDisabledState] = useState<{
    isDisabled: boolean;
    reason: DisabledReason;
  }>({ isDisabled: false, reason: 'none' });

  const [lines, setLines] = useState(DEFAULT_LINES);

  // Update disabled state when gear changes
  useEffect(() => {
    if (!selectedGear) {
      setDisabledState({ isDisabled: false, reason: 'none' });
      return;
    }

    const cannotCube = NON_CUBE_TYPES.has(selectedGear['Item Name']);
    if (cannotCube) {
      setDisabledState({ isDisabled: true, reason: 'hard' });
    } else {
      // Check localStorage for user preference
      const savedState = localStorage.getItem('cubeDisabled');
      const defaultState =
        savedState && ['none', 'soft'].includes(savedState)
          ? (savedState as DisabledReason)
          : 'none';
      setDisabledState({
        isDisabled: defaultState !== 'none',
        reason: defaultState,
      });
    }
    const newLines = DEFAULT_LINES;
    setLines(newLines);
    ['potLine1', 'potLine2', 'potLine3'].forEach((key, i) => {
      localStorage.setItem(key, Object.values(newLines)[i]);
    });
    updateParentPotLines(newLines);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGear]);

  // Reset lines when disabled state changes
  useEffect(() => {
    const resetLines = () => {
      const newLines = DEFAULT_LINES;
      setLines(newLines);
      ['potLine1', 'potLine2', 'potLine3'].forEach((key, i) => {
        localStorage.setItem(key, Object.values(newLines)[i]);
      });
      updateParentPotLines(newLines);
    };

    if (disabledState.reason === 'hard' || disabledState.reason === 'soft') {
      resetLines();
    } else {
      // Load saved lines when enabled
      const savedLines = {
        line1: localStorage.getItem('potLine1') || DEFAULT_LINES.line1,
        line2: localStorage.getItem('potLine2') || DEFAULT_LINES.line2,
        line3: localStorage.getItem('potLine3') || DEFAULT_LINES.line3,
      };
      setLines(savedLines);
      updateParentPotLines(savedLines);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabledState.reason]);

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

  // Handle line changes
  const handleLineChange = useCallback(
    (line: keyof typeof lines, value: string) => {
      if (disabledState.isDisabled) return;

      const newLines = {
        ...lines,
        [line]: value,
      };
      setLines(newLines);
      localStorage.setItem(`potLine${line.slice(-1)}`, value);
      updateParentPotLines(newLines);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [disabledState.isDisabled, lines]
  );

  // Update parent pot lines
  const updateParentPotLines = useCallback(
    (currentLines: typeof lines) => {
      try {
        const parsedLines = {
          line1: JSON.parse(currentLines.line1),
          line2: JSON.parse(currentLines.line2),
          line3: JSON.parse(currentLines.line3),
        };
        setPotLines(parsedLines);
      } catch (error) {
        console.error('Error parsing pot lines:', error);
        setPotLines(null);
      }
    },
    [setPotLines]
  );

  // Toggle disabled state
  const toggleDisabled = useCallback(() => {
    const newReason = disabledState.reason === 'none' ? 'soft' : 'none';
    setDisabledState({
      isDisabled: newReason !== 'none',
      reason: newReason,
    });
    localStorage.setItem('cubeDisabled', newReason);
  }, [disabledState.reason]);

  // Main calculation effect
  useEffect(() => {
    try {
      if (!inputs.itemType || !inputs.itemLevel || disabledState.isDisabled) {
        setCubeResults({
          averageCost: '0',
          totalProbability: 0,
          averageTries: 0,
          luckyCost: '0',
          unluckyCost: '0',
          medianCost: '0',
        });
        return;
      } else {
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
          inputs.itemType === 'Cape/Belt/Shoulder' ? 'Cape' : inputs.itemType
        );
        setCubeResults(potentialResult);
      }
    } catch (error) {
      console.error('Calculation error:', error);
      setCubeResults(null);
    }
  }, [disabledState.isDisabled, inputs, lines, setCubeResults]);

  // Get line options based on item type and level
  const lineOptions = useMemo(() => {
    if (!inputs.itemType || !inputs.itemLevel || disabledState.isDisabled) {
      return { line1: {}, line2: {}, line3: {} };
    }

    // Get base options
    const options = {
      line1: getGoalOptions(inputs.itemType, inputs.itemLevel, 1),
      line2: getGoalOptions(inputs.itemType, inputs.itemLevel, 2),
      line3: getGoalOptions(inputs.itemType, inputs.itemLevel, 3),
    };

    // Special case for Mage weapons
    if (selectedGear?.Type === 'Weapon' && selectedGear.Job === 'Mage') {
      const transformAttToMagicAtt = (line: Record<string, number>) => {
        if (!line) return line;

        return Object.fromEntries(
          Object.entries(line).map(([key, value]) => {
            // Handle both 'ATT' and 'att' cases
            const newKey = key.replace(/ATT/g, 'Magic ATT'); // Any remaining 'ATT'
            return [newKey, value];
          })
        );
      };

      return {
        line1: transformAttToMagicAtt(options.line1),
        line2: transformAttToMagicAtt(options.line2),
        line3: transformAttToMagicAtt(options.line3),
      };
    }

    return options;
  }, [
    inputs.itemType,
    inputs.itemLevel,
    disabledState.isDisabled,
    selectedGear,
  ]);

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
            src="https://5pd8q9yvpv.ufs.sh/f/8nGwjuDDSJXHKUcED2y7NQm9yiLk5clIoUnM8zAXKJ20eSub"
            width={14}
            height={16}
            alt="Cube icon"
          />
          <h4>Potential Calculator</h4>
        </div>
        {disabledState.reason !== 'hard' && (
          <Switch
            checked={!disabledState.isDisabled}
            onCheckedChange={toggleDisabled}
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
