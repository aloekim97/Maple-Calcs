import { uptime } from 'process';
import findComboProb, {
  CubeProbabilities,
  PotCalcResult,
} from './cube/comboprobability';
import cubeCombo from './cube/cubecombo';
import { WSE, WSEItemType } from './cube/potentialdropdown';
import aggregateLines from './cube/addpotlines';

const CUBE_COST: { [key: string]: number } = {
  black: 22000000,
  red: 12000000,
};

const VALID_TARGETS_BY_POTENTIAL_TYPE: { [key: string]: number[] } = {
  stat: [24, 27, 30, 33, 36, 39],
  cdr: [1, 2, 3, 4, 5, 6],
  cd: [8, 16, 24],
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
  itemType: string
): PotCalcResult {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const cost = CUBE_COST[cubeType];
  const addedUpLines = aggregateLines(lines);

  const potCombo = cubeCombo(addedUpLines, tier);
  const potProb = findComboProb(potCombo, cubeType, itemType);
  // return {
  //   averageCost,
  //   totalProbability,
  //   averageTry,
  //   combinations: formatCombinations(combinations),
  // };
}
