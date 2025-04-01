const STAT_TIERS = {
  low: [24, 27, 30, 33],
  high: [30, 33, 36, 39],
};
const SINGLE_STAT = {
  low: [6, 9, 12],
  high: [7, 10, 13],
};
const DOUBLE_STAT = {
  low: [12, 15, 18, 21],
  high: [14, 17, 20, 23],
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

export const getGoalOptions = (itemType: string, itemLevel: number) => {
  const tier = itemLevel > 150 ? 'high' : 'low';
  const currentStatTier = STAT_TIERS[tier];
  const currentSingleStat = SINGLE_STAT[tier];
  const currentDoubleStat = DOUBLE_STAT[tier];

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

  // Handle regular items
  switch (itemType) {
    case 'hat':
      return {
        // Stat options
        ...Object.fromEntries(
          currentStatTier.map((stat) => [`${stat}% Stat`, { stat }])
        ),

        // Cooldown options
        ...Object.fromEntries(
          [2, 3, 4, 5, 6].map((cdr) => [`-${cdr} second cooldown`, { cdr }])
        ),

        // Combined CDR + Stat
        ...Object.fromEntries(
          [4].flatMap((cdr) =>
            currentSingleStat.map((stat) => [
              `-${cdr} second + ${stat}% Stat`,
              { cdr, stat },
            ])
          )
        ),

        // Double stat
        ...Object.fromEntries(
          currentDoubleStat.map((stat) => [`${stat}% Double Stat`, { stat }])
        ),
      };

    case 'glove':
      return {
        ...Object.fromEntries(
          currentStatTier.map((stat) => [`${stat}% Stat`, { stat }])
        ),
        '8% Crit Damage': { crit: 8 },
        '16% Crit Damage': { crit: 16 },
      };

    default:
      return Object.fromEntries(
        currentStatTier.map((stat) => [`${stat}% Stat`, { stat }])
      );
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
