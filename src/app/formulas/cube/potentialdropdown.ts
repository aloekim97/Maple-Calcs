const STAT_TIERS = {
  low: [24, 27, 30, 33],
  high: [30, 33, 36, 39],
};
const FIRST_LINE = {
  low: [12, 9],
  high: [13, 10],
};
const OTHER_LINE = {
  low: [12, 9, 6],
  high: [13, 10, 7],
};

export type WSEItemType = 'weapon' | 'secondary' | 'emblem';

export type WSETier = {
  weapon: {
    att: number[];
    boss: number[];
    ied: number[];
  };
  secondary: {
    att: number[];
    boss: number[];
    ied: number[];
  };
  emblem: {
    att: number[];
    ied: number[];
  };
};

export type WSEPotential = {
  att: number;
  boss?: number;
  ied?: number;
};

export const WSE: { low: WSETier; high: WSETier } = {
  low: {
    weapon: {
      att: [9, 18, 21, 30, 33, 36],
      boss: [30, 35, 40],
      ied: [30, 35, 40],
    },
    secondary: {
      att: [30, 35, 40],
      boss: [30, 35, 40],
      ied: [30, 35, 40],
    },
    emblem: {
      att: [30, 35, 40],
      ied: [30, 35, 40],
    },
  },
  high: {
    weapon: {
      att: [10, 20, 23, 33, 36, 39],
      boss: [30, 35, 40],
      ied: [30, 35, 40],
    },
    secondary: {
      att: [30, 35, 40],
      boss: [30, 35, 40],
      ied: [30, 35, 40],
    },
    emblem: {
      att: [30, 35, 40],
      ied: [30, 35, 40],
    },
  },
};

export const getGoalOptions = (
  itemType: string,
  itemLevel: number,
  lineNumber: number = 1
) => {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const currentStatTier = STAT_TIERS[tier];
  const firstLine = FIRST_LINE[tier];
  const otherLines = OTHER_LINE[tier];

  // Handle WSE items (weapon, secondary, emblem)
  if (['weapon', 'secondary', 'emblem'].includes(itemType)) {
    const combinations = generateWSECombinations(
      itemType as 'weapon' | 'secondary' | 'emblem',
      itemLevel
    );
    return Object.fromEntries(
      combinations.map((combo) => {
        const label = formatWSEOption(combo);
        return [label, combo];
      })
    );
  }

  switch (itemType) {
    case 'Hat': {
      const hatStatOptions =
        lineNumber === 1
          ? firstLine.map((stat) => [`${stat}% Stat`, { stat }])
          : otherLines.map((stat) => [`${stat}% Stat`, { stat }]);

      const hatCdrOptions = [1, 2].map((cdr) => [
        `-${cdr} second cooldown`,
        { cdr },
      ]);

      return {
        ...Object.fromEntries(hatCdrOptions),
        ...Object.fromEntries(hatStatOptions),
      };
    }

    case 'Gloves': {
      const gloveStatOptions =
        lineNumber === 1
          ? firstLine.map((stat) => [`${stat}% Stat`, { stat }])
          : otherLines.map((stat) => [`${stat}% Stat`, { stat }]);

      const gloveCdOptions = [['8% Crit Damage', { cd: 8 }]];

      return {
        ...Object.fromEntries(gloveCdOptions),
        ...Object.fromEntries(gloveStatOptions),
      };
    }

    default: {
      const statValues = lineNumber === 1 ? firstLine : otherLines;
      return Object.fromEntries(
        statValues.map((stat) => [`${stat}% Stat`, { stat }])
      );
    }
  }
};

// Helper functions for WSE
const generateWSECombinations = (
  itemType: keyof WSETier,
  itemLevel: number
): WSEPotential[] => {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const itemData = WSE[tier][itemType];
  const combinations: WSEPotential[] = [];

  itemData.att.forEach((attValue) => {
    // Base combination
    combinations.push({ att: attValue });
    if (attValue >= 30) return;

    // Handle boss if exists
    if ('boss' in itemData) {
      itemData.boss.forEach((bossValue) => {
        combinations.push({ att: attValue, boss: bossValue });
      });
    }

    // Handle ied if exists
    if ('ied' in itemData) {
      itemData.ied.forEach((iedValue) => {
        combinations.push({ att: attValue, ied: iedValue });
      });
    }

    // Handle combined boss+ied if both exist
    if (
      'boss' in itemData &&
      'ied' in itemData &&
      (attValue === 9 || attValue === 10)
    ) {
      itemData.boss.forEach((bossValue) => {
        itemData.ied.forEach((iedValue) => {
          combinations.push({ att: attValue, boss: bossValue, ied: iedValue });
        });
      });
    }
  });

  return combinations;
};
const formatWSEOption = (combo: WSEPotential): string => {
  const parts = [`${combo.att} ATT`];
  if (combo.boss) parts.push(`${combo.boss} Boss`);
  if (combo.ied) parts.push(`${combo.ied} IED`);
  return parts.join(' + ');
};
