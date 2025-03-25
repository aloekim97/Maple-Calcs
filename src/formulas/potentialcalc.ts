import cubeCombo, { Combination } from "./cube/cubecombo";
import findComboProb, { CubeProbabilities, PotCalcResult } from "./cube/cubeprob";

const CUBE_PROBABILITIES: { [key: string]: CubeProbabilities } = {
  black: { line1: 1.0, line2: 0.2, line3: 0.05 },
  red: { line1: 1.0, line2: 0.1, line3: 0.01 },
};

const CUBE_COST: { [key: string]: number } = {
  black: 22000000, // Cost of a Black Cube
  red: 12000000, // Cost of a Red Cube
};

const VALID_TARGETS_BY_POTENTIAL_TYPE: { [key: string]: number[] } = {
  stat: [24, 27, 30, 33, 36],
  cooldown: [1, 2, 3, 4, 5, 6],
  critDamage: [8, 16, 24],
  cooldownStat: [1, 2, 3, 4].concat([6, 7, 9, 10, 12, 13]),
};

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
    const combinations = cubeCombo(target, lPrime, uPrime);
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


