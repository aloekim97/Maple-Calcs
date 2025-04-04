import { findComboProb, PotCalcResult } from './cube/potentialprobability';
import potentialPermutations from './cube/potentialpermutations';
import aggregateLines from './cube/simplifypotential';
import { CUBE_COST } from './cube/cubeInfo';
import { CubeType } from '../components/cubeInputs';

interface PotCalculationInput {
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
): PotCalcResult {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const cost = CUBE_COST[cubeType];

  // Aggregate and validate lines
  const addedUpLines = aggregateLines(lines);
  if (!addedUpLines) {
    throw new Error('Invalid potential lines provided');
  }

  // Generate all valid combinations with permutations
  const potCombo = potentialPermutations(addedUpLines, tier);
  if (!potCombo || potCombo.length === 0) {
    throw new Error('No valid combinations found for the given parameters');
  }

  // Calculate probabilities
  const potProb = findComboProb(potCombo, cubeType, itemType);
  if (!potProb || potProb.averageTry === Infinity) {
    throw new Error('Failed to calculate probabilities for combinations');
  }

  // Calculate final results
  const averageTry = potProb.averageTry;
  const averageCost = Math.round(averageTry * cost).toLocaleString();
  const totalProbability = potProb.totalProbability;

  console.groupEnd();

  return {
    averageCost,
    totalProbability,
    averageTry,
  };
}
