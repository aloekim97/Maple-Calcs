export interface Combination {
  line1: string;
  line2: string;
  line3: string;
}

export default function cubeCombo(
  goal: number,
  lPrime: number[],
  uPrime: number[]
): Combination[] {
  const combinations: Combination[] = [];
  const taggedLPrime = lPrime.map((value) => `${value} (lPrime)`);
  const taggedUPrime = uPrime.map((value) => `${value} (uPrime)`);
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
