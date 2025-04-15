import { PotCalcResult } from "@/app/formulas/cube/potentialprobability";
import { StarForceResults } from "./inputs/starforceInputs";

interface TotalCostProps {
  cubeRes: (PotCalcResult & {
    luckyCost?: string;
    unluckyCost?: string;
    medianCost?: string;
  }) | null;
  sfResults: StarForceResults | null;
}

export default function TotalCost({ cubeRes, sfResults }: TotalCostProps) {
  const transformAndFormat = (costString: string | null | undefined): string => {
    if (!costString) return 'NA';
    
    const num = Number(costString.replace(/,/g, ''));

    if (isNaN(num)) return 'NA';
    if (num === Infinity) return '∞';

    let transformed: number;
    let suffix: string = '';

    if (num >= 1_000_000_000_000) {
      transformed = num / 1_000_000_000_000;
      suffix = 'T';
    } else if (num >= 1_000_000_000) {
      transformed = num / 1_000_000_000;
      suffix = 'B';
    } else if (num >= 1_000_000) {
      transformed = num / 1_000_000;
      suffix = 'M';
    } else {
      return num.toLocaleString();
    }

    return transformed.toFixed(2).replace(/\.?0+$/, '') + suffix;
  };

  // Helper function to sum two cost strings
  const sumCosts = (cost1: string | null | undefined, cost2: string | null | undefined): string | null => {
    if (!cost1 && !cost2) return null;
    
    const num1 = cost1 ? Number(cost1.replace(/,/g, '')) : 0;
    const num2 = cost2 ? Number(cost2.replace(/,/g, '')) : 0;
    
    if (isNaN(num1 + num2)) return null;
    
    return (num1 + num2).toLocaleString('en-US');
  };

  // Calculate combined costs
  const combinedAverageCost = sumCosts(cubeRes?.averageCost, sfResults?.averageCost);
  const combinedUnluckyCost = sumCosts(cubeRes?.unluckyCost, sfResults?.unluckyCost);
  const combinedLuckyCost = sumCosts(cubeRes?.luckyCost, sfResults?.luckyCost);
  const combinedMedianCost = sumCosts(cubeRes?.medianCost, sfResults?.medianCost);

  // Format the combined costs
  const averageCostDisplay = transformAndFormat(combinedAverageCost);
  const unlucky = transformAndFormat(combinedUnluckyCost);
  const lucky = transformAndFormat(combinedLuckyCost);
  const median = transformAndFormat(combinedMedianCost);

  return (
    <div className="flex w-full flex-col border border-purple-500 bg-purple-50 rounded-[8px] p-[12px] gap-[4px]">
      <h5 className="opacity-60">Total Cost</h5>
      <div className="flex flex-col w-full h-full">
        <div className="grid grid-cols-4 w-full h-full gap-x-[16px] gap-y-[4px] items-center">
          <h4 className="flex justify-start h-full w-full items-center">
            Median:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            {median}
          </p>
          <h4 className="flex justify-start h-full w-full items-center">
            Upper:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            {unlucky}
          </p>
          <h4 className="flex justify-start h-full w-full items-center">
            Average:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            {averageCostDisplay}
          </p>
          <h4 className="flex justify-start h-full w-full items-center">
            Lower:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            {lucky}
          </p>
        </div>
      </div>
    </div>
  );
}