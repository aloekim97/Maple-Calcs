import { getChance } from './sf/chance';
import { getNewCost } from './sf/cost';

export function calculateKMS(
  startStar: number,
  endStar: number,
  equipLevel: number,
  starCatch: boolean,
  safeguard: boolean,
  discount30: boolean,
  reducedBooms: boolean,
  mvpDiscount: string
): {
  averageCost: string;
  averageBooms: string;
  luckyCost: string;
  unluckyCost: string;
  medianCost: string;
} {
  // Validate input
  if (startStar >= endStar) {
    throw new Error('startStar must be less than endStar');
  }

  // Initialize totals
  let totalExpectedCost = 0;
  let totalExpectedBooms = 0;
  let totalVarianceCost = 0;
  const costBreakdown: {[star: number]: number} = {};

  // Calculate expected booms starting from 12★
  const boomStartStar = Math.max(12, startStar); // Start counting booms from 12★ or higher
  
  // Calculate costs and booms for each star level
  for (let star = startStar; star < endStar; star++) {
    const { success, boom } = getChance(
      star,
      starCatch,
      safeguard,
      reducedBooms
    );
    
    const cost = parseFloat(
      getNewCost(star, equipLevel, safeguard, discount30, mvpDiscount).replace(/,/g, '')
    );
    const pSuccess = success / 100;
    const pBoom = boom / 100;

    // Expected attempts considering booms
    const expectedAttempts = 1 / pSuccess;
    const varianceAttempts = (1 - pSuccess) / (pSuccess * pSuccess);

    // Only count booms from 12★ and above
    const expectedBooms = star >= boomStartStar ? (pBoom / pSuccess) : 0;
    totalExpectedBooms += expectedBooms;

    // Cost for this star level
    const starCost = expectedAttempts * cost;
    costBreakdown[star] = starCost;
    totalExpectedCost += starCost;
    totalVarianceCost += varianceAttempts * Math.pow(cost, 2);
  }
  console.log(totalExpectedBooms)

  // Calculate statistics
  const stdDev = Math.sqrt(totalVarianceCost);
  const luckyCost = Math.max(0, totalExpectedCost - stdDev);
  const unluckyCost = totalExpectedCost + stdDev;
  const medianCost = calculateMedianCost(totalExpectedCost, stdDev);
  return {
    averageCost: Math.round(totalExpectedCost).toLocaleString(),
    averageBooms: totalExpectedBooms.toFixed(2),
    luckyCost: Math.round(luckyCost).toLocaleString(),
    unluckyCost: Math.round(unluckyCost).toLocaleString(),
    medianCost: Math.round(medianCost).toLocaleString(),
  };
}

function calculateMedianCost(expected: number, stdDev: number): number {
  const cv = stdDev / expected;
  return expected * Math.exp(-0.5 * Math.pow(cv, 2) * (1 - Math.pow(cv, 3) / 3));
}