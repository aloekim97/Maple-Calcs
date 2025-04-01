import { uptime } from 'process';
import findComboProb, {
  CubeProbabilities,
  PotCalcResult,
} from './cube/comboprobability';
import cubeCombo, { Combination } from './cube/cubecombo';
import { WSE, WSEItemType } from './cube/potentialdropdown';

const CUBE_PROBABILITIES: { [key: string]: CubeProbabilities } = {
  black: { line1: 1.0, line2: 0.2, line3: 0.05 },
  red: { line1: 1.0, line2: 0.1, line3: 0.01 },
};

const CUBE_COST: { [key: string]: number } = {
  black: 22000000,
  red: 12000000,
};

const VALID_TARGETS_BY_POTENTIAL_TYPE: { [key: string]: number[] } = {
  stat: [24, 27, 30, 33, 36, 39],
  cdr: [1, 2, 3, 4, 5, 6],
  cd: [8, 16, 24],
};
const lPrime: { [key: string]: number[] } = {
  low: [12, 9],
  high: [13, 10],
};
const uPrime: { [key: string]: number[] } = {
  low: [9, 6],
  high: [10, 7],
};

// Main function
export function potCalc(
  itemLevel: number,
  goal: {
    cdr: number;
    cd: number;
    stat: number;
  },
  cubeType: string
): PotCalcResult | undefined {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const cost = CUBE_COST[cubeType];

  let potentialType: string;
  let numericGoal: number;
  const getComboProbability = cubeCombo(goal, lPrime[tier], uPrime[tier]);
}
