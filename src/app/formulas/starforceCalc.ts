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

  // Calculate boom statistics
  const totalBooms = currentStats 
    ? targetStats.totalBooms - currentStats.totalBooms 
    : targetStats.totalBooms;

  // Calculate standard deviation (simplified model)
  const costPerAttempt = modifiedCost / targetStats.totalAttempts;
  const stdDev = Math.sqrt(targetStats.totalAttempts) * costPerAttempt * 0.5;

  // Calculate result metrics
  const luckyCost = Math.max(0, modifiedCost - stdDev);
  const unluckyCost = modifiedCost + stdDev;
  const medianCost = modifiedCost;

  return {
    averageCost: Math.round(modifiedCost).toLocaleString(),
    averageBooms: totalBooms.toFixed(2),
    luckyCost: Math.round(luckyCost).toLocaleString(),
    unluckyCost: Math.round(unluckyCost).toLocaleString(),
    medianCost: Math.round(medianCost).toLocaleString(),
  };
}