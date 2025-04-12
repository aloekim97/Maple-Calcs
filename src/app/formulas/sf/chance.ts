export interface StarAttemptStats {
  attempts: number;
  booms: number;
  successRate: number;
  failRate: number;
  boomRate: number;
}

export interface StarForceResult {
  totalAttempts: number;
  totalBooms: number;
  attemptsPerBoom: number;
  starAttempts: {
    [star: number]: StarAttemptStats;
  };
}


export default function starForceAttempts(startStar, endStar, starCatch = false, safeguard = false, reducedBooms = false) {
  const rates = {
    initial: {
      0: [95, 5, 0],
      1: [90, 10, 0],
      2: [85, 15, 0],
      3: [85, 15, 0],
      4: [80, 20, 0],
      5: [75, 25, 0],
      6: [70, 30, 0],
      7: [65, 35, 0],
      8: [60, 40, 0],
      9: [55, 45, 0],
      10: [50, 50, 0],
      11: [45, 55, 0],
    },
    mid: {
      12: [40, 60, 0],
      13: [35, 65, 0],
      14: [30, 70, 0],
    },
    funzone: {
      15: [30, 67.9, 2.1],
      16: [30, 67.9, 2.1],
      17: [15, 78.2, 6.8],
      18: [15, 78.2, 6.8],
      19: [15, 76.5, 8.5],
      20: [30, 59.5, 10.5],
      21: [15, 72.5, 12.75],
      22: [15, 68, 17],
      23: [10, 72, 18],
      24: [10, 72, 18],
      25: [10, 72, 18],
      26: [7, 74.4, 18.6],
      27: [5, 76, 19],
      28: [3, 77.6, 19.4],
      29: [1, 79.2, 19.8],
    },
  };

  // Validate input
  if (startStar < 0 || startStar > 29 || endStar < 0 || endStar > 29 || startStar >= endStar) {
    throw new Error("Invalid star range");
  }

  let currentStar = startStar;
  let totalAttempts = 0;
  let totalBooms = 0;
  const starAttempts = {};

  while (currentStar < endStar) {
    // Determine which rate table to use
    let rateTable;
    if (currentStar <= 11) rateTable = rates.initial;
    else if (currentStar <= 14) rateTable = rates.mid;
    else rateTable = rates.funzone;

    // Get current rates
    let [success, fail, boom] = rateTable[currentStar];
    
    // Apply modifiers in the exact order you specified
    if (starCatch) {
      success *= 1.05; // 5% success rate increase
      fail = 100 - success - boom;
    }

    if (reducedBooms && boom > 0) {
      boom *= 0.7; // 30% boom chance reduction
      fail = 100 - success - boom;
    }

    if (safeguard && (currentStar === 15 || currentStar === 16 || currentStar === 17)) {
      boom = 0;
      fail = 100 - success;
    }

    // Normalize rates (in case of floating point errors)
    const total = success + fail + boom;
    success = success / total;
    fail = fail / total;
    boom = boom / total;

    // Calculate expected attempts for this star
    const attemptsForThisStar = 1 / success;
    
    // Calculate boom probability per attempt at this star
    const boomProbabilityPerAttempt = boom;
    
    // Expected booms while attempting this star
    const expectedBoomsAtThisStar = attemptsForThisStar * boomProbabilityPerAttempt;
    
    // If we boom, we have to redo from 15, so we need to account for that
    if (boom > 0 && currentStar > 12) {
      const recoveryAttempts = calculateRecoveryAttempts(12, currentStar, starCatch, safeguard, reducedBooms);
      totalAttempts += attemptsForThisStar + (expectedBoomsAtThisStar * recoveryAttempts.attempts);
      totalBooms += expectedBoomsAtThisStar + (expectedBoomsAtThisStar * recoveryAttempts.booms);
    } else {
      totalAttempts += attemptsForThisStar;
      totalBooms += expectedBoomsAtThisStar;
    }

    starAttempts[currentStar] = {
      attempts: attemptsForThisStar,
      booms: expectedBoomsAtThisStar,
      successRate: success * 100,
      failRate: fail * 100,
      boomRate: boom * 100
    };

    currentStar++;
  }

  return {
    startStar,
    endStar,
    totalAttempts,
    totalBooms,
    attemptsPerBoom: totalBooms > 0 ? totalAttempts / totalBooms : Infinity,
    starAttempts
  };

  // Helper function to calculate attempts needed to recover after a boom
  function calculateRecoveryAttempts(from, to, starCatch, safeguard, reducedBooms) {
    let attempts = 0;
    let booms = 0;
    
    for (let star = from; star < to; star++) {
      let rateTable;
      if (star <= 11) rateTable = rates.initial;
      else if (star <= 14) rateTable = rates.mid;
      else rateTable = rates.funzone;

      let [success, fail, boom] = rateTable[star];
      
      // Apply modifiers in the same order
      if (starCatch) {
        success *= 1.05;
        fail = 100 - success - boom;
      }
      
      if (reducedBooms && boom > 0) {
        boom *= 0.7;
        fail = 100 - success - boom;
      }

      if (safeguard && (star === 15 || star === 16 || star === 17)) {
        boom = 0;
        fail = 100 - success;
      }

      const total = success + fail + boom;
      success = success / total;
      boom = boom / total;

      const attemptsForThisStar = 1 / success;
      const expectedBoomsAtThisStar = attemptsForThisStar * boom;

      attempts += attemptsForThisStar;
      booms += expectedBoomsAtThisStar;

      // If we boom during recovery, we have to restart recovery from 12 again
      if (boom > 0 && star > 12) {
        const recovery = calculateRecoveryAttempts(12, star, starCatch, safeguard, reducedBooms);
        attempts += expectedBoomsAtThisStar * recovery.attempts;
        booms += expectedBoomsAtThisStar * recovery.booms;
      }
    }
    
    return { attempts, booms };
  }
}

// Example usage:
const stats = starForceAttempts(15, 22, false, false, false);
console.log(`Estimated to reach star ${stats.endStar} from ${stats.startStar}:`);
console.log(`- Total attempts: ${stats.totalAttempts.toFixed(2)}`);
console.log(`- Total booms: ${stats.totalBooms.toFixed(2)}`);
console.log(`- Attempts per boom: ${stats.attemptsPerBoom.toFixed(2)}`);
console.log("Per-star breakdown:", stats.starAttempts);
const result = starForceAttempts(15, 22);
const avgTapsPerStar = result.totalAttempts / (result.endStar - result.startStar);
console.log(`Average taps per star: ${avgTapsPerStar.toFixed(2)}`);