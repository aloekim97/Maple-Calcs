
// export function getCost(star: number, equip: number): string {
//   let totalCost = 0;
//   let adjustLvl = Math.floor(equip / 10) * 10;
//   let inner = 0;

//   if (star < 10) {
//     inner = (adjustLvl ** 3 * (star + 1)) / 2500 + 10;
//   } else if (star === 10) {
//     inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 40000 + 10;
//   } else if (star === 11) {
//     inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 22000 + 10;
//   } else if (star === 12) {
//     inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 15000 + 10;
//   } else if (star === 13) {
//     inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 11000 + 10;
//   } else if (star === 14) {
//     inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 7500 + 10;
//   } else if (star >= 15) {
//     inner = (adjustLvl ** 3 * (star + 1) ** 2.7) / 20000 + 10;
//   }

//   totalCost = Math.round(totalCost / 100) * 100;

//   return totalCost.toLocaleString();
// }

export function getNewCost(
  star: number,
  equip: number,
  safeguard: boolean,
  discount30: boolean,
  mvpDiscount: string,
): string {
  const adjustLvl = Math.round(equip / 10) * 10;
  let cost: number;

  // Calculate base cost
  if (star < 10) {
    cost = (adjustLvl ** 3 * (star + 1)) / 2500 + 10;
  } else if (star === 10) {
    cost = (adjustLvl ** 3 * (star + 1) ** 2.7) / 40000 + 10;
  } else if (star === 11) {
    cost = (adjustLvl ** 3 * (star + 1) ** 2.7) / 22000 + 10;
  } else if (star === 12) {
    cost = (adjustLvl ** 3 * (star + 1) ** 2.7) / 15000 + 10;
  } else if (star === 13) {
    cost = (adjustLvl ** 3 * (star + 1) ** 2.7) / 11000 + 10;
  } else if (star === 14) {
    cost = (adjustLvl ** 3 * (star + 1) ** 2.7) / 7500 + 10;
  } else {
    cost = (adjustLvl ** 3 * (star + 1) ** 2.7) / 20000 + 10;
  }
  // Apply special multipliers for certain stars
  const starMultipliers: {[key: number]: number} = {
    17: 1.31766055,
    18: 2.8571348,
    19: 4.44443047,
    21: 1.59999951
  };
  
  if (starMultipliers[star]) {
    cost *= starMultipliers[star];
  }

  // Apply safeguard (3x cost for stars 15-17)
  if (safeguard && star >= 15 && star <= 17) {
    cost *= 3;
  }

  // Apply 30% discount if enabled
  if (discount30) {
    cost *= 0.7;
  }

  // Apply MVP discount
  switch (mvpDiscount) {
    case 'silver':
      cost *= 0.95;
      break;
    case 'gold':
      cost *= 0.9;
      break;
    case 'diamond':
      cost *= 0.85;
      break;
  }

  // Round to nearest 100
  const totalCost = Math.round(cost *100 / 100) * 100;
  return totalCost.toLocaleString();
}

export function calculateMedianCost (totalExpectedCost: number, stdDev: number) {
  if (stdDev === 0) return totalExpectedCost; // deterministic case
  const cv = stdDev / totalExpectedCost; // coefficient of variation
  const adjustment = Math.sqrt(1 + cv * cv);
  return totalExpectedCost / adjustment;
};