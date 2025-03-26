import { getChance } from './sf/chance';
import { getCost, getNewCost } from './sf/cost';

export function calculateStarforceStats(
  startStar: number,
  endStar: number,
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
    const { success, boom } = getChance(star);
    const cost = parseFloat(getCost(star, equipLevel).replace(/,/g, ''));
    const pSuccess = success / 100;
    const pBoom = boom / 100;

    const expectedAttempts = 1 / pSuccess;

    const varianceAttempts = (1 - pSuccess) / (pSuccess * pSuccess);

    totalExpectedCost += (expectedAttempts * cost);
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
    const { success, boom } = getChance(star);
    const cost = parseFloat(getNewCost(star, equipLevel).replace(/,/g, ''));
    const pSuccess = success / 100;
    const pBoom = boom / 100;

    const expectedAttempts = 1 / pSuccess;

    const varianceAttempts = (1 - pSuccess) / (pSuccess * pSuccess);

    totalExpectedCost += expectedAttempts * cost;
    totalExpectedBooms += pBoom / (pBoom + pSuccess);

    totalVarianceCost += varianceAttempts * Math.pow(cost, 2);
  }

  const stdDev = Math.sqrt(totalVarianceCost);

  const luckyCost = totalExpectedCost - 1 * stdDev;
  const unluckyCost = totalExpectedCost + 1 * stdDev;

  const formatNumber = (num: number) => num.toLocaleString();

  const roundedAverageBooms = Math.round(totalExpectedBooms * 100) / 100;

  return {
    averageCost: formatNumber(Math.round(totalExpectedCost)),
    averageBooms: roundedAverageBooms.toFixed(2),
    luckyCost: formatNumber(Math.round(luckyCost)),
    unluckyCost: formatNumber(Math.round(unluckyCost)),
  };
}
