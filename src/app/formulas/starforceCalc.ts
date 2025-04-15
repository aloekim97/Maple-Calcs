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
  // Validate input
  if (startStar >= endStar) {
    throw new Error('startStar must be less than endStar');
  }

  // Get star force statistics
  const sfStats = starForceAttempts(
    startStar,
    endStar,
    starCatch,
    safeguard,
    reducedBooms
  );
  // console.log(sfStats)
  // Calculate costs for the requested star range
  let kmsCost = getNewCost(
    sfStats.starAttempts,
    equipLevel,
    safeguard,
    startStar,
    endStar
  );
  kmsCost = applyCostModifiers(kmsCost, discount30, mvpDiscount)

  // Calculate additional statistics (optional - remove if not needed)
  const totalCost = kmsCost;
  const totalBooms = sfStats.totalBooms;

  // Calculate standard deviation (placeholder - adjust based on your actual variance model)
  const costPerAttempt = totalCost / sfStats.totalAttempts;
  const stdDev = Math.sqrt(sfStats.totalAttempts) * costPerAttempt * 0.5; // Adjust multiplier as needed

  // Calculate result metrics
  const luckyCost = Math.max(0, totalCost - stdDev);
  const unluckyCost = totalCost + stdDev;
  const medianCost = totalCost; // For normal distribution, median ≈ mean

  return {
    averageCost: Math.round(totalCost).toLocaleString(),
    averageBooms: totalBooms.toFixed(2),
    luckyCost: Math.round(luckyCost).toLocaleString(),
    unluckyCost: Math.round(unluckyCost).toLocaleString(),
    medianCost: Math.round(medianCost).toLocaleString(),
  };
}
