import starForceAttempts from '../formulas/sf/chance';
import getNewCost, { applyCostModifiers } from './sf/cost';

export interface StarAttemptStats {
  attempts: number;
  booms: number;
  successRate: number;
  failRate: number;
  boomRate: number;
  cost: number;
  recoveryCost: number;
}

export interface StarForceStats {
  startStar: number;
  endStar: number;
  totalAttempts: number;
  totalBooms: number;
  attemptsPerBoom: number;
  totalCost: number;
  starAttempts: {
    [star: number]: StarAttemptStats;
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
  medianCost: string;
} {

  // Get star force statistics
  const currentStats = startStar === 0 
    ? null 
    : starForceAttempts(0, startStar, starCatch, safeguard, reducedBooms);
  
  const targetStats = starForceAttempts(0, endStar, starCatch, safeguard, reducedBooms);

  // Calculate cost difference
  let totalCost: number;
  if (startStar === 0) {
    totalCost = getNewCost(
      targetStats.starAttempts,
      equipLevel,
      safeguard,
      startStar,
      endStar
    );
  } else {
    const currentTotal = getNewCost(
      currentStats.starAttempts,
      equipLevel,
      safeguard,
      0,
      startStar
    );
    const targetTotal = getNewCost(
      targetStats.starAttempts,
      equipLevel,
      safeguard,
      0,
      endStar
    );
    totalCost = targetTotal - currentTotal;
  }

  // Apply cost modifiers
  const modifiedCost = applyCostModifiers(totalCost, discount30, mvpDiscount);

  const getPercentileCost = (percentile: number): number => {
    if (modifiedCost <= 0) return 0;
    return Math.ceil(
      Math.log(1 - percentile) / Math.log(1 - 1 / modifiedCost)
    );
  };

  // Calculate boom statistics
  const totalBooms = currentStats 
    ? targetStats.totalBooms - currentStats.totalBooms 
    : targetStats.totalBooms;

  // Calculate result metrics
  const luckyCost = getPercentileCost(0.75);
  const unluckyCost = getPercentileCost(0.25);
  const medianCost = getPercentileCost(0.50);

  return {
    averageCost: Math.round(modifiedCost).toLocaleString(),
    averageBooms: totalBooms.toFixed(2),
    luckyCost: Math.round(luckyCost).toLocaleString(),
    unluckyCost: Math.round(unluckyCost).toLocaleString(),
    medianCost: Math.round(medianCost).toLocaleString(),
  };
}