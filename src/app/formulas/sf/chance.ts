'use client';

export function getChance(
  currentStar: number,
  starCatch: boolean,
  safeguard: boolean,
  reduceBooms: boolean,
  targetStar: number | null = null
): {
  success: number;
  fail: number;
  boom: number;
  avgBoomsToTarget?: number;
} {
  // ===== 1. Core Probability Calculation =====
  const successRates = [
    95,
    90,
    85,
    85,
    80,
    75,
    70,
    65,
    60,
    55, // 0-9
    55,
    45,
    50,
    35,
    30,
    30,
    30,
    15,
    15,
    15, // 10-19
    30,
    15,
    15,
    10,
    10,
    10,
    7,
    5,
    3,
    2,
    1, // 20-30
  ];

  const boomRates = [
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0,
    0, // 0-9
    0,
    0,
    0,
    0,
    0,
    2.1,
    2.1,
    6.8,
    6.8,
    8.5, // 10-19
    10.5,
    12.5,
    17,
    18,
    18,
    18,
    18.6,
    19,
    19.4,
    19.8, // 20-29
  ];

  let success = successRates[currentStar];
  let boom =
    currentStar >= 15 && currentStar <= 29 ? boomRates[currentStar] : 0;

  // Apply modifiers
  if (starCatch) success = Math.min(100, success * 1.05);
  if (safeguard && currentStar >= 15 && currentStar <= 17) boom = 0;
  if (reduceBooms && currentStar >= 15 && currentStar < 21) boom *= 0.3;

  const fail = 100 - success - boom;
  const booms = averageBooms(boom, success, currentStar, targetStar);
  console.log(booms);

  const result: {
    success: number;
    fail: number;
    boom: number;
    avgBoomsToTarget?: number;
  } = {
    success: parseFloat(success.toFixed(2)),
    fail: parseFloat(fail.toFixed(2)),
    boom: parseFloat(boom.toFixed(2)),
  };

  // Only calculate average booms if target is specified and above current star
  if (targetStar !== null && targetStar > currentStar) {
    result.avgBoomsToTarget = parseFloat(
      averageBooms(boom, success, currentStar, targetStar).toFixed(2)
    );
  }

  return result;
}

function averageBooms(
  boom: number,
  success: number,
  currentStar: number,
  targetStar: number
): number {
  const boomedStar = 15;
  const stay = 100 - boom - success;

  const boomProb = boom / 100;
  const successProb = success / 100;
  const stayProb = stay / 100;

  // Initialize DP array with targetStar + 2 elements
  const e: number[] = new Array(targetStar + 2).fill(0);

  // Base case: already at or above target
  for (let i = targetStar; i <= targetStar + 1; i++) {
    e[i] = 0;
  }

  // Work backwards from targetStar-1 down to currentStar
  for (let i = targetStar - 1; i >= currentStar; i--) {
    if (i >= boomedStar) {
      // Above boom threshold - can boom, succeed, or stay
      e[i] =
        boomProb * (1 + e[boomedStar]) +
        successProb * e[i + 1] +
        stayProb * e[i];

      // Solve for e[i] by moving stayProb*e[i] to left side
      e[i] =
        (boomProb * (1 + e[boomedStar]) + successProb * e[i + 1]) /
        (1 - stayProb);
    } else {
      // Below boom threshold - can succeed or stay (can't boom)
      e[i] = successProb * e[i + 1] + stayProb * e[i];

      // Solve for e[i]
      e[i] = (successProb * e[i + 1]) / (1 - stayProb);
    }
  }

  return e[currentStar];
}

function averageBoomsTo22(): number {
  const successRates = [
    95, 90, 85, 85, 80, 75, 70, 65, 60, 55, 55, 45, 50, 35, 30, 30, 30, 15, 15,
    15, 30, 15, 7,
  ];
  const boomRates = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2.1, 2.1, 6.8, 6.8, 8.5, 10.5,
    12.5, 18.6,
  ];

  const E = new Array(23).fill(0); // E[22] = 0 (base case)

  for (let i = 21; i >= 0; i--) {
    const success = successRates[i] / 100;
    const boom = boomRates[i] / 100;
    const stay = 1 - success - boom;

    if (i >= 15) {
      // If booming, reset to 0★ (add 1 boom)
      E[i] = boom * (1 + E[0]) + success * E[i + 1] + stay * E[i];
      E[i] = (boom * (1 + E[0]) + success * E[i + 1]) / (1 - stay);
    } else {
      // Cannot boom
      E[i] = (success * E[i + 1]) / (1 - stay);
    }
  }

  return E[0]; // Expected booms from 0 → 22
}

console.log(`Average booms (0→22): ${averageBoomsTo22().toFixed(2)}`);
