import { Combination } from './potentialpermutations';
import {
  CUBE_COST,
  CUBE_PROBABILITIES,
  CubeTypeProbabilities,
  ITEM_PROBABILITIES,
  ProbabilityTiers,
  SpecialStatProbability,
  WSE_PROBABILITIES,
  type CubeProbabilities,
  type ItemProbabilities,
  type WSEProbabilities,
} from './cubeInfo';
import { CubeType } from '@/app/components/inputs/cubeInputs';

// Type Definitions
type ItemType =
  | keyof typeof ITEM_PROBABILITIES
  | keyof typeof WSE_PROBABILITIES;
type LineType = 'stat' | SpecialLineType;
type SpecialLineType =
  | 'cdr'
  | 'cd'
  | 'dropmeso'
  | 'boss'
  | 'ied'
  | 'att'
  | 'any';
type Tier = 'low' | 'high';

interface LineClassification {
  type: LineType;
  value: number;
  tier: 'L' | 'U' | 'L/U';
}

export interface PotCalcResult {
  averageCost: string;
  totalProbability: number;
  averageTries: number;
  luckyCost: string;
  unluckyCost: string;
}

// Constants
const SPECIAL_LINE: Record<SpecialLineType, { L: number[]; U: number[] }> = {
  cdr: { L: [1, 2], U: [] },
  cd: { L: [8], U: [] },
  boss: { L: [35, 40], U: [30] },
  ied: { L: [35, 40], U: [30] },
  dropmeso: { L: [20], U: [] },
  att: { L: [12, 13], U: [9, 10] },
  any: { L: [1], U: [1] },
};

const STAT_VALUES: Record<Tier, { L: number[]; U: number[] }> = {
  low: { L: [12, 9], U: [9, 6] },
  high: { L: [13, 10], U: [10, 7] },
};

// Public Interface
export function findComboProb(
  combinations: Combination[],
  cubeType: CubeType,
  itemType: string,
  currentTier: Tier = 'high'
): PotCalcResult {
  const totalProbability = calculateTotalProbability(
    combinations,
    cubeType,
    itemType as ItemType,
    currentTier
  );

  // Calculate cost metrics
  const averageTries = totalProbability > 0 ? 1 / totalProbability : Infinity;
  const cubeCost = CUBE_COST[cubeType];

  const format = (cost: number) =>
    Number.isFinite(cost) ? Math.round(cost).toLocaleString() : '∞';

  return {
    averageCost: format(averageTries * cubeCost),
    totalProbability,
    averageTries,
    luckyCost: format(0.25 * averageTries * cubeCost),
    unluckyCost: format(1.5 * averageTries * cubeCost),
  };
}

function calculateTotalProbability(
  combinations: Combination[],
  cubeType: CubeType,
  itemType: ItemType,
  potTier: Tier
): number {
  let totalProbability = 0;
  combinations.forEach((combination) => {
    console.log(combination);
    let combinationProbability = 1;
    combination.lines.forEach((line, lineIndex) => {
      const lineProb = getPotProbability(
        combination,
        potTier,
        lineIndex,
        cubeType,
        itemType
      );
      console.log('lineProp', lineProb);
      combinationProbability *= lineProb;
    });
    console.log(typeof combinationProbability);

    totalProbability += combinationProbability;
    console.log(totalProbability);
  });
  return totalProbability;
}

function getPotProbability(
  combination: { lines: string[] },
  tier: Tier,
  index: number,
  cubeType: CubeType,
  itemType: ItemType
): number {
  const lineParts = combination.lines[index].split(' ');
  if (lineParts.length < 3) return 0; // Invalid line format

  const lineAmount = Number(lineParts[0]);
  const lineTier = lineParts[1];
  const lineType = lineParts[2] as LineType;

  // Get the cube's line rate for this tier and position
  const cubeLineRate =
    CUBE_PROBABILITIES[cubeType]?.[lineTier]?.[`line${index + 1}`] || 0;
  if (cubeLineRate === 0) return 1;
  if(lineType == 'any') return 1
  // Handle special line types (non-stat)
  if (lineType !== 'stat') {
    // Check if it's a WSE (Weapon, Secondary, Emblem) item
    const isWSE = ['Weapon', 'Secondary', 'Emblem'].includes(itemType);

    if (isWSE) {
      // Handle WSE-specific probabilities
      const wseProbs =
        WSE_PROBABILITIES[itemType as keyof typeof WSE_PROBABILITIES];
      if (!wseProbs) return 0;

      const lineKey = `${lineType}${lineAmount}` as keyof typeof wseProbs;
      const lineProb = wseProbs[lineKey] || 0;
      return (lineProb / 100) * cubeLineRate; // Convert percentage to decimal
    } else {
      // Handle regular equipment special lines
      const itemProbs =
        ITEM_PROBABILITIES[itemType as keyof typeof ITEM_PROBABILITIES];
      if (!itemProbs) return 0;

      const specialLineProbs = itemProbs[
        lineType as keyof ItemProbabilities
      ] as SpecialStatProbability | undefined;
      if (!specialLineProbs) return 0;

      const lineProb = specialLineProbs[lineAmount] || 0;
      return (lineProb / 100) * cubeLineRate; // Convert percentage to decimal
    }
  }

  // Handle stat lines
  const itemProbs =
    ITEM_PROBABILITIES[itemType as keyof typeof ITEM_PROBABILITIES]?.stat;
  if (!itemProbs) return 1;

  // Determine which probability tier to use
  let probTier: keyof ProbabilityTiers = 'allNonPrime';
  if (lineTier === 'L') {
    if (lineAmount === 13 || lineAmount === 12) probTier = 'statPrime';
    else if (lineAmount === 10 || lineAmount === 9) probTier = 'allPrime';
  } else if (lineTier === 'U') {
    if (lineAmount === 10 || lineAmount === 9) probTier = 'statNonPrime';
    else if (lineAmount === 7 || lineAmount === 6) probTier = 'allNonPrime';
  }

  const potProb =((itemProbs[probTier])/100 || 1);
  console.log(potProb, cubeLineRate, lineTier)
  return potProb * cubeLineRate;
}
