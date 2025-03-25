interface Combination {
  line1: string;
  line2: string;
  line3: string;
}

interface CubeProbabilities {
  line1: number;
  line2: number;
  line3: number;
}

interface ItemProbabilities {
  [key: string]: {
    statPrime: number;
    allPrime: number;
    statNonPrime: number;
    allNonPrime: number;
  };
}

const CUBE_PROBABILITIES: { [key: string]: CubeProbabilities } = {
  black: { line1: 1.0, line2: 0.2, line3: 0.05 },
  red: { line1: 1.0, line2: 0.1, line3: 0.01 },
};

const CUBE_COST: { [key: string]: number } = {
  black: 22000000, // Cost of a Black Cube
  red: 12000000, // Cost of a Red Cube
};

const ITEM_PROBABILITIES: { [key: string]: ItemProbabilities } = {
  hat: {
    stat: {
      statPrime: 0.0889, // 1/11.25
      allPrime: 0.0667, // 1/15
      statNonPrime: 0.0893, // 1/11.2
      allNonPrime: 0.0714, // 1/14
    },
  },
};

const VALID_TARGETS_BY_POTENTIAL_TYPE: { [key: string]: number[] } = {
  stat: [24, 27, 30, 33, 36],
  cooldown: [1, 2, 3, 4, 5, 6],
  critDamage: [8, 16, 24],
  cooldownStat: [1, 2, 3, 4].concat([6, 7, 9, 10, 12, 13]),
};

export interface PotCalcResult {
  averageCost: string; // Formatted with commas
  totalProbability: number; // Total probability of all valid combinations
  averageTry: number; // Average number of tries needed
  combinations: Combination[]; // All valid combinations
}

export function potCalc(
  itemType: string,
  itemLevel: number,
  potentialType: string,
  goal: number,
  cubeType: string
): PotCalcResult | undefined {
  const { lPrime, uPrime } =
    itemLevel <= 150
      ? { lPrime: [12, 9], uPrime: [9, 6] }
      : { lPrime: [13, 10], uPrime: [10, 7] };
  const validTargets = VALID_TARGETS_BY_POTENTIAL_TYPE[potentialType];
  const cost = CUBE_COST[cubeType];

  if (!validTargets.includes(goal)) {
    console.log(
      `Invalid goal. Valid targets for potential type ${potentialType} are: ${validTargets.join(
        ', '
      )}`
    );
    return;
  }

  const goalIndex = validTargets.indexOf(goal);
  if (goalIndex === -1) {
    console.log(`Goal ${goal} is not in valid targets.`);
    return;
  }

  const targetsFromGoal = validTargets.slice(goalIndex);
  const validCombinations: Combination[] = [];

  for (const target of targetsFromGoal) {
    const combinations = generateCombinations(target, lPrime, uPrime);
    validCombinations.push(...combinations);
  }

  const averageTry = findComboProb(
    validCombinations,
    cubeType,
    itemType,
    potentialType
  );

  const totalProbability = 1 / averageTry; // Calculate total probability
  const totalCost = averageTry * cost;

  // Format the total cost with commas
  const formattedCost = totalCost.toLocaleString();

  return {
    averageCost: formattedCost,
    totalProbability,
    averageTry,
    combinations: validCombinations,
  };
}

function generateCombinations(
  goal: number,
  lPrime: number[],
  uPrime: number[]
): Combination[] {
  const combinations: Combination[] = [];
  const taggedLPrime = lPrime.map((value) => `${value} (lPrime)`);
  const taggedUPrime = uPrime.map((value) => `${value} (uPrime)`);
  const firstValues = taggedLPrime;
  const validValues = [...taggedLPrime, ...taggedUPrime];

  for (const value1 of firstValues) {
    for (const value2 of validValues) {
      for (const value3 of validValues) {
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);
        const num3 = parseFloat(value3);

        if (num1 + num2 + num3 >= goal) {
          combinations.push({ line1: value1, line2: value2, line3: value3 });
        }
      }
    }
  }
  return combinations;
}

function findComboProb(
  combinations: Combination[],
  cubeType: string,
  itemType: string,
  potentialType: string
): number {
  const cubeProb = CUBE_PROBABILITIES[cubeType];
  const itemProb = ITEM_PROBABILITIES[itemType][potentialType];
  
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
    const line1Prob = (num1 === 9 || num1 === 12 || num1 === 13 || num1 === 10) 
      ? itemProb.allPrime 
      : itemProb.statPrime;

    // LINE 2 Probability
    let line2Prob = 0;
    if (isLine2Prime) {
      const primeProb = cubeProb.line2;
      const valueProb = (num2 === 9 || num2 === 12 || num2 === 13 || num2 === 10)
        ? itemProb.allPrime
        : itemProb.statPrime;
      line2Prob = primeProb * valueProb;
    } else {
      line2Prob = (1 - cubeProb.line2) * (
        (num2 === 9 || num2 === 12 || num2 === 13 || num2 === 10)
          ? itemProb.allNonPrime
          : itemProb.statNonPrime
      );
    }

    // LINE 3 Probability
    let line3Prob = 0;
    if (isLine3Prime) {
      const primeProb = cubeProb.line3;
      const valueProb = (num3 === 9 || num3 === 12 || num3 === 13 || num3 === 10)
        ? itemProb.allPrime
        : itemProb.statPrime;
      line3Prob = primeProb * valueProb;
    } else {
      line3Prob = (1 - cubeProb.line3) * (
        (num3 === 9 || num3 === 12 || num3 === 13 || num3 === 10)
          ? itemProb.allNonPrime
          : itemProb.statNonPrime
      );
    }

    const comboProb = line1Prob * line2Prob * line3Prob;
    totalProbability += comboProb;

  }

  console.log(`Total probability: ${totalProbability}`);
  return totalProbability > 0 ? 1 / totalProbability : Infinity;
}