export interface Combination {
  lines: [string, string, string];
  probabilities: [string, string, string];
}

type PotentialStat =
  | 'stat'
  | 'cdr'
  | 'cd'
  | 'boss'
  | 'ied'
  | 'att'
  | 'dropmeso'
  | 'any';
type Goal = Partial<Record<PotentialStat, number>>;
type Tier = 'low' | 'high';

interface StatValue {
  value: number;
  isL: boolean;
  statType: Exclude<PotentialStat, 'any'>;
}

interface SpecialLineValues {
  L: number[];
  U: number[];
}

const SPECIAL_LINE: Record<
  Exclude<PotentialStat, 'stat' | 'any'>,
  SpecialLineValues
> = {
  cdr: { L: [1, 2], U: [] },
  cd: { L: [8], U: [] },
  boss: { L: [35, 40], U: [30] },
  ied: { L: [35, 40], U: [30] },
  dropmeso: { L: [20], U: [] },
  att: { L: [12, 13], U: [9, 10] },
};

const STAT_VALUES: Record<Tier, { L: number[]; U: number[] }> = {
  low: { L: [12, 9], U: [9, 6] },
  high: { L: [13, 10], U: [10, 7] },
};

interface LineInfo {
  text: string;
  probKey: string;
}

export default function potentialPermutations(
  goal: Goal,
  tier: Tier = 'high'
): Combination[] {
  const combinations: Combination[] = [];

  // Generate required lines based on goal
  const requiredLines: StatValue[] = [];

  // Handle CD requirement (only L lines exist)
  if (goal.cd) {
    requiredLines.push({ statType: 'cd', value: 8, isL: true });
  }

  // Handle STAT requirement
  if (goal.stat) {
    const goalStat = goal.stat;
    const { L: lValues, U: uValues } = STAT_VALUES[tier];

    lValues
      .filter((v) => v >= goalStat)
      .forEach((v) =>
        requiredLines.push({ statType: 'stat', value: v, isL: true })
      );
    uValues
      .filter((v) => v >= goalStat)
      .forEach((v) =>
        requiredLines.push({ statType: 'stat', value: v, isL: false })
      );
  }

  // Handle other stat requirements
  (Object.keys(goal) as PotentialStat[]).forEach((statType) => {
    if (statType === 'cd' || statType === 'stat' || statType === 'any') return;

    const goalValue = goal[statType]!;
    const values =
      SPECIAL_LINE[statType as Exclude<PotentialStat, 'stat' | 'any' | 'cd'>];

    values.L.filter((v) => v >= goalValue).forEach((v) =>
      requiredLines.push({
        statType: statType as Exclude<PotentialStat, 'any'>,
        value: v,
        isL: true,
      })
    );
    values.U.filter((v) => v >= goalValue).forEach((v) =>
      requiredLines.push({
        statType: statType as Exclude<PotentialStat, 'any'>,
        value: v,
        isL: false,
      })
    );
  });

  const anyLinesNeeded = goal.any || 0;

  // Generate all possible line combinations
  if (requiredLines.length > 0) {
    // Get all combinations of required lines (up to 3)
    const lineCombinations = getLineCombinations(
      requiredLines,
      Math.min(requiredLines.length, 3)
    );

    for (const lineCombo of lineCombinations) {
      // Get all position permutations for these lines, ensuring U-lines aren't in first position
      const positionPermutations = getValidPositionPermutations(lineCombo);

      for (const positions of positionPermutations) {
        const lines: (string | null)[] = [null, null, null];
        const probs: (string | null)[] = [null, null, null];

        // Place the required lines
        for (let i = 0; i < lineCombo.length; i++) {
          const line = lineCombo[i];
          const pos = positions[i];
          const lineInfo = getLineInfo(line, tier);
          lines[pos] = lineInfo.text;
          probs[pos] = lineInfo.probKey;
        }

        // Fill remaining slots with ANY lines
        for (let i = 0; i < 3; i++) {
          if (lines[i] === null) {
            lines[i] = i === 0 ? '1% ANY L' : '1% ANY L/U';
            probs[i] = '';
          }
        }

        combinations.push({
          lines: lines as [string, string, string],
          probabilities: probs as [string, string, string],
        });
      }
    }
  } else if (anyLinesNeeded > 0) {
    // Only ANY lines case
    const lines: [string, string, string] = [
      '1% ANY L',
      '1% ANY L/U',
      '1% ANY L/U',
    ];
    combinations.push({
      lines,
      probabilities: ['', '', ''],
    });
  } else {
    // Default case with no specific requirements
    combinations.push({
      lines: ['1% ANY L', '1% ANY L/U', '1% ANY L/U'],
      probabilities: ['', '', ''],
    });
  }

  return filterValidCombinations(combinations, goal);
}

// Helper function to get valid permutations where U-lines aren't in first position
function getValidPositionPermutations(lines: StatValue[]): number[][] {
  const positions = [0, 1, 2];
  const permutations = getPermutations(positions, lines.length);

  return permutations.filter((perm) => {
    // Check if any U-line is in first position (0)
    for (let i = 0; i < lines.length; i++) {
      if (perm[i] === 0 && !lines[i].isL) {
        return false;
      }
    }
    return true;
  });
}

// Helper functions
function getLineInfo(line: StatValue, tier: Tier): LineInfo {
  const { statType, value, isL } = line;
  let displayValue = value;

  // Special handling for stat values to show the correct display value
  if (statType === 'stat') {
    const tierValues = STAT_VALUES[tier];
    const validValues = isL ? tierValues.L : tierValues.U;
    displayValue = validValues.includes(value)
      ? value
      : Math.max(...validValues);
  }

  const statText = formatStatText(statType, displayValue, isL);
  const probKey = getProbabilityKey(statType, displayValue);

  return { text: statText, probKey };
}

function formatStatText(
  statType: Exclude<PotentialStat, 'any'>,
  value: number,
  isL: boolean
): string {
  switch (statType) {
    case 'stat':
      return `${value}% ${isL ? 'L' : 'U'}`;
    case 'att':
      return `${value}% ATT`;
    case 'boss':
    case 'ied':
      return `${value}% ${statType.toUpperCase()} ${isL ? 'L' : 'U'}`;
    default:
      return `${value}% ${statType.toUpperCase()}`;
  }
}

function getProbabilityKey(
  statType: Exclude<PotentialStat, 'any'>,
  value: number
): string {
  switch (statType) {
    case 'cd':
      return `cd${value}`;
    case 'cdr':
      return `cdr${value}`;
    case 'dropmeso':
      return `drop${value}`;
    case 'boss':
      return `boss${value}`;
    case 'ied':
      return `ied${value}`;
    case 'att':
      return `att${value}`;
    case 'stat':
      return `stat${value}`;
    default:
      return '';
  }
}

function getAnyLineText(
  position: number,
  anyLinesNeeded: number,
  tier: Tier
): string {
  if (position === 0) return '1% ANY L';
  return anyLinesNeeded > position - 1
    ? '1% ANY L/U'
    : tier === 'high'
    ? '1% ANY L'
    : '1% ANY U';
}

function getLineCombinations<T>(items: T[], maxLength: number): T[][] {
  const result: T[][] = [];

  function backtrack(start: number, current: T[]) {
    if (current.length > 0 && current.length <= maxLength) {
      result.push([...current]);
    }

    if (current.length === maxLength) return;

    for (let i = start; i < items.length; i++) {
      current.push(items[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

function getPermutations<T>(items: T[], length: number): T[][] {
  if (length === 0) return [[]];
  const result: T[][] = [];

  for (let i = 0; i < items.length; i++) {
    const remaining = [...items.slice(0, i), ...items.slice(i + 1)];
    for (const perm of getPermutations(remaining, length - 1)) {
      result.push([items[i], ...perm]);
    }
  }

  return result;
}

function filterValidCombinations(
  combinations: Combination[],
  goal: Goal
): Combination[] {
  if (!goal) return combinations;

  return combinations.filter((combo) => {
    // Check CD requirement
    if (goal.cd && !combo.lines.some((l) => l.includes('CD'))) return false;

    // Check STAT requirement
    if (goal.stat) {
      const statLines = combo.lines.filter(
        (l) => l.includes('% L') || l.includes('% U')
      );
      if (
        !statLines.some((l) => {
          const value = parseInt(l.match(/\d+/)![0]);
          return value >= goal.stat!;
        })
      )
        return false;
    }

    // Check ANY requirement
    if (goal.any) {
      const anyCount = combo.lines.filter((l) => l.includes('ANY')).length;
      if (anyCount < goal.any) return false;
    }

    // Check other stat requirements
    for (const statType in goal) {
      if (statType === 'cd' || statType === 'stat' || statType === 'any')
        continue;

      const requiredValue =
        goal[statType as Exclude<PotentialStat, 'cd' | 'stat' | 'any'>]!;
      const statLines = combo.lines.filter((l) =>
        l.includes(statType.toUpperCase())
      );

      if (
        !statLines.some((l) => {
          const value = parseInt(l.match(/\d+/)![0]);
          return value >= requiredValue;
        })
      )
        return false;
    }

    return true;
  });
}
