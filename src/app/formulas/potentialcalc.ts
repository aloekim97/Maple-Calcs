import { findComboProb, PotCalcResult } from './cube/potentialprobability';
import potentialPermutations from './cube/potentialpermutations';
import { CUBE_COST } from './cube/cubeInfo';
import { CubeType } from '../components/inputs/cubeInputs';

export interface PotCalculationInput {
  itemLevel: number;
  cubeType: string;
  startingTier: string;
  desiredTier: string;
  lines: { first: string; second: string; third: string };
  itemType: string;
}

export function potCalc(
  itemLevel: number,
  cubeType: CubeType,
  startingTier: string,
  desiredTier: string,
  lines: { first: string; second: string; third: string },
  itemType: string
): PotCalcResult & {
  luckyCost: string;
  unluckyCost: string;
  averageTries: number;
  medianCost: string;
  veryUnluckyCost: string;
} {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const cost = CUBE_COST[cubeType];
  const potCombo = potentialPermutations(lines, tier);
  const potProb = findComboProb(potCombo, cubeType, itemType);

  const getPercentileTries = (percentile: number): number => {
    if (potProb.averageTries <= 0) return 0;
    return Math.ceil(
      Math.log(1 - percentile) / Math.log(1 - 1 / potProb.averageTries)
    );
  };

  const averageTry = potProb.averageTries;
  const revealMultiplier = { 0: 0, 31: 0.5, 71: 2.5, 121: 20 };
  function getMultiplier(itemLevel) {
    const thresholds = Object.keys(revealMultiplier)
      .map(Number)
      .sort((a, b) => b - a);

    const foundThreshold = thresholds.find(
      (threshold) => threshold <= itemLevel
    );
    return revealMultiplier[foundThreshold];
  }

  const revealCost = (itemLevel) => {
    const multiplier = getMultiplier(itemLevel);
    return itemLevel ** 2 * multiplier;
  };
  const luckyTries = getPercentileTries(0.25);
  const medianTries = getPercentileTries(0.5);
  const unluckyTries = getPercentileTries(0.75);
  const veryUnluckyTries = getPercentileTries(0.9);

  const averageCost = Math.round(
    averageTry === 1
      ? 0
      : averageTry * cost + averageTry * revealCost(itemLevel)
  );
  const luckyCost = Math.round(luckyTries * cost);
  const medianCost = Math.round(medianTries * cost);
  const unluckyCost = Math.round(unluckyTries * cost);
  const veryUnluckyCost = Math.round(veryUnluckyTries * cost);

  return {
    averageCost: averageCost.toLocaleString(),
    totalProbability: potProb.totalProbability,
    averageTries: averageTry,
    luckyCost: luckyCost.toLocaleString(),
    unluckyCost: unluckyCost.toLocaleString(),
    medianCost: medianCost.toLocaleString(),
    veryUnluckyCost: veryUnluckyCost.toLocaleString(),
  };
}
