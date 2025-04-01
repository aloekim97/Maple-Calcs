export interface Combination {
  line1: string;
  line2: string;
  line3: string;
}


const VALID_TARGETS_BY_POTENTIAL_TYPE: { [key: string]: number[] } = {
  lowStat: [12, 15, 18, 21, 24, 27, 30, 33, 36],
  highStat: [14, 17, 20, 23, 26, 27, 30, 33, 36, 39],
  cdr: [1, 2, 3, 4, 5, 6],
  cdrStat: [[2,3,4], lprime, uprime],
  cd: [8, 16, 24],
  cdStat: [[8, 16], lprime, uprime],
};

export default function cubeCombo(
  goal: any,
  lPrime: number[],
  uPrime: number[]
): Combination[] {
  console.log(goal, lPrime, uPrime);
  const combinations: Combination[] = [];
  const taggedLPrime = lPrime.map((value) => `${value} (L)`);
  const taggedUPrime = uPrime.map((value) => `${value} (U)`);
  const firstValues = taggedLPrime;
  const validValues = [...taggedLPrime, ...taggedUPrime];

  for (const value1 of firstValues) {
    for (const value2 of validValues) {
      for (const value3 of validValues) {
        const num1 = parseFloat(value1);
        const num2 = parseFloat(value2);
        const num3 = parseFloat(value3);

        if (num1 + num2 + num3 >= goal) {
          combinations.push({ line1: value1, line2: value2, line3: value3 });
        }
      }
    }
  }
  return combinations;
}
