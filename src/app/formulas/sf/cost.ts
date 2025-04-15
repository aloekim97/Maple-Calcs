export default function getNewCost(
  starAttempts: Record<number, { attempts: number; successRate: number }>,
  equipLevel: number,
  safeguard: boolean,
  discount30: boolean,
  mvpDiscount: string,
  startStar: number,
  targetStar: number
): number {
  const funzone: Record<number, number> = {
    15: 2.1,
    16: 2.1,
    17: 6.8,
    18: 6.8,
    19: 8.5,
    20: 10.5,
    21: 12.75,
    22: 17,
    23: 18,
    24: 18,
    25: 18,
    26: 18.6,
    27: 19,
    28: 19.4,
    29: 9.8,
  };

  const starMultipliers: Record<number, number> = {
    17: 1.31766055,
    18: 2.8571348,
    19: 4.44443047,
    21: 1.59999951,
  };

  // Calculate 12-15 base cost
  const twelveToFifteenRates = [0.4, 0.35, 0.3];
  let twelveToFifteenCost = 0;
  for (let s = 12; s < 15; s++) {
    const baseCost = calculateBaseCost(s, equipLevel);
    twelveToFifteenCost += baseCost / twelveToFifteenRates[s - 12];
  }

  let totalCost = 0;
  let currentAccumulated = twelveToFifteenCost;

  for (let star = startStar; star < targetStar; star++) {
    console.log(`\nProcessing star ${star}→${star + 1}`);

    let baseCost = calculateBaseCost(star, equipLevel);
    const originalBaseCost = baseCost;

    // Apply multiplier only to specific stars
    if (starMultipliers[star]) {
      baseCost *= starMultipliers[star];
      console.log(
        `Applied ${
          starMultipliers[star]
        }× multiplier: ${originalBaseCost.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })} → ${baseCost.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}`
      );
    }

    const attempts = starAttempts[star]?.attempts || 1;
    const successRate =
      starAttempts[star]?.successRate ||
      (star < 15 ? twelveToFifteenRates[star - 12] : 0.3);
    const boomChance = star >= 15 ? (funzone[star] || 0) / 100 : 0;

    if (star < 12) {
      totalCost += baseCost * attempts;
    } else if (star < 15) {
      totalCost += baseCost * attempts;
    } else {
      console.log(
        `Base: ${baseCost.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}`
      );
      console.log(
        `prevAccumulated: ${currentAccumulated.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}`
      );

      const boomCost = currentAccumulated * boomChance;
      console.log(
        `Boom Cost: ${boomCost.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })} (Accumulated: ${currentAccumulated.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })} * ${boomChance})`
      );

      const starCost = (baseCost + boomCost) * attempts;
      console.log(
        `Star Cost: ${starCost.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })}`
      );
      console.log(
        `base ${baseCost.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })} boom ${boomCost.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })} attempts ${attempts} ${star}`
      );

      totalCost += starCost;

      // Update accumulated cost for next star
      const addedToAccumulated = (baseCost + boomCost) * attempts;
      currentAccumulated += addedToAccumulated;

      console.log(
        `Added ${addedToAccumulated.toLocaleString(undefined, {
          maximumFractionDigits: 3,
        })} to accumulated cost (now: ${currentAccumulated.toLocaleString(
          undefined,
          { maximumFractionDigits: 3 }
        )})`
      );
    }
  }

  console.log(
    `\nTOTAL COST: ${totalCost.toLocaleString(undefined, {
      maximumFractionDigits: 3,
    })}`
  );
  return totalCost;
}

export function calculateBaseCost(star: number, level: number): number {
  if (star < 10) {
    return 100 * Math.round((Math.pow(level, 3) * (star + 1)) / 2500 + 10);
  } else if (star === 10) {
    return (
      (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7))) / 40000 +
      10
    );
  } else if (star === 11) {
    return (
      (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7))) / 22000 +
      10
    );
  } else if (star === 12) {
    return (
      (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7))) / 15000 +
      10
    );
  } else if (star === 13) {
    return (
      (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7))) / 11000 +
      10
    );
  } else if (star === 14) {
    return (
      (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7))) / 7500 +
      10
    );
  } else {
    return (
      100 *
      (Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7)) / 20000 + 10)
    );
  }
}

const starMultipliers: Record<number, number> = {
  17: 1.31766055,
  18: 2.8571348,
  19: 4.44443047,
  21: 1.59999951,
};

export function applyCostModifiers(
  baseCost: number,
  star: number,
  safeguard: boolean,
  discount30: boolean,
  mvpDiscount: string
): number {
  let cost = baseCost;

  // Apply star-specific multipliers
  if (starMultipliers[star]) {
    cost *= starMultipliers[star];
  }

  // Apply safeguard multiplier (3x for stars 15-17)
  if (safeguard && star >= 15 && star <= 17) {
    cost *= 3;
  }

  // Apply 30% discount if available
  if (discount30) {
    cost *= 0.7;
  }

  // Apply MVP discount
  switch (mvpDiscount) {
    case 'silver':
      cost *= 0.97;
      break;
    case 'gold':
      cost *= 0.95;
      break;
    case 'diamond':
      cost *= 0.9;
      break;
    // No discount for unknown/empty values
  }
  return Math.round(cost);
}

export function calculateMedianCost(expected: number, stdDev: number): number {
  const cv = stdDev / expected;
  return (
    expected * Math.exp(-0.5 * Math.pow(cv, 2) * (1 - Math.pow(cv, 3) / 3))
  );
}
