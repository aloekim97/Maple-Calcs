export function useStarForce() {
  
}

export function useCost(star: number, equip: number): number {
  let totalCost = 0;

  if (0 <= star && star < 10) {
    totalCost +=
      100 * Math.floor(((equip ** 3 * (star + 1)) / 2500 + 1) / 10) * 10;
  }

  console.log(totalCost.toLocaleString()); // Log formatted number
  return totalCost; // Still returns a number
}

// Example usage:
console.log(useCost(0, 120)); // Logs "6,912,000" but returns 6912000
console.log(useCost(5, 80));
console.log(useCost(10, 50)); // Logs "0"


