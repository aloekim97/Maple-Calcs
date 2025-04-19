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
  medianCost: string;
  veryUnluckyCost: string;
} {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const cost = CUBE_COST[cubeType];

  // Generate all valid combinations with permutations
  const potCombo = potentialPermutations(lines, tier);

  // Calculate probabilities
  const potProb = findComboProb(potCombo, cubeType, itemType);

  // Helper function to calculate percentile tries
  const getPercentileTries = (percentile: number): number => {
    if (potProb.averageTries <= 0) return 0;
    return Math.ceil(
      Math.log(1 - percentile) / Math.log(1 - 1 / potProb.averageTries)
    );
  };

  // Calculate cost metrics using percentiles
  const averageTry = potProb.averageTries;
  const revealMultiplier = { 0: 0, 31: 0.5, 71: 2.5, 121: 20 };
  function getMultiplier(itemLevel) {
    // Get all the threshold levels and sort them in descending order
    const thresholds = Object.keys(revealMultiplier)
      .map(Number)
      .sort((a, b) => b - a);

    // Find the first threshold that's <= itemLevel
    const foundThreshold = thresholds.find(
      (threshold) => threshold <= itemLevel
    );

    // Return the corresponding multiplier
    return revealMultiplier[foundThreshold];
  }

  const revealCost = (itemLevel) => {
    const multiplier = getMultiplier(itemLevel);
    return itemLevel ** 2 * multiplier;
  };
  const luckyTries = getPercentileTries(0.25); // 25th percentile (lucky)
  const medianTries = getPercentileTries(0.5); // 50th percentile (median)
  const unluckyTries = getPercentileTries(0.75); // 75th percentile (unlucky)
  const veryUnluckyTries = getPercentileTries(0.9); // 90th percentile (very unlucky)

  const averageCost = Math.round(
    averageTry * cost + averageTry * revealCost(itemLevel)
  );
  const luckyCost = Math.round(luckyTries * cost);
  const medianCost = Math.round(medianTries * cost);
  const unluckyCost = Math.round(unluckyTries * cost);
  const veryUnluckyCost = Math.round(veryUnluckyTries * cost);

  return {
    averageCost: averageCost.toLocaleString(),
    totalProbability: potProb.totalProbability,
    averageTry,
    luckyCost: luckyCost.toLocaleString(),
    unluckyCost: unluckyCost.toLocaleString(),
    medianCost: medianCost.toLocaleString(),
    veryUnluckyCost: veryUnluckyCost.toLocaleString(),
  };
}
