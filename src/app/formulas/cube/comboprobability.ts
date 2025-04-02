import { Combination } from './cubecombo';
import { ITEM_PROBABILITIES } from './potentialprobability';

export interface CubeProbabilities {
  line1: number;
  line2: number;
  line3: number;
}

export const CUBE_PROBABILITIES: { [key: string]: CubeProbabilities } = {
  black: { line1: 1.0, line2: 0.2, line3: 0.05 },
  red: { line1: 1.0, line2: 0.1, line3: 0.01 },
};

export interface PotCalcResult {
  averageCost: string; // Formatted with commas
  totalProbability: number; // Total probability of all valid combinations
  averageTry: number; // Average number of tries needed
  combinations: Combination[]; // All valid combinations
}
const VALID_TARGETS_BY_POTENTIAL_TYPE: { [key: string]: number[] } = {
  stat: [24, 27, 30, 33, 36],
  cooldown: [1, 2, 3, 4, 5, 6].concat([0, 6, 7, 9, 10, 12, 13]),
  critDamage: [8, 16, 24].concat([0, 6, 7, 9, 10, 12, 13]),
};

export default function findComboProb(
  combinations: Combination[],
  cubeType: string,
  itemType: string,
): number {
  const cubeProb = CUBE_PROBABILITIES[cubeType];
  const itemProb = ITEM_PROBABILITIES[itemType];
  console.log(itemProb)

  let totalProbability = 0;

  console.log(`Total probability: ${totalProbability}`);
  return totalProbability > 0 ? 1 / totalProbability : Infinity;
}
