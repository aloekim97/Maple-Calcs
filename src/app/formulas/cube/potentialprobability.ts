import { Combination } from './potentialpermutations';
import {
  CUBE_COST,
  CUBE_PROBABILITIES,
  CubeProbabilities,
  ITEM_PROBABILITIES,
  ProbabilityTiers,
  WSE_PROBABILITIES,
} from './cubeInfo';
import { CubeType } from '@/app/components/inputs/cubeInputs';

interface LineClassification {
  type: string;
  value: number;
}

export interface PotCalcResult {
  averageCost: string;
  totalProbability: number;
  averageTry: number;
}
export interface NAPotResult {
  averageCost: number | null;
  totalProbability: number | null;
  averageTry: number | null;
  luckyCost: number | null;
  unluckyCost: number | null;
  medianCost: number | null;
  veryUnluckyCost: number | null;
}

const STAT_VALUES = {
  statPrime: [12, 13],
  allPrime: [9, 10],
  statNonPrime: [9, 10],
  allNonPrime: [6, 7],
};
export interface Lines {
  first: string;
  second: string;
  third: string;
}
type TierType =
  | 'L'
  | 'U'
  | 'cdr'
  | 'cd'
  | 'dropmeso'
  | 'boss'
  | 'ied'
  | 'att'
  | '';

const SPECIAL_LINES = ['cdr', 'cd', 'dropmeso', 'boss', 'ied', 'att'] as const;
type SpecialLineType = (typeof SPECIAL_LINES)[number];

function classifyLine(line: string): LineClassification {
  const attMatch = line.match(/(\d+)% ATT/i);
  if (attMatch) {
    return {
      type: 'att',
      value: parseInt(attMatch[1])
    };
  }

  // Rest of your existing classification logic...
  const wseMatch = line.match(/(\d+)% (BOSS|IED)/i);
  if (wseMatch) {
    return {
      type: wseMatch[2].toLowerCase(),
      value: parseInt(wseMatch[1])
    };
  }

  // Then check for other special lines
  for (const specialType of SPECIAL_LINES) {
    if (line.toLowerCase().includes(specialType)) {
      const valueMatch = line.match(/(\d+)%/);
      const value = valueMatch ? parseInt(valueMatch[1]) : 0;
      return { type: specialType, value };
    }
  }

  // Handle regular stat lines
  const match = line.match(/(\d+)% ([LU])/i);
  if (!match) return { type: 'unknown', value: 0 };

  const value = parseInt(match[1]);
  const lineType = match[2].toUpperCase();
  if (lineType === 'L') {
    if (STAT_VALUES.statPrime.includes(value)) return { type: 'statPrime', value };
    if (STAT_VALUES.allPrime.includes(value)) return { type: 'allPrime', value };
  } else {
    if (STAT_VALUES.statNonPrime.includes(value)) return { type: 'statNonPrime', value };
    if (STAT_VALUES.allNonPrime.includes(value)) return { type: 'allNonPrime', value };
  }

  return { type: 'unknown', value };
}

function getLineProbability(
  lineInfo: LineClassification,
  lineNumber: 1 | 2 | 3,
  cubeProb: CubeProbabilities,
  itemProb: any
): number {
  const cubeLineProb = cubeProb[`line${lineNumber}`];
  let itemLineProb = 0;

  // Handle WSE items differently
  if (lineInfo.type === 'att') {
    const attKey = `att${lineInfo.value}` as keyof typeof itemProb;
    if (attKey in itemProb) {
      return (cubeLineProb * itemProb[attKey]) / 100;
    }
    return 0; // If the ATT value isn't found in probabilities
  }

  // Handle other WSE lines (BOSS, IED)
  if (lineInfo.type === 'boss' || lineInfo.type === 'ied') {
    const key = `${lineInfo.type}${lineInfo.value}` as keyof typeof itemProb;
    return (cubeLineProb * (itemProb[key] || 0)) / 100;
  }
  // Handle regular items
  else {
    // Handle special lines
    if (SPECIAL_LINES.includes(lineInfo.type as SpecialLineType)) {
      const probTable = itemProb[lineInfo.type as SpecialLineType];
      if (probTable && typeof probTable === 'object') {
        itemLineProb = (probTable as Record<number, number>)[lineInfo.value] || 0;
      }
    }
    // Handle stat lines
    else if (itemProb.stat && lineInfo.type in itemProb.stat) {
      itemLineProb = itemProb.stat[lineInfo.type as keyof ProbabilityTiers] || 0;
    }
  }

  return (cubeLineProb * itemLineProb) / 100;
}

