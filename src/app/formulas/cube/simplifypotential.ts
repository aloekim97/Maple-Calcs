export interface PotentialStats {
  stat?: number;
  cd?: number;
  cdr?: number;
  att?: number;
  boss?: number;
  ied?: number;
  any?: number;
  drop?: number;
  meso?: number;
}

export default function aggregateLines(lines: {
  first?: string;
  second?: string;
  third?: string;
}): PotentialStats {
  const result: PotentialStats = {};
  let emptyCount = 0;

  for (const line of Object.values(lines)) {
    if (!line || line.trim() === "") {
      emptyCount++;
      continue;
    }

    let parsed: PotentialStats = {};

    try {
      // Attempt to parse JSON string input
      parsed = JSON.parse(line);
    } catch {
      const match = line.match(/(\d+)%?\s*(stat|cd|cdr|att|boss|ied)/i);
      if (match) {
        const value = parseInt(match[1]);
        const key = match[2].toLowerCase() as keyof PotentialStats;
        parsed[key] = value;
      }
    }

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
