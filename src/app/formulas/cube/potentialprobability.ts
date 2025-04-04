import { Combination } from './potentialpermutations';
import {
  CUBE_COST,
  CUBE_PROBABILITIES,
  CubeProbabilities,
  ITEM_PROBABILITIES,
  ProbabilityTiers,
} from './cubeInfo';
import { CubeType } from '@/app/components/cubeInputs';

interface LineClassification {
  type: string;
  value: number;
}

export interface PotCalcResult {
  averageCost: string;
  totalProbability: number;
  averageTry: number;
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

const SPECIAL_LINES = ['cooldown', 'critdamage', 'dropmeso'] as const;
type SpecialLineType = (typeof SPECIAL_LINES)[number];

function classifyLine(line: string): LineClassification {
  // Check for special lines
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
    if (STAT_VALUES.statPrime.includes(value))
      return { type: 'statPrime', value };
    if (STAT_VALUES.allPrime.includes(value))
      return { type: 'allPrime', value };
  } else {
    if (STAT_VALUES.statNonPrime.includes(value))
      return { type: 'statNonPrime', value };
    if (STAT_VALUES.allNonPrime.includes(value))
      return { type: 'allNonPrime', value };
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

  // Handle special lines
  if (SPECIAL_LINES.includes(lineInfo.type as SpecialLineType)) {
    const probTable = itemProb[lineInfo.type as SpecialLineType];
    if (probTable && typeof probTable === 'object') {
      itemLineProb = (probTable as Record<number, number>)[lineInfo.value] || 0;
    }
  }
  // Handle stat lines
  else if (itemProb.stat && lineInfo.type in itemProb.stat) {
    itemLineProb = itemProb.stat[lineInfo.type as keyof ProbabilityTiers];
  }
  return (cubeLineProb * itemLineProb) / 100;
}

export function findComboProb(
  combinations: Combination[],
  cubeType: CubeType,
  itemType: string
): PotCalcResult {
  const cubeProbabilities = CUBE_PROBABILITIES[cubeType];
  const itemProb = ITEM_PROBABILITIES[itemType];

  if (!itemProb) {
    console.error(`No probability data found for item type: ${itemType}`);
    return {
      averageCost: '∞',
      totalProbability: 0,
      averageTry: Infinity,
    };
  }

  let totalProbability = 0;
  const validCombinations: Combination[] = [];

  combinations.forEach((combo) => {
    const line1Info = classifyLine(combo.lines[0]);
    const line2Info = classifyLine(combo.lines[1]);
    const line3Info = classifyLine(combo.lines[2]);

    // Determine the tier (L or U) for each line
    const tier1 = combo.lines[0].endsWith('L') ? 'L' : 'U';
    const tier2 = combo.lines[1].endsWith('L') ? 'L' : 'U';
    const tier3 = combo.lines[2].endsWith('L') ? 'L' : 'U';

    // Get the cube probabilities for each line's tier
    const cubeProb1 = cubeProbabilities[tier1];
    const cubeProb2 = cubeProbabilities[tier2];
    const cubeProb3 = cubeProbabilities[tier3];

    const line1Prob = getLineProbability(line1Info, 1, cubeProb1, itemProb);
    const line2Prob = getLineProbability(line2Info, 2, cubeProb2, itemProb);
    const line3Prob = getLineProbability(line3Info, 3, cubeProb3, itemProb);

    const comboProb = line1Prob * line2Prob * line3Prob;

    totalProbability += comboProb;
    validCombinations.push(combo);
  });

  const averageTry = 1 / totalProbability;
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
