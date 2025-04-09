export interface Combination {
  lines: [string, string, string];
  probabilities: [string, string, string]; // New field for probability keys
}

type PotentialStat =
  | 'stat'
  | 'cdr'
  | 'cd'
  | 'boss'
  | 'ied'
  | 'att'
  | 'dropmeso';
type Goal = Partial<Record<PotentialStat, number>>;
type Tier = 'low' | 'high';

interface StatValue {
  value: number;
  isL: boolean;
  statType: PotentialStat;
}

const SPECIAL_LINE = {
  cdr: { L: [1, 2] },
  cd: { L: [8] },
  boss: { L: [35, 40], U: [30] },
  ied: { L: [35, 40], U: [30] },
  dropmeso: { L: [20] },
};

export default function potentialPermutations(
  goal: Goal,
  tier: Tier
): Combination[] {
  // Define stat values based on tier
  const statValues = {
    L: tier === 'low' ? [12, 9] : [13, 10],
    U: tier === 'low' ? [9, 6] : [10, 7],
  };

  // Attack uses fixed values: L:[13], U:[10] regardless of tier
  const attackValues = {
    L: tier === 'low' ? [12] : [13],
    U: tier === 'low' ? [9] : [10],
  };

  const getValuesForStat = (
    statType: PotentialStat,
    isL: boolean
  ): number[] => {
    // Handle attack separately with fixed values
    if (statType === 'att') {
      return isL ? attackValues.L : attackValues.U;
    }

    // Handle stat - can be U or L tier
    if (statType === 'stat') {
      return isL
        ? tier === 'low'
          ? [12, 9]
          : [13, 10]
        : tier === 'low'
        ? [9, 6]
        : [10, 7];
    }

    // Handle special lines according to SPECIAL_LINE definitions
    const specialStat = SPECIAL_LINE[statType as keyof typeof SPECIAL_LINE];
    if (isL) {
      return specialStat.L || [];
    }
    return 'U' in specialStat ? specialStat.U : [];
  };

  const getStatLine = (val: number, isL: boolean, statType: PotentialStat) => {
    // For attack, don't show tier
    if (statType === 'att') {
      return `${val}% ATT`;
    }

    // For stat, always show tier (L/U)
    if (statType === 'stat') {
      return `${val}% ${isL ? 'L' : 'U'}`;
    }

    // For special lines, only show tier if it's variable (exists in both L and U)
    const specialStat = SPECIAL_LINE[statType as keyof typeof SPECIAL_LINE];
    const hasBothTiers = 'U' in specialStat && specialStat.L.length > 0;

    return hasBothTiers
      ? `${val}% ${statType.toUpperCase()} ${isL ? 'L' : 'U'}`
      : `${val}% ${statType.toUpperCase()}`;
  };

  const getProbabilityKey = (statType: PotentialStat, value: number, isL: boolean): string => {
    if (statType === 'att') {
      return isL ? `att${value}` : `att${value}`;
    }
    if (statType === 'boss' || statType === 'ied') {
      // For boss/ied, we still use the value (30/35/40)
      return `${statType}${value}`;
    }
    // For other stats, we might not have probabilities
    return '';
  };

  // Generate all valid stat sets (first line is L-tier, others can be L/U)
  function* generateStatSets(): Generator<StatValue[]> {
    const goalStats = Object.keys(goal) as PotentialStat[];

    // Generate combinations where first line is each required stat type
    for (const firstStatType of goalStats) {
      const firstValues = getValuesForStat(firstStatType, true); // First line must be L-tier

      for (const firstValue of firstValues) {
        const otherStats = goalStats.filter((s) => s !== firstStatType);

        // Case 1: All three lines are the same stat type
        if (otherStats.length === 0) {
          const possibleLines = [
            ...getValuesForStat(firstStatType, true).map((value) => ({
              value,
              isL: true,
              statType: firstStatType,
            })),
            ...getValuesForStat(firstStatType, false).map((value) => ({
              value,
              isL: false,
              statType: firstStatType,
            })),
          ];

          for (const second of possibleLines) {
            for (const third of possibleLines) {
              const stats = [
                { value: firstValue, isL: true, statType: firstStatType },
                second,
                third,
              ];

              if (meetsGoalRequirements(stats, goal)) {
                yield stats;
              }
            }
          }
        }
        // Case 2: Mixed stat types
        else {
          // Generate all combinations of other required stats
          for (const secondStatType of otherStats) {
            const secondValues = [
              ...getValuesForStat(secondStatType, true).map((value) => ({
                value,
                isL: true,
                statType: secondStatType,
              })),
              ...getValuesForStat(secondStatType, false).map((value) => ({
                value,
                isL: false,
                statType: secondStatType,
              })),
            ];

            for (const thirdStatType of otherStats) {
              const thirdValues = [
                ...getValuesForStat(thirdStatType, true).map((value) => ({
                  value,
                  isL: true,
                  statType: thirdStatType,
                })),
                ...getValuesForStat(thirdStatType, false).map((value) => ({
                  value,
                  isL: false,
                  statType: thirdStatType,
                })),
              ];

              for (const second of secondValues) {
                for (const third of thirdValues) {
                  const stats = [
                    { value: firstValue, isL: true, statType: firstStatType },
                    second,
                    third,
                  ];

                  if (meetsGoalRequirements(stats, goal)) {
                    yield stats;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  // Check if a stat set meets all goal requirements
  function meetsGoalRequirements(stats: StatValue[], goal: Goal): boolean {
    const statTotals: Partial<Record<PotentialStat, number>> = {};

    for (const stat of stats) {
      statTotals[stat.statType] = (statTotals[stat.statType] || 0) + stat.value;
    }

    for (const [statType, requiredValue] of Object.entries(goal)) {
      const total = statTotals[statType as PotentialStat] || 0;
      if (total < requiredValue) {
        return false;
      }
    }

    return true;
  }

  // Generate all unique orderings
  function* generate(): Generator<Combination> {
    const seen = new Set<string>();

    for (const stats of generateStatSets()) {
      const [first, ...rest] = stats;
      const restPermutations = getUniquePermutations(rest);

      for (const perm of restPermutations) {
        const lines = [
          getStatLine(first.value, first.isL, first.statType),
          getStatLine(perm[0].value, perm[0].isL, perm[0].statType),
          getStatLine(perm[1].value, perm[1].isL, perm[1].statType),
        ] as [string, string, string];

        const probabilityKeys = [
          getProbabilityKey(first.statType, first.value, first.isL),
          getProbabilityKey(perm[0].statType, perm[0].value, perm[0].isL),
          getProbabilityKey(perm[1].statType, perm[1].value, perm[1].isL),
        ] as [string, string, string];

        const key = lines.join('|');
        if (!seen.has(key)) {
          seen.add(key);
          yield { lines, probabilities: probabilityKeys };
        }
      }
    }
  }

  // Helper: Generate unique permutations
  function getUniquePermutations<T>(arr: T[]): T[][] {
    if (arr.length === 0) return [];
    const permutations: T[][] = [];
    const used = new Set<number>();

    for (let i = 0; i < arr.length; i++) {
      if (used.has(i)) continue;
      used.add(i);

      const rest = arr.filter((_, j) => j !== i);
      for (const perm of getUniquePermutations(rest)) {
        permutations.push([arr[i], ...perm]);
      }
    }

    return permutations.length ? permutations : [arr];
  }

  return Array.from(generate());
}
