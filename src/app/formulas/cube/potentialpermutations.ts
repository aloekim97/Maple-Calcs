import aggregateLines from './simplifypotential';

export interface Combination {
  lines: [string, string, string];
}

type PotentialStat =
  | 'stat'
  | 'cdr'
  | 'cd'
  | 'boss'
  | 'ied'
  | 'att'
  | 'drop'
  | 'meso'
  | 'any';

type Tier = 'low' | 'high';

interface SpecialLineValues {
  L: number[];
  U: number[];
}

interface AttSpecialLineValues {
  low: SpecialLineValues;
  high: SpecialLineValues;
}

type SpecialLineConfig = SpecialLineValues | AttSpecialLineValues;

const SPECIAL_LINE: Record<
  Exclude<PotentialStat, 'stat'>,
  SpecialLineConfig
> = {
  cdr: { L: [1, 2], U: [] },
  cd: { L: [8], U: [] },
  boss: { L: [35, 40], U: [30] },
  ied: { L: [35, 40], U: [30] },
  drop: { L: [20], U: [] },
  meso: { L: [20], U: [] },
  att: {
    low: { L: [12], U: [9] },
    high: { L: [13], U: [10] },
  },
  any: { L: [1], U: [1] },
};

const STAT_VALUES: Record<Tier, { L: number[]; U: number[] }> = {
  low: { L: [12, 9], U: [9, 6] },
  high: { L: [13, 10], U: [10, 7] },
};

interface StatSums {
  stat: number;
  cdr: number;
  cd: number;
  boss: number;
  ied: number;
  att: number;
  drop: number;
  meso: number;
  any: number;
}

function normalizeStatSums(partialSums: Partial<StatSums>): StatSums {
  return {
    stat: 0,
    cdr: 0,
    cd: 0,
    boss: 0,
    ied: 0,
    att: 0,
    drop: 0,
    meso: 0,
    any: 0,
    ...partialSums,
  };
}

function getLineValue(line: string): {
  stat: PotentialStat;
  value: number;
  formatted: string;
} {
  const statMatch =
    line.match(/(\d+)% (\w+)(?: (L|U))?/) ||
    line.match(/\+(\d+) (stat|\w+)/) ||
    line.match(/(\d+) (L|U) (\w+)/);

  if (!statMatch) return { stat: 'any', value: 0, formatted: '1 L any' };

  let value, stat, tier;

  if (line.includes('%')) {
    value = parseInt(statMatch[1]);
    stat = statMatch[2] === 'stat' ? 'stat' : (statMatch[2] as PotentialStat);
    tier = statMatch[3] || 'L';
  } else if (line.includes('L') || line.includes('U')) {
    value = parseInt(statMatch[1]);
    tier = statMatch[2];
    stat = statMatch[3] === 'stat' ? 'stat' : (statMatch[3] as PotentialStat);
  } else {
    value = parseInt(statMatch[1]);
    stat = statMatch[2] === 'stat' ? 'stat' : (statMatch[2] as PotentialStat);
    tier = 'L';
  }

  const formatted = `${value} ${tier} ${stat}`;
  return { stat, value, formatted };
}

function getSpecialLineValues(
  stat: PotentialStat,
  tier: Tier
): SpecialLineValues {
  if (stat === 'att') {
    const attValues = SPECIAL_LINE[stat] as AttSpecialLineValues;
    return attValues[tier];
  }
  return SPECIAL_LINE[stat] as SpecialLineValues;
}

function findSumPermutations(targetSums: StatSums, tier: Tier): Combination[] {
  const combinations: Combination[] = [];
  const requestedStats = Object.entries(targetSums)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, sum]) => sum > 0)
    .map(([stat]) => stat as PotentialStat);

  function getPossibleLines(stat: PotentialStat, position: number): string[] {
    const lines: string[] = [];

    if (stat === 'any') {
      lines.push('1L any');
      return lines;
    }

    if (stat === 'stat') {
      if (position === 0) {
        STAT_VALUES[tier].L.forEach((v) => lines.push(`${v} L stat`));
      } else {
        STAT_VALUES[tier].L.forEach((v) => lines.push(`${v} L stat`));
        STAT_VALUES[tier].U.forEach((v) => lines.push(`${v} U stat`));
      }
    } else {
      const specialValues = getSpecialLineValues(stat, tier);
      if (position === 0) {
        specialValues.L.forEach((v) => lines.push(`${v} L ${stat}`));
      } else {
        specialValues.L.forEach((v) => lines.push(`${v} L ${stat}`));
        if (specialValues.U.length > 0) {
          specialValues.U.forEach((v) => lines.push(`${v} U ${stat}`));
        }
      }
    }
    return lines;
  }

  function isValidCombination(lines: string[]): boolean {
    const sums: StatSums = normalizeStatSums({});

    lines.forEach((line) => {
      const { stat, value } = getLineValue(line);
      sums[stat] += value;
    });

    return requestedStats.every((stat) => {
      if (stat === 'any') {
        const anyCount = lines.filter((line) => line.includes(' any')).length;
        return anyCount >= targetSums.any;
      }
      return sums[stat] >= targetSums[stat];
    });
  }

  function generateOrderedCombinations() {
    const pos0Lines: string[] = [];
    const pos1Lines: string[] = [];
    const pos2Lines: string[] = [];

    for (const stat of requestedStats) {
      pos0Lines.push(...getPossibleLines(stat, 0));
      pos1Lines.push(...getPossibleLines(stat, 1));
      pos2Lines.push(...getPossibleLines(stat, 2));
    }

    for (const line0 of pos0Lines) {
      for (const line1 of pos1Lines) {
        for (const line2 of pos2Lines) {
          const combination = [line0, line1, line2];
          if (isValidCombination(combination)) {
            const formattedCombination = combination.map((line) => {
              const { formatted } = getLineValue(line);
              return formatted;
            }) as [string, string, string];

            combinations.push({
              lines: formattedCombination,
            });
          }
        }
      }
    }
  }

  generateOrderedCombinations();

  return combinations;
}

export default function potentialPermutations(
  lines: { first: string; second: string; third: string },
  tier: Tier
): Combination[] {
  const lineComp = aggregateLines(lines);
  const normalizedSums = normalizeStatSums(lineComp);
  return findSumPermutations(normalizedSums, tier);
}
