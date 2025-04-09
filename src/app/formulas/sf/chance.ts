export function getChance(
  star: number,
  starCatch: boolean,
  safeguard: boolean,
  reduceBooms?: boolean
): {
  success: number;
  fail: number;
  boom: number;
} {
  const successChances: { [key: number]: number } = {
    0: 95,
    1: 90,
    2: 85,
    3: 85, // Repeats star 2's value
    4: 80,
    5: 75,
    6: 70,
    7: 65,
    8: 60,
    9: 55,
    10: 55,
    11: 45,
    12: 50,
    13: 35,
    14: 30,
    15: 30,
  };

  let success: number;

  if (star <= 15) {
    success = successChances[star];
  } else {
    if (star === 16) success = 30;
    else if (star >= 17 && star <= 19) success = 15;
    else if (star === 20) success = 30;
    else if (star >= 21 && star <= 22) success = 15;
    else if (star >= 23 && star <= 25) success = 10;
    else if (star === 26) success = 7;
    else if (star === 27) success = 5;
    else if (star === 28) success = 3;
    else if (star === 29) success = 2;
    else if (star === 30) success = 1;
    else success = 0;
  }

  if (starCatch) {
    success = success * 1.05;
  }


  const boomChances: { [key: number]: number } = {
    15: 2.1,
    16: 2.1,
    17: 6.8,
    18: 6.8,
    19: 8.5,
    20: 10.5,
    21: 12.5,
    22: 17,
    23: 18,
    24: 18,
    25: 18,
    26: 18.6,
    27: 19,
    28: 19.4,
    29: 19.8,
  };

  let boom = boomChances[star] || 0;

  if (safeguard && star >= 15 && star <= 17) {
    boom = 0;
  }
  if (reduceBooms && star >= 15 && star < 21) {
    boom = boom * .3
  }

  const fail = 100 - success - boom;

  if (fail < 0) {
    throw new Error(
      'Invalid probabilities: The sum of success and boom chances exceeds 100%.'
    );
  }

  return { success, fail, boom };
}