function calculateWSEProbability(
  combinations: Combination[],
  cubeType: CubeType,
  itemType: 'Weapon' | 'Secondary' | 'Emblem'
): number {
  const cubeProbabilities = CUBE_PROBABILITIES[cubeType];
  const itemProb = WSE_PROBABILITIES[itemType];
  
  let totalProbability = 0;

  for (const combo of combinations) {
    const line1Info = classifyLine(combo.lines[0]);
    const line2Info = classifyLine(combo.lines[1]);
    const line3Info = classifyLine(combo.lines[2]);

    // Helper function to determine tier based on line type and value
    const getTier = (lineInfo: LineClassification): TierType => {
      if (lineInfo.type === 'boss') {
        return lineInfo.value === 30 ? 'U' : 'L';
      }
      if (lineInfo.type === 'ied') {
        return lineInfo.value === 30 ? 'U' : 'L';
      }
      if (lineInfo.type === 'att') {
        return lineInfo.value <= 10 ? 'U' : 'L'; // 9,10 = U; 12,13 = L
      }
      return lineInfo.value <= 10 ? 'U' : 'L'; // Fallback for other cases
    };

    const tier1 = getTier(line1Info);
    const tier2 = getTier(line2Info);
    const tier3 = getTier(line3Info);
    
    const cubeProb1 = cubeProbabilities[tier1];
    const cubeProb2 = cubeProbabilities[tier2];
    const cubeProb3 = cubeProbabilities[tier3];

    const line1Prob = getLineProbability(line1Info, 1, cubeProb1, itemProb);
    const line2Prob = getLineProbability(line2Info, 2, cubeProb2, itemProb);
    const line3Prob = getLineProbability(line3Info, 3, cubeProb3, itemProb);

    totalProbability += line1Prob * line2Prob * line3Prob;
  }

  return totalProbability;
}

function calculateRegularItemProbability(
  combinations: Combination[],
  cubeType: CubeType,
  itemType: string
): number {
  const cubeProbabilities = CUBE_PROBABILITIES[cubeType];
  const itemProb = ITEM_PROBABILITIES[itemType];
  
  if (!itemProb) {
    return 0;
  }

  let totalProbability = 0;

  for (const combo of combinations) {
    let tier1: TierType = '';
    let tier2: TierType = '';
    let tier3: TierType = '';

    // Determine tiers based on item type and line content
    if (itemType === 'Hat') {
      tier1 = combo.lines[0].includes('CDR') ? 'cdr' : combo.lines[0].endsWith('L') ? 'L' : 'U';
      tier2 = combo.lines[1].includes('CDR') ? 'cdr' : combo.lines[1].endsWith('L') ? 'L' : 'U';
      tier3 = combo.lines[2].includes('CDR') ? 'cdr' : combo.lines[2].endsWith('L') ? 'L' : 'U';
    } else if (itemType === 'Gloves') {
      tier1 = combo.lines[0].includes('CD') ? 'cd' : combo.lines[0].endsWith('L') ? 'L' : 'U';
      tier2 = combo.lines[1].includes('CD') ? 'cd' : combo.lines[1].endsWith('L') ? 'L' : 'U';
      tier3 = combo.lines[2].includes('CD') ? 'cd' : combo.lines[2].endsWith('L') ? 'L' : 'U';
    } else if (itemType === 'Accessory') {
      tier1 = combo.lines[0].includes('DROPMESO') ? 'dropmeso' : combo.lines[0].endsWith('L') ? 'L' : 'U';
      tier2 = combo.lines[1].includes('DROPMESO') ? 'dropmeso' : combo.lines[1].endsWith('L') ? 'L' : 'U';
      tier3 = combo.lines[2].includes('DROPMESO') ? 'dropmeso' : combo.lines[2].endsWith('L') ? 'L' : 'U';
    } else {
      tier1 = combo.lines[0].endsWith('L') ? 'L' : 'U';
      tier2 = combo.lines[1].endsWith('L') ? 'L' : 'U';
      tier3 = combo.lines[2].endsWith('L') ? 'L' : 'U';
    }

    const cubeProb1 = cubeProbabilities[tier1];
    const cubeProb2 = cubeProbabilities[tier2];
    const cubeProb3 = cubeProbabilities[tier3];

    const line1Info = classifyLine(combo.lines[0]);
    const line2Info = classifyLine(combo.lines[1]);
    const line3Info = classifyLine(combo.lines[2]);

    const line1Prob = getLineProbability(line1Info, 1, cubeProb1, itemProb);
    const line2Prob = getLineProbability(line2Info, 2, cubeProb2, itemProb);
    const line3Prob = getLineProbability(line3Info, 3, cubeProb3, itemProb);

    totalProbability += line1Prob * line2Prob * line3Prob;
  }

  return totalProbability;
}

export function findComboProb(
  combinations: Combination[],
  cubeType: CubeType,
  itemType: string
): PotCalcResult {
  let totalProbability: number;
  
  if (itemType === 'Weapon' || itemType === 'Secondary' || itemType === 'Emblem') {
    totalProbability = calculateWSEProbability(combinations, cubeType, itemType as 'Weapon' | 'Secondary' | 'Emblem');
  } else {
    totalProbability = calculateRegularItemProbability(combinations, cubeType, itemType);
  }

  const averageTry = totalProbability > 0 ? 1 / totalProbability : Infinity;
  const averageCost =
    averageTry !== Infinity
      ? (averageTry * CUBE_COST[cubeType]).toLocaleString()
      : '∞';

  return {
    averageCost,
    totalProbability,
    averageTry,
  };
}