import { Combination } from './cubecombo';

export interface CubeProbabilities {
  line1: number;
  line2: number;
  line3: number;
}

export const CUBE_PROBABILITIES: { [key: string]: CubeProbabilities } = {
  black: { line1: 1.0, line2: 0.2, line3: 0.05 },
  red: { line1: 1.0, line2: 0.1, line3: 0.01 },
};

export interface ProbabilityTiers {
  statPrime: number;
  allPrime: number;
  statNonPrime: number;
  allNonPrime: number;
}

export interface ItemProbabilities {
  stat: ProbabilityTiers;
  cooldown?: {
    1: number;
    2: number;
  };
  critdamage?: {
    1: number;
  }
}

export const ITEM_PROBABILITIES: { [key: string]: ItemProbabilities } = {
  hat: {
    stat: {
      statPrime: 0.585 / 6, // ~9.75%
      allPrime: 0.366 / 5, // ~7.32%
      statNonPrime: 9.61, // 1/11.2 in percentage?
      allNonPrime: 7.69, // 1/14 in percentage?
    },
    cooldown: {
      1: 1,
      2: 2,
    },
  },
  top: {
    stat: {
      statPrime: 0, // ~9.75%
      allPrime: 0, // ~7.32%
      statNonPrime: 0, // 1/11.2 in percentage?
      allNonPrime: 0, // 1/14 in percentage?
    },
    critdamage: {
      1: 1,
    },
  },
};

export interface PotCalcResult {
  averageCost: string; // Formatted with commas
  totalProbability: number; // Total probability of all valid combinations
  averageTry: number; // Average number of tries needed
  combinations: Combination[]; // All valid combinations
}

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
