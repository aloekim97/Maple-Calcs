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
const SPECIAL_LINE = {
  cdr: { L: [8]},
  cd: { L: [1, 2], },
  boss: { L: [35, 40], U: [30] },
  ied: { L: [35, 40], U: [30] },
  dropmeso: { L: [20] },
}

export type WSEItemType = 'weapon' | 'secondary' | 'emblem';

export type WSETier = {
  weapon: {
    att: { prime: number[]; nonPrime: number[] };
    boss: { prime: number[]; nonPrime: number[] };
    ied: { prime: number[]; nonPrime: number[] };
  };
  secondary: {
    att: { prime: number[]; nonPrime: number[] };
    boss: { prime: number[]; nonPrime: number[] };
    ied: { prime: number[]; nonPrime: number[] };
  };
  emblem: {
    att: { prime: number[]; nonPrime: number[] };
    ied: { prime: number[]; nonPrime: number[] };
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
      att: {
        prime: [12],
        nonPrime: [9],
      },
      boss: {
        prime: [35, 40],
        nonPrime: [30],
      },
      ied: {
        prime: [35, 40],
        nonPrime: [30],
      },
    },
    secondary: {
      att: {
        prime: [12],
        nonPrime: [9],
      },
      boss: {
        prime: [35, 40],
        nonPrime: [30],
      },
      ied: {
        prime: [35, 40],
        nonPrime: [30],
      },
    },
    emblem: {
      att: {
        prime: [12],
        nonPrime: [9],
      },
      ied: {
        prime: [35, 40],
        nonPrime: [30],
      },
    },
  },
  high: {
    weapon: {
      att: {
        prime: [13],
        nonPrime: [10],
      },
      boss: {
        prime: [35, 40],
        nonPrime: [30],
      },
      ied: {
        prime: [35, 40],
        nonPrime: [30],
      },
    },
    secondary: {
      att: {
        prime: [13],
        nonPrime: [10],
      },
      boss: {
        prime: [35, 40],
        nonPrime: [30],
      },
      ied: {
        prime: [35, 40],
        nonPrime: [30],
      },
    },
    emblem: {
      att: {
        prime: [13],
        nonPrime: [10],
      },
      ied: {
        prime: [35, 40],
        nonPrime: [30],
      },
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
  const wseFirst = WSE[tier];
  const wseSecond = WSE[tier];

  switch (itemType) {
    case 'Weapon':
      const weaponTier = WSE[tier].weapon;
      if (lineNumber === 1) {
        return Object.fromEntries([
          ...weaponTier.att.prime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...weaponTier.boss.prime.map((stat) => [
            `${stat}% Boss`,
            { boss: stat },
          ]),
          ...weaponTier.ied.prime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
        ]);
      } else {
        return Object.fromEntries([
          ...weaponTier.att.prime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...weaponTier.att.nonPrime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...weaponTier.boss.prime.map((stat) => [
            `${stat}% Boss`,
            { boss: stat },
          ]),
          ...weaponTier.boss.nonPrime.map((stat) => [
            `${stat}% Boss`,
            { boss: stat },
          ]),
          ...weaponTier.ied.prime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
          ...weaponTier.ied.nonPrime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
        ]);
      }

    case 'Secondary':
      const secondaryTier = WSE[tier].secondary;
      if (lineNumber === 1) {
        return Object.fromEntries([
          ...secondaryTier.att.prime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...secondaryTier.boss.prime.map((stat) => [
            `${stat}% Boss`,
            { boss: stat },
          ]),
          ...secondaryTier.ied.prime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
        ]);
      } else {
        return Object.fromEntries([
          ...secondaryTier.att.prime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...secondaryTier.att.nonPrime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...secondaryTier.boss.prime.map((stat) => [
            `${stat}% Boss`,
            { boss: stat },
          ]),
          ...secondaryTier.boss.nonPrime.map((stat) => [
            `${stat}% Boss`,
            { boss: stat },
          ]),
          ...secondaryTier.ied.prime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
          ...secondaryTier.ied.nonPrime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
        ]);
      }

    case 'Emblem':
      const emblemTier = WSE[tier].emblem;
      if (lineNumber === 1) {
        return Object.fromEntries([
          ...emblemTier.att.prime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...emblemTier.ied.prime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
        ]);
      } else {
        return Object.fromEntries([
          ...emblemTier.att.prime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...emblemTier.att.nonPrime.map((stat) => [
            `${stat}% ATT`,
            { att: stat },
          ]),
          ...emblemTier.ied.prime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
          ...emblemTier.ied.nonPrime.map((stat) => [
            `${stat}% IED`,
            { ied: stat },
          ]),
        ]);
      }
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

