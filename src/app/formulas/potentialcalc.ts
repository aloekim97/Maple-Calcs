import { findComboProb, PotCalcResult } from './cube/potentialprobability';
import potentialPermutations from './cube/potentialpermutations';
import aggregateLines from './cube/simplifypotential';
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
  // Aggregate and validate lines
  const addedUpLines = aggregateLines(lines);

  // Generate all valid combinations with permutations
  const potCombo = potentialPermutations(addedUpLines, tier);

  // Calculate probabilities
  const potProb = findComboProb(potCombo, cubeType, itemType);

  // Helper function to calculate percentile tries
  const getPercentileTries = (percentile: number): number => {
    return Math.ceil(
      Math.log(1 - percentile) / Math.log(1 - 1 / potProb.averageTry)
    );
  };

  // Calculate cost metrics using percentiles
  const averageTry = potProb.averageTry;

  const luckyTries = getPercentileTries(0.25); // 25th percentile (lucky)
  const medianTries = getPercentileTries(0.5); // 50th percentile (median)
  const unluckyTries = getPercentileTries(0.75); // 75th percentile (unlucky)
  const veryUnluckyTries = getPercentileTries(0.9); // 90th percentile (very unlucky)

  const averageCost = Math.round(averageTry * cost);
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
