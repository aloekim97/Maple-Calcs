import { Combination } from './potentialpermutations';
import {
  CUBE_COST,
  CUBE_PROBABILITIES,
  ITEM_PROBABILITIES,
  ProbabilityTiers,
  SpecialStatProbability,
  WSE_PROBABILITIES,
  type ItemProbabilities,
} from './cubeInfo';
import { CubeType } from '@/app/components/inputs/cubeInputs';

type ItemType =
  | keyof typeof ITEM_PROBABILITIES
  | keyof typeof WSE_PROBABILITIES;
type LineType = 'stat' | SpecialLineType;
type SpecialLineType =
  | 'cdr'
  | 'cd'
  | 'drop'
  | 'meso'
  | 'boss'
  | 'ied'
  | 'att'
  | 'any';
type Tier = 'low' | 'high';

export interface LineClassification {
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
  medianCost?: string;
}

// Error type for better error handling
interface PotCalcError {
  error: string;
  averageCost: string;
  totalProbability: number;
  averageTries: number;
  luckyCost: string;
  unluckyCost: string;
}

type PotCalcResultOrError = PotCalcResult | PotCalcError;

export const SPECIAL_LINE: Record<
  SpecialLineType,
  { L: number[]; U: number[] }
> = {
  cdr: { L: [1, 2], U: [] },
  cd: { L: [8], U: [] },
  boss: { L: [35, 40], U: [30] },
  ied: { L: [35, 40], U: [30] },
  drop: { L: [20], U: [] },
  meso: { L: [20], U: [] },
  att: { L: [12, 13], U: [9, 10] },
  any: { L: [1], U: [1] },
};

export const STAT_VALUES: Record<Tier, { L: number[]; U: number[] }> = {
  low: { L: [12, 9], U: [9, 6] },
  high: { L: [13, 10], U: [10, 7] },
};

function createErrorResult(message: string): PotCalcError {
  return {
    error: message,
    averageCost: '∞',
    totalProbability: 0,
    averageTries: Infinity,
    luckyCost: '∞',
    unluckyCost: '∞',
  };
}

export function findComboProb(
  combinations: Combination[] | { error: string },
  cubeType: CubeType,
  itemType: string,
  currentTier: Tier = 'high'
): PotCalcResultOrError {
  if ('error' in combinations) {
    return createErrorResult(combinations.error);
  }

  if (!Array.isArray(combinations)) {
    return createErrorResult('Invalid combinations input');
  }

  if (combinations.length === 0) {
    return createErrorResult('No combinations provided');
  }

  try {
    const totalProbability = calculateTotalProbability(
      combinations,
      cubeType,
      itemType as ItemType,
      currentTier
    );

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
  } catch (error) {
    return createErrorResult(
      error instanceof Error
        ? error.message
        : 'Unknown error in probability calculation'
    );
  }
}

function calculateTotalProbability(
  combinations: Combination[],
  cubeType: CubeType,
  itemType: ItemType,
  potTier: Tier
): number {
  let totalProbability = 0;

  for (const combination of combinations) {
    let combinationProbability = 1;

    for (let lineIndex = 0; lineIndex < combination.lines.length; lineIndex++) {
      const lineProb = getPotProbability(
        combination,
        potTier,
        lineIndex,
        cubeType,
        itemType
      );
      combinationProbability *= lineProb;
    }

    totalProbability += combinationProbability;
  }

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
  if (lineParts.length < 3) return 0;

  const lineAmount = Number(lineParts[0]);
  const lineTier = lineParts[1];
  const lineType = lineParts[2] as LineType;

  const cubeLineRate =
    CUBE_PROBABILITIES[cubeType]?.[lineTier]?.[`line${index + 1}`] || 0;
  if (cubeLineRate === 0) return 1;
  if (lineType === 'any') return 1;

  if (lineType !== 'stat') {
    const isWSE = ['Weapon', 'Secondary', 'Emblem'].includes(itemType);

    if (isWSE) {
      const wseProbs =
        WSE_PROBABILITIES[itemType as keyof typeof WSE_PROBABILITIES];
      if (!wseProbs) return 0;

      const lineKey = `${lineType}${lineAmount}` as keyof typeof wseProbs;
      const lineProb = wseProbs[lineKey] || 0;
      return (lineProb / 100) * cubeLineRate;
    } else {
      const itemProbs =
        ITEM_PROBABILITIES[itemType as keyof typeof ITEM_PROBABILITIES];
      if (!itemProbs) return 0;

      const specialLineProbs = itemProbs[
        lineType as keyof ItemProbabilities
      ] as SpecialStatProbability | undefined;
      if (!specialLineProbs) return 0;

      const lineProb = specialLineProbs[lineAmount] || 0;
      return (lineProb / 100) * cubeLineRate;
    }
  }

  const itemProbs =
    ITEM_PROBABILITIES[itemType as keyof typeof ITEM_PROBABILITIES]?.stat;
  if (!itemProbs) return 1;

  let probTier: keyof ProbabilityTiers = 'allNonPrime';
  if (lineTier === 'L') {
    if (lineAmount === 13 || lineAmount === 12) probTier = 'statPrime';
    else if (lineAmount === 10 || lineAmount === 9) probTier = 'allPrime';
  } else if (lineTier === 'U') {
    if (lineAmount === 10 || lineAmount === 9) probTier = 'statNonPrime';
    else if (lineAmount === 7 || lineAmount === 6) probTier = 'allNonPrime';
  }

  const potProb = itemProbs[probTier] / 100 || 1;
  return potProb * cubeLineRate;
}
