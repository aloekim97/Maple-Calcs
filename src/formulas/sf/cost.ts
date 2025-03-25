export function getCost(star: number, equip: number): string {
  let totalCost = 0;
  let adjustLvl = Math.floor(equip / 10) * 10;
  let inner = 0;

  if (star < 10) {
    inner = (adjustLvl ** 3 * (star + 1)) / 2500 + 10;
  } else if (star === 10) {
    inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 40000 + 10;
  } else if (star === 11) {
    inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 22000 + 10;
  } else if (star === 12) {
    inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 15000 + 10;
  } else if (star === 13) {
    inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 11000 + 10;
  } else if (star === 14) {
    inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 7500 + 10;
  } else if (star >= 15) {
    inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 20000 + 10;
  }

  totalCost = Math.round(totalCost / 100) * 100;

  return totalCost.toLocaleString();
}

export function getNewCost(star: number, equip: number): string {
  const adjustLvl = Math.floor(equip / 10) * 10;

  const starLookup: {
    [key: number]: { denominator?: number; multiplier?: number };
  } = {
    15: { denominator: 20000 },
    16: { denominator: 20000 },
    17: { multiplier: 1.31766055 }, 
    18: { multiplier: 2.8571348 },
    19: { multiplier: 4.44443047 }, 
    20: { denominator: 20000 },
    21: { multiplier: 1.59999951 }, 
    22: { denominator: 20000 },
    23: { denominator: 20000 },
    24: { denominator: 20000 },
    25: { denominator: 20000 },
    26: { denominator: 20000 },
    27: { denominator: 20000 },
    28: { denominator: 20000 },
    29: { denominator: 20000 },
  };

  const { denominator, multiplier } = starLookup[star] || {
    denominator: getDefaultDenominator(star),
  };

  let inner =
    (adjustLvl ** 3 * (star + 1) ** 2.7) / (denominator || 20000) + 10;

  if (multiplier) {
    inner *= multiplier;
  }

  const totalCost = Math.round((100 * inner) / 100) * 100;
  return totalCost.toLocaleString();
}

function getDefaultDenominator(star: number): number {
  if (star < 10) return 2500;
  switch (star) {
    case 10:
      return 40000;
    case 11:
      return 22000;
    case 12:
      return 15000;
    case 13:
      return 11000;
    case 14:
      return 7500;
    default:
      return 20000;
  }
}
