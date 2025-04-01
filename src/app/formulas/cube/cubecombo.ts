interface Combination {
  lines: [string, string, string];
  stats: {
    totalStat: number;
    totalCD?: number;
    totalCDR?: number;
  };
}

export default function cubeCombo(
  goal: { cdr?: number; cd?: number; stat?: number },
  tier: 'low' | 'high'
): Combination[] {
  const lPrime = tier === 'low' ? [12, 9] : [13, 10];
  const uPrime = tier === 'low' ? [9, 6] : [10, 7];
  const statValues = [...new Set([...lPrime, ...uPrime])];
  const { cd, cdr, stat } = goal;
  const results: Combination[] = [];

  // Line templates
  const cdLine = '8% CD';
  const cdrLine = '-2s CDR';
  const getStatLine = (val: number) => {
    return lPrime.includes(val) ? `${val}% L` : `${val}% U`;
  };

  // Helper to create properly typed combinations
  const createCombo = (
    line1: string,
    line2: string,
    line3: string,
    stats: Omit<Combination['stats'], 'lines'>
  ): Combination => ({
    lines: [line1, line2, line3],
    stats,
  });

  // Generate all position permutations
  function* generate() {
     // CDR cases
  if (cdr) {
    const cdrCount = cdr / 2;
    const statCount = 3 - cdrCount;

    // Case 1: Line 1 is CDR
    if (cdrCount > 0) {
      const positions = getPositions([1, 2], cdrCount - 1);
      for (const statCombo of getValidStatCombos(statCount, true)) {
        for (const pos of positions) {
          const lines = [cdrLine, '', ''];
          pos.forEach(p => lines[p + 1] = cdrLine);
          fillRemainingLines(lines, statCombo);
          yield createCombo(
            lines[0],
            lines[1],
            lines[2],
            { totalStat: sumStats(statCombo), totalCDR: cdr }
          );
        }
      }
    }

    // Case 2: Line 1 is LPrime stat
    for (const lPrimeVal of lPrime) {
      const positions = getPositions([1, 2], cdrCount);
      for (const statCombo of getValidStatCombos(statCount - 1, false)) {
        const totalStat = lPrimeVal + sumStats(statCombo);
        if (stat && totalStat < stat) continue;

        for (const pos of positions) {
          const lines = [getStatLine(lPrimeVal), '', ''];
          pos.forEach(p => lines[p + 1] = cdrLine);
          fillRemainingLines(lines, statCombo);
          yield createCombo(
            lines[0],
            lines[1],
            lines[2],
            { totalStat, totalCDR: cdr }
          );
        }
      }
    }
    return;
  }

    // CD cases
    if (cd) {
      const cdCount = cd / 8;

      // Case 1: Line 1 is CD
      if (cdCount > 0) {
        const positions = getPositions([1, 2], cdCount - 1);
        for (const statCombo of getValidStatCombos(3 - cdCount, true)) {
          for (const pos of positions) {
            const lines = [cdLine, '', ''];
            pos.forEach((p) => (lines[p + 1] = cdLine));
            fillRemainingLines(lines, statCombo);
            yield createCombo(...lines, {
              totalStat: sumStats(statCombo),
              totalCD: cd,
            });
          }
        }
      }

      // Case 2: Line 1 is LPrime stat
      for (const lPrimeVal of lPrime) {
        const positions = getPositions([1, 2], cdCount);
        for (const statCombo of getValidStatCombos(2 - cdCount, false)) {
          const totalStat = lPrimeVal + sumStats(statCombo);
          if (stat && totalStat < stat) continue;

          for (const pos of positions) {
            const lines = [getStatLine(lPrimeVal), '', ''];
            pos.forEach((p) => (lines[p + 1] = cdLine));
            fillRemainingLines(lines, statCombo);
            yield createCombo(...lines, { totalStat, totalCD: cd });
          }
        }
      }
      return;
    }

    // Stat-only case (Line 1 must be LPrime)
    for (const lPrimeVal of lPrime) {
      for (const [stat2, stat3] of getCombinationsWithReplacement(
        statValues,
        2
      )) {
        const totalStat = lPrimeVal + stat2 + stat3;
        if (stat && totalStat < stat) continue;
        yield createCombo(
          getStatLine(lPrimeVal),
          getStatLine(stat2),
          getStatLine(stat3),
          { totalStat }
        );
      }
    }
  }

  // Helper functions
  function getPositions(
    availablePositions: number[],
    count: number
  ): number[][] {
    if (count === 0) return [[]];
    return availablePositions.flatMap((pos, i) =>
      getPositions(availablePositions.slice(i + 1), count - 1).map((rest) => [
        pos,
        ...rest,
      ])
    );
  }

  function* getValidStatCombos(
    count: number,
    allowUPrime: boolean
  ): Generator<number[]> {
    const validStats = allowUPrime ? statValues : lPrime;
    if (count <= 0) yield [];
    else yield* getCombinationsWithReplacement(validStats, count);
  }

  function fillRemainingLines(lines: string[], stats: number[]) {
    let statIdx = 0;
    for (let i = 0; i < 3; i++) {
      if (lines[i] === '') lines[i] = getStatLine(stats[statIdx++]);
    }
  }

  function sumStats(stats: number[]): number {
    return stats.reduce((a, b) => a + b, 0);
  }

  function* getCombinationsWithReplacement(
    values: number[],
    length: number
  ): Generator<number[]> {
    if (length === 1) {
      for (const v of values) yield [v];
    } else {
      for (const v of values) {
        for (const rest of getCombinationsWithReplacement(values, length - 1)) {
          yield [v, ...rest];
        }
      }
    }
  }

  // Execute generation
  for (const combo of generate()) {
    results.push(combo);
  }

  return results;
}
