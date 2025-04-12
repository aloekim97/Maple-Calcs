import { StarForceResult } from './chance';

export function getNewCost(
  attempts: StarForceResult['starAttempts'],
  equipLevel: number,
  safeguard: boolean = false,
  discount30: boolean = false,
  mvpDiscount: string = "",
  maxStar: number = 25,
  booms: number,
): string {
  let totalCost = 0;
  const adjustedLevel = Math.floor(equipLevel / 10) * 10;

  for (let currentStar = 0; currentStar <= maxStar; currentStar++) {
    if (!attempts[currentStar]) continue;

    const attempt = attempts[currentStar];
    const baseCost = calculateBaseCost(currentStar, adjustedLevel);
    const cost = applyCostModifiers(baseCost, currentStar, safeguard, discount30, mvpDiscount);
    
    // 👇 DEBUG: Log cost per star before adding to total
    console.log(
      `⭐ Star ${currentStar}: ` +
      `Base=${baseCost.toLocaleString()}, ` +
      `Modified=${cost.toLocaleString()}, ` +
      `Attempts=${attempt.attempts}, ` +
      `Subtotal=${(cost * attempt.attempts).toLocaleString()}`
    );

    totalCost += cost * attempt.attempts;

    if (attempt.booms > 0) {
      const recoveryCost = calculateRecoveryCost(12, currentStar, adjustedLevel, safeguard, discount30, mvpDiscount);
      totalCost += recoveryCost * attempt.booms;
      
      // 👇 DEBUG: Log boom recovery cost
      console.log(
        `💥 Boom at ${currentStar}: Recovery (12→${currentStar}) = ${recoveryCost.toLocaleString()} x ${attempt.booms}`
      );
    }
  }

  console.log(`💰 Final Total Cost: ${Math.round(totalCost).toLocaleString()}`); // Final check
  return Math.round(totalCost).toLocaleString();
}

function calculateRecoveryCost(
  fromStar: number,
  toStar: number,
  level: number,
  safeguard: boolean,
  discount30: boolean,
  mvpDiscount: string
): number {
  let recoveryCost = 0;
  
  for (let star = fromStar; star < toStar; star++) {
    const baseCost = calculateBaseCost(star, level);
    const cost = applyCostModifiers(baseCost, star, safeguard, discount30, mvpDiscount);
    recoveryCost += cost;
  }
  
  return recoveryCost;
}

// Helper functions
function calculateBaseCost(star: number, level: number): number {
    if (star < 10) {
      return (100 * Math.round(Math.pow(level, 3) * (star + 1)) / 2500 + 10);
    } else if (star === 10) {
      return (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7)) / 40000 + 10);
    } else if (star === 11) {
      return (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7)) / 22000 + 10);
    } else if (star === 12) {
      return (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7)) / 15000 + 10);
    } else if (star === 13) {
      return (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7)) / 11000 + 10);
    } else if (star === 14) {
      return (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7)) / 7500 + 10);
    } else {
      return (100 * Math.round(Math.pow(level, 3) * Math.pow(star + 1, 2.7)) / 20000 + 10);
    }
}

const starMultipliers: Record<number, number> = {
  17: 1.31766055,
  18: 2.8571348,
  19: 4.44443047,
  21: 1.59999951,
};

function applyCostModifiers(
  baseCost: number,
  star: number,
  safeguard: boolean,
  discount30: boolean,
  mvpDiscount: string
): number {
  let cost = baseCost
  
  if (starMultipliers[star]) cost *= starMultipliers[star];
  if (safeguard && star >= 15 && star <= 17) cost *= 3;
  if (discount30) cost *= 0.7;
  
  switch (mvpDiscount) {
    case 'silver': cost *= 0.95; break;
    case 'gold': cost *= 0.9; break;
    case 'diamond': cost *= 0.85; break;
  }

  return Math.round(cost);
}