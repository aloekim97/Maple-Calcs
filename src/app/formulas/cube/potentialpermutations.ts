export interface Combination {
  lines: [string, string, string];
}
export default function potentialpermutations(
  goal: { cdr?: number; cd?: number; stat?: number },
  tier: 'low' | 'high'
): Combination[] {
  const lPrime = tier === 'low' ? [12, 9] : [13, 10];
  const uPrime = tier === 'low' ? [9, 6] : [10, 7];

  const getStatLine = (val: number, isL: boolean) => 
    `${val}% ${isL ? 'L' : 'U'}`;

  // Generate all valid stat sets (first line is L-tier, others can be L/U)
  function* generateStatSets(): Generator<{ value: number; isL: boolean }[]> {
    for (const first of lPrime) {
      // All possible second/third stats (including U-tier where applicable)
      const possibleStats = [
        ...lPrime.map(value => ({ value, isL: true })), // L-tier
        ...uPrime.map(value => ({ value, isL: false })), // U-tier
      ];

      for (const second of possibleStats) {
        for (const third of possibleStats) {
          const stats = [
            { value: first, isL: true },  // First is always L-tier
            second,
            third,
          ];

          // Skip if sum doesn't meet goal.stat (if specified)
          if (goal.stat && stats.reduce((sum, s) => sum + s.value, 0) < goal.stat) {
            continue;
          }

          yield stats;
        }
      }
    }
  }

  // Generate all unique orderings (while keeping first line L-tier)
  function* generate(): Generator<Combination> {
    const seen = new Set<string>();

    for (const stats of generateStatSets()) {
      // Create all valid permutations where FIRST stat stays L-tier
      const [first, ...rest] = stats;
      const restPermutations = getUniquePermutations(rest);

      for (const perm of restPermutations) {
        const lines = [
          getStatLine(first.value, first.isL), // First is always L
          getStatLine(perm[0].value, perm[0].isL),
          getStatLine(perm[1].value, perm[1].isL),
        ] as [string, string, string];

        const key = lines.join('|');
        if (!seen.has(key)) {
          seen.add(key);
          yield { lines };
        }
      }
    }
  }

  // Helper: Generate unique permutations of an array
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