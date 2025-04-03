import findComboProb, {
  CubeProbabilities,
  PotCalcResult,
} from './cube/comboprobability';
import cubeCombo from './cube/cubecombo';
import { WSE, WSEItemType } from './cube/potentialdropdown';
import aggregateLines from './cube/addpotlines';

export const CUBE_COST: { [key: string]: number } = {
  black: 22000000,
  red: 12000000,
};

export const lPrime: { [key: string]: number[] } = {
  low: [12, 9],
  high: [13, 10],
};

export const uPrime: { [key: string]: number[] } = {
  low: [9, 6],
  high: [10, 7],
};

export function potCalc(
  itemLevel: number,
  cubeType: string,
  startingTier: string,
  desiredTier: string,
  lines: { first: string; second: string; third: string },
  itemType: WSEItemType,
): PotCalcResult {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const cost = CUBE_COST[cubeType];

  const addedUpLines = aggregateLines(lines);
  console.log('Aggregated lines:', addedUpLines);

  const potCombo = cubeCombo(addedUpLines, tier);
  console.log('Generated combinations:', potCombo);

  const potProb = findComboProb(potCombo, cubeType, itemType);
  console.log('Probability result:', potProb);

  // Calculate average tries and cost
  const averageTry = potProb;
  const averageCost = (averageTry * cost).toLocaleString();

  console.groupEnd();

  return {
    averageCost,
    totalProbability: 1/potProb,
    averageTry,
    combinations: potCombo
  };
}

// Test function
// export function testPotCalc() {
//   console.group('[testPotCalc] Running test');
//   const result = potCalc(
//     160,
//     'black',
//     'rare',
//     'legendary',
//     { first: "12% L", second: "9% U", third: "6% U" },
//     'Gloves'
//   );
//   console.log('Test result:', result);
//   console.groupEnd();
//   return result;
// }

// Uncomment to run test automatically
// testPotCalc();