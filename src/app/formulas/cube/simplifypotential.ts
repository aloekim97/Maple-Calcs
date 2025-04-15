interface PotentialStats {
  stat?: number;
  cd?: number;
  cdr?: number;
  att?: number;
  boss?: number;
  ied?: number;
  any?:number;
}

export default function aggregateLines(lines: {
  first?: string;
  second?: string;
  third?: string;
}): PotentialStats {
  const result: PotentialStats = {};
  let emptyCount = 0;

  for (const line of Object.values(lines)) {
    if (line === "") {
      emptyCount++;
      continue;
    }
    if (!line) continue;

    const parsed: PotentialStats = JSON.parse(line);

    (Object.keys(parsed) as Array<keyof PotentialStats>).forEach((key) => {
      const value = parsed[key];
      if (typeof value === 'number') {
        result[key] = (result[key] || 0) + value;
      }
    });
  }

  if (emptyCount > 0) {
    result.any = emptyCount;
  }

  return result;
}
