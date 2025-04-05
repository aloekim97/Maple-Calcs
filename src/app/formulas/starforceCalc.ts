import { getChance } from './sf/chance';
import { getCost, getNewCost } from './sf/cost';

export function calculateStarforceStats(
  startStar: number,
  endStar: number,
  itemLevel: number,
  starCatch: boolean,
  safeguard: boolean,
  discount30: boolean,
  reducedBooms: boolean,
  mvpDiscount: string,
  equipLevel: number
): {
  averageCost: string;
  averageBooms: string;
  luckyCost: string;
  unluckyCost: string;
} {
  let totalExpectedCost = 0;
  let totalExpectedBooms = 0;
  let totalVarianceCost = 0;

  for (let star = startStar; star < endStar; star++) {
    const { success, boom } = getChance(star, starCatch, safeguard);
    const cost = parseFloat(getCost(star, equipLevel).replace(/,/g, ''));
    const pSuccess = success / 100;
    const pBoom = boom / 100;

    const expectedAttempts = 1 / pSuccess;

    const varianceAttempts = (1 - pSuccess) / (pSuccess * pSuccess);

    totalExpectedCost += expectedAttempts * cost;
    totalExpectedBooms += pBoom * expectedAttempts;

    totalVarianceCost +=
      expectedAttempts * Math.pow(cost, 2) +
      varianceAttempts * Math.pow(cost, 2);
  }

  const stdDev = Math.sqrt(totalVarianceCost);

  const luckyCost = totalExpectedCost - 1 * stdDev;
  const unluckyCost = totalExpectedCost + 1 * stdDev;

  const formatNumber = (num: number) => num.toLocaleString();

  return {
    averageCost: formatNumber(Math.round(totalExpectedCost)),
    averageBooms: formatNumber(Math.round(totalExpectedBooms)),
    luckyCost: formatNumber(Math.round(luckyCost)),
    unluckyCost: formatNumber(Math.round(unluckyCost)),
  };
}

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
} {
  let totalExpectedCost = 0;
  let totalExpectedBooms = 0;
  let totalVarianceCost = 0;

  for (let star = startStar; star < endStar; star++) {
    const { success, boom } = getChance(star, starCatch, safeguard, reducedBooms);
    const cost = parseFloat(
      getNewCost(star, equipLevel, safeguard, discount30, mvpDiscount).replace(/,/g, '')
    );
    const pSuccess = success / 100;
    const pBoom = boom / 100;

    const expectedAttempts = 1 / pSuccess;
    const varianceAttempts = (1 - pSuccess) / (pSuccess * pSuccess);

    totalExpectedCost += expectedAttempts * cost;
    totalExpectedBooms += pBoom * expectedAttempts;
    totalVarianceCost += varianceAttempts * Math.pow(cost, 2);
  }

  const stdDev = Math.sqrt(totalVarianceCost);
  const luckyCost = Math.max(0, totalExpectedCost - stdDev); // Prevent negative values
  const unluckyCost = totalExpectedCost + stdDev;

  return {
    averageCost: Math.round(totalExpectedCost).toLocaleString(),
    averageBooms: totalExpectedBooms.toFixed(2),
    luckyCost: Math.round(luckyCost).toLocaleString(),
    unluckyCost: Math.round(unluckyCost).toLocaleString(),
  };
}