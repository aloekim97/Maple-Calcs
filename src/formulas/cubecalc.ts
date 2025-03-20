export default function cubeCalc(
  goal: number,
  itemLevel: number,
  itemType: string,
  cubeType: 'red' | 'black'
) {
  const { validValues, validTargets } =
    itemLevel <= 150
      ? { validValues: [12, 9, 6], validTargets: [24, 27, 30, 33, 36] }
      : { validValues: [13, 10, 7], validTargets: [27, 30, 33, 36, 39] };

  if (!validTargets.includes(goal)) {
    console.log(
      `Invalid goal. Valid targets for item level ${itemLevel} are: ${validTargets.join(
        ', '
      )}`
    );
    return;
  }

  const combinations = generateCombinations(goal, validValues);

  if (combinations.length === 0) {
    console.log('No valid combinations found.');
    return;
  }

  const expectedTriesList = combinations.map((combo) =>
    calcExpectedValue(combo, itemType, cubeType)
  );

  const averageExpectedTries =
    expectedTriesList.reduce((sum, tries) => sum + tries, 0) /
    combinations.length;

  const cubeCost = getCubeCost(cubeType);
  const costToUse = calculateCostToUse(itemLevel, itemType);
  const totalCostPerTry = cubeCost + costToUse;

  const averageCost = averageExpectedTries * totalCostPerTry;

  const std = averageCost * 0.2;
  const luckyCost = averageCost - std;
  const unluckyCost = averageCost + std;

  console.log(`Expected Tries: ${averageExpectedTries.toFixed(2)}`);
  console.log(`Average Cost: ${formatCost(averageCost)}`);
  console.log(`Lucky Cost: ${formatCost(luckyCost)}`);
  console.log(`Unlucky Cost: ${formatCost(unluckyCost)}`);
}

function formatCost(cost: number): string {
  return cost.toLocaleString('en-US', { maximumFractionDigits: 0 });
}

function generateCombinations(
  goal: number,
  validValues: number[]
): Array<{ 1: number; 2: number; 3: number }> {
  const combinations: Array<{ 1: number; 2: number; 3: number }> = [];

  const firstValues = [validValues[0], validValues[1]];

  for (const value1 of firstValues) {
    for (const value2 of validValues) {
      for (const value3 of validValues) {
        if (value1 + value2 + value3 === goal) {
          combinations.push({ 1: value1, 2: value2, 3: value3 });
        }
      }
    }
  }

  return combinations;
}

function calcExpectedValue(
  combo: { 1: number; 2: number; 3: number },
  itemType: string,
  cubeType: 'red' | 'black'
): number {
  const probabilities = {
    black: { line1: 1.0, line2: 0.2, line3: 0.05 },
    red: { line1: 1.0, line2: 0.1, line3: 0.01 },
  };

  const { line1, line2, line3 } = probabilities[cubeType];

  const itemProbabilities = {
    hat: {
      primeStat: 1 / 10,
      allStat: { chance: 0.2, value: 1 / 10 },
      nonPrimeStat: { chance: 0.8, value: 1 / 11 },
    },
    gloves: {
      primeStat: 1 / 10,
      allStat: { chance: 0.2, value: 1 / 10 },
      nonPrimeStat: { chance: 0.8, value: 1 / 11 },
    },
  };

  const { primeStat, allStat, nonPrimeStat } =
    itemProbabilities[itemType as keyof typeof itemProbabilities];

  const probLine1 = line1 * primeStat;
  const probLine2 =
    line2 *
    (allStat.chance * allStat.value + nonPrimeStat.chance * nonPrimeStat.value);
  const probLine3 =
    line3 *
    (allStat.chance * allStat.value + nonPrimeStat.chance * nonPrimeStat.value);

  const probSuccess = probLine1 * probLine2 * probLine3;

  const expectedTries = 1 / probSuccess;

  return expectedTries;
}

function getCubeCost(cubeType: 'red' | 'black'): number {
  const cubeCosts = {
    red: 12000000,
    black: 22000000,
  };

  return cubeCosts[cubeType];
}

function calculateCostToUse(itemLevel: number, itemType: string): number {
  // Placeholder for the cost-to-use formula
  // Replace this with the actual formula when provided
  return 0; // Default to 0 for now
}
