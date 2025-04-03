import { CUBE_COST } from '../potentialcalc';
import { Combination } from './cubecombo';
import { ITEM_PROBABILITIES, ProbabilityTiers } from './potentialprobability';

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
  averageCost: string;
  totalProbability: number;
  averageTry: number;
  combinations: Combination[];
}

const statValues: { [key: string]: number[] } = {
  statPrime: [12, 13],
  allPrime: [9, 10],
  statNonPrime: [9, 10],
  allNonPrime: [6, 7],
};

export default function findComboProb(
  combinations: Combination[],
  cubeType: string,
  itemType: string
): number {
  console.log(
    '[findComboProb] Starting calculation for',
    itemType,
    'with',
    cubeType,
    'cube'
  );

  const cubeProb = CUBE_PROBABILITIES[cubeType];
  const itemProb = ITEM_PROBABILITIES[itemType];

  if (!itemProb) {
    console.error(`No probability data found for item type: ${itemType}`);
    return Infinity;
  }

  function classifyLine(line: string): { type: string; value: number } {
    // First check for special lines
    if (line.includes('Cooldown')) {
      const valueMatch = line.match(/(\d+)%/);
      const value = valueMatch ? parseInt(valueMatch[1]) : 0;
      return { type: 'cooldown', value };
    }
    if (line.includes('Critical Damage')) {
      const valueMatch = line.match(/(\d+)%/);
      const value = valueMatch ? parseInt(valueMatch[1]) : 0;
      return { type: 'critdamage', value };
    }
    if (line.includes('Meso')) {
      const valueMatch = line.match(/(\d+)%/);
      const value = valueMatch ? parseInt(valueMatch[1]) : 0;
      return { type: 'dropmeso', value };
    }

    // Handle regular stat lines
    const match = line.match(/(\d+)% ([LU])/);
    if (!match) return { type: 'unknown', value: 0 };

    const value = parseInt(match[1]);
    const lineType = match[2];

    if (lineType === 'L') {
      if (statValues.statPrime.includes(value))
        return { type: 'statPrime', value };
      if (statValues.allPrime.includes(value))
        return { type: 'allPrime', value };
    } else {
      if (statValues.statNonPrime.includes(value))
        return { type: 'statNonPrime', value };
      if (statValues.allNonPrime.includes(value))
        return { type: 'allNonPrime', value };
    }

    return { type: 'unknown', value };
  }

  function getLineProbability(
    lineInfo: { type: string; value: number },
    lineNumber: number
  ): number {
    const cubeLineProb =
      cubeProb[`line${lineNumber}` as keyof CubeProbabilities];
    let itemLineProb = 0;

    console.debug(
      `Processing ${lineInfo.type} ${lineInfo.value}% (Line ${lineNumber})`
    );

    // Special lines
    if (['cooldown', 'critdamage', 'dropmeso'].includes(lineInfo.type)) {
      const probTable = itemProb[lineInfo.type as keyof typeof itemProb];
      if (probTable && typeof probTable === 'object') {
        itemLineProb =
          (probTable as Record<number, number>)[lineInfo.value] || 0;
      }
    }
    // Stat lines
    else if (itemProb.stat && lineInfo.type in itemProb.stat) {
      itemLineProb = itemProb.stat[lineInfo.type as keyof ProbabilityTiers];
    }

    console.debug(`Cube prob: ${cubeLineProb}, Item prob: ${itemLineProb}%`);
    const totalProb = cubeLineProb * (itemLineProb / 100);
    console.debug(`Total line prob: ${totalProb}`);

    return totalProb;
  }

  let totalProbability = 0;
  let validCombinations = 0;

  // Only analyze first 2 combinations for debugging
  const combinationsToAnalyze = combinations.slice(0, 2);

  combinationsToAnalyze.forEach((combo, index) => {
    console.group(`\n=== Combination ${index + 1} ===`);
    console.log('Lines:', combo.lines);

    const line1Info = classifyLine(combo.lines[0]);
    const line2Info = classifyLine(combo.lines[1]);
    const line3Info = classifyLine(combo.lines[2]);

    console.log('Classified as:', {
      line1: line1Info,
      line2: line2Info,
      line3: line3Info,
    });

    const line1Prob = getLineProbability(line1Info, 1);
    const line2Prob = getLineProbability(line2Info, 2);
    const line3Prob = getLineProbability(line3Info, 3);

    console.log('Probabilities:', {
      line1: line1Prob,
      line2: line2Prob,
      line3: line3Prob,
    });

    const comboProb = line1Prob * line2Prob * line3Prob;
    console.log('Combination probability:', comboProb);

    if (comboProb > 0) {
      totalProbability += comboProb;
      validCombinations++;
    }

    console.groupEnd();
  });

  const averageTries =
    totalProbability > 0
      ? Math.round((1 / totalProbability) * 100) / 100
      : Infinity;

  const averageCost =
    averageTries !== Infinity
      ? (averageTries * CUBE_COST[cubeType]).toLocaleString()
      : '∞';

  console.log('\n=== Final Results ===');
  console.log('Total probability:', totalProbability);
  console.log('Average tries needed:', averageTries.toFixed(2));
  console.log('Average cost:', averageCost);

  return averageTries;
}
