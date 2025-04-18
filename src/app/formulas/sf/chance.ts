export default function calculateStarForceStats(
  startStar,
  endStar,
  starCatch = false,
  safeguard = false,
  reducedBooms = false
) {
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
  if (
    startStar >= endStar
  ) {
    throw new Error('Invalid star range');
  }

  // Initialize variables
  let currentStar = startStar;
  let totalAttempts = 0;
  let totalBooms = 0;
  const starAttempts = {}; // Stores attempts needed for each star

  while (currentStar < endStar) {
    // Determine which rate table to use
    let rateTable;
    if (currentStar <= 11) rateTable = rates.initial;
    else if (currentStar <= 14) rateTable = rates.mid;
    else rateTable = rates.funzone;

    // Get current rates
    let [success, fail, boom] = rateTable[currentStar];

    // Apply modifiers
    if (starCatch) {
      success *= 1.05; // 1.05x multiplier to success rate when star catch is on
      // Adjust fail rate to maintain total probability of 100%
      fail = 100 - success - boom;
    }

    if (
      safeguard &&
      (currentStar === 15 || currentStar === 16 || currentStar === 17)
    ) {
      boom = 0; // 0% boom rate for 15-17 when safeguard is on
      fail = 100 - success; // Adjust fail rate
    }

    if (reducedBooms && boom > 0) {
      boom *= 0.7; // 30% reduction in boom rate
      fail = 100 - success - boom; // Adjust fail rate
    }

    // Normalize rates to ensure they sum to 1 (100%)
    const total = success + fail + boom;
    success = success / total;
    fail = fail / total;
    boom = boom / total;

    // Calculate expected attempts for this star
    const attemptsForThisStar = 1 / success;

    // Calculate boom probability per attempt at this star
    const boomProbabilityPerAttempt = boom;

    // Expected booms while attempting this star
    const expectedBoomsAtThisStar =
      attemptsForThisStar * boomProbabilityPerAttempt;

    // If we boom, we have to redo from 15, so we need to account for that
    if (boom > 0 && currentStar > 15) {
      const recoveryAttempts = calculateRecoveryAttempts(
        12,
        currentStar,
        starCatch,
        safeguard,
        reducedBooms
      );
      totalAttempts +=
        attemptsForThisStar +
        expectedBoomsAtThisStar * recoveryAttempts.attempts;
      totalBooms +=
        expectedBoomsAtThisStar +
        expectedBoomsAtThisStar * recoveryAttempts.booms;
    } else {
      // No boom risk or already at/above 15 (booming doesn't set us back further)
      totalAttempts += attemptsForThisStar;
      totalBooms += expectedBoomsAtThisStar;
    }

    starAttempts[currentStar] = {
      attempts: attemptsForThisStar,
      booms: expectedBoomsAtThisStar,
    };

    currentStar++;
  }

  return {
    startStar,
    endStar,
    totalAttempts,
    totalBooms,
    attemptsPerBoom: totalBooms > 0 ? totalAttempts / totalBooms : Infinity,
    starAttempts,
  };

  // Helper function to calculate attempts needed to recover after a boom
  function calculateRecoveryAttempts(
    from,
    to,
    starCatch,
    safeguard,
    reducedBooms
  ) {
    let attempts = 0;
    let booms = 0;

    for (let star = from; star < to; star++) {
      let rateTable;
      if (star <= 11) rateTable = rates.initial;
      else if (star <= 14) rateTable = rates.mid;
      else rateTable = rates.funzone;

      let [success, fail, boom] = rateTable[star];

      // Apply the same modifiers as in the main function
      if (starCatch) {
        success *= 1.05;
        fail = 100 - success - boom;
      }

      if (safeguard && (star === 15 || star === 16 || star === 17)) {
        boom = 0;
        fail = 100 - success;
      }

      if (reducedBooms && boom > 0) {
        boom *= 0.7;
        fail = 100 - success - boom;
      }

      const total = success + fail + boom;
      success = success / total;
      boom = boom / total;

      const attemptsForThisStar = 1 / success;
      const expectedBoomsAtThisStar = attemptsForThisStar * boom;

      attempts += attemptsForThisStar;
      booms += expectedBoomsAtThisStar;

      // If we boom during recovery, we have to restart recovery from 15 again
      if (boom > 0 && star > 15) {
        const recovery = calculateRecoveryAttempts(
          12,
          star,
          starCatch,
          safeguard,
          reducedBooms
        );
        attempts += expectedBoomsAtThisStar * recovery.attempts;
        booms += expectedBoomsAtThisStar * recovery.booms;
      }
    }

    return { attempts, booms };
  }
}
