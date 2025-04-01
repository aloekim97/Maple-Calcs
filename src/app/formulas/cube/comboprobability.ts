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
  potentialType: string
): number {
  const cubeProb = CUBE_PROBABILITIES[cubeType];
  const itemProb = (ITEM_PROBABILITIES[itemType] as any)[potentialType];

  let totalProbability = 0;

  for (const comb of combinations) {
    const { line1, line2, line3 } = comb;

    // Parse values and prime status
    const num1 = parseFloat(line1);
    const num2 = parseFloat(line2);
    const num3 = parseFloat(line3);
    // Line1 is always prime
    const isLine2Prime = line2.includes('lPrime') || line2.includes('uPrime');
    const isLine3Prime = line3.includes('lPrime') || line3.includes('uPrime');

    // LINE 1 Probability (always prime)
    const line1Prob =
      num1 === 9 || num1 === 12 || num1 === 13 || num1 === 10
        ? itemProb.allPrime
        : itemProb.statPrime;

    // LINE 2 Probability
    let line2Prob = 0;
    if (isLine2Prime) {
      const primeProb = cubeProb.line2;
      const valueProb =
        num2 === 9 || num2 === 12 || num2 === 13 || num2 === 10
          ? itemProb.allPrime
          : itemProb.statPrime;
      line2Prob = primeProb * valueProb;
    } else {
      line2Prob =
        (1 - cubeProb.line2) *
        (num2 === 9 || num2 === 12 || num2 === 13 || num2 === 10
          ? itemProb.allNonPrime
          : itemProb.statNonPrime);
    }

    // LINE 3 Probability
    let line3Prob = 0;
    if (isLine3Prime) {
      const primeProb = cubeProb.line3;
      const valueProb =
        num3 === 9 || num3 === 12 || num3 === 13 || num3 === 10
          ? itemProb.allPrime
          : itemProb.statPrime;
      line3Prob = primeProb * valueProb;
    } else {
      line3Prob =
        (1 - cubeProb.line3) *
        (num3 === 9 || num3 === 12 || num3 === 13 || num3 === 10
          ? itemProb.allNonPrime
          : itemProb.statNonPrime);
    }

    const comboProb = line1Prob * line2Prob * line3Prob;
    totalProbability += comboProb;
  }

  console.log(`Total probability: ${totalProbability}`);
  return totalProbability > 0 ? 1 / totalProbability : Infinity;
}
