import { PotCalcResult } from '@/app/formulas/cube/potentialprobability';
import { StarForceResults } from './inputs/starforceInputs';
import { useEffect, useState } from 'react';

interface TotalCostProps {
  cubeRes?:
    | (PotCalcResult & {
        luckyCost?: string;
        unluckyCost?: string;
        medianCost?: string;
      })
    | null;
  sfResults?: StarForceResults | null;
  weeklyIncome?: string;
}

export default function TotalCost({ cubeRes, sfResults, weeklyIncome }: TotalCostProps) {
  const transformAndFormat = (
    costString: string | null | undefined
  ): string => {
    if (!costString) return 'NA';

    const num = Number(costString.replace(/,/g, ''));

    if (isNaN(num)) return 'NA';
    if (num === Infinity) return '∞';

    let transformed: number;
    let suffix: string = '';

    if (num >= 1_000_000_000_000_000) {
      transformed = num / 1_000_000_000_000_000;
      suffix = 'Q';
    } else if (num >= 1_000_000_000_000) {
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

    return transformed.toFixed(1).replace(/\.?0+$/, '') + suffix;
  };

  // Helper function to sum two cost strings
  const sumCosts = (
    cost1: string | null | undefined,
    cost2: string | null | undefined
  ): string | null => {
    if (!cost1 && !cost2) return null;

    const num1 = cost1 ? Number(cost1.replace(/,/g, '')) : 0;
    const num2 = cost2 ? Number(cost2.replace(/,/g, '')) : 0;

    if (isNaN(num1 + num2)) return null;

    return (num1 + num2).toLocaleString('en-US');
  };

  
  // Calculate combined costs
  const combinedAverageCost = sumCosts(
    cubeRes?.averageCost,
    sfResults?.averageCost
  );

  const calculateWeeks = () => {
    if (!combinedAverageCost || !weeklyIncome) return 'NA';
    
    const totalCost = Number(combinedAverageCost.replace(/,/g, ''));
    const income = Number(weeklyIncome.replace(/,/g, ''));
    const incomeinB = income * 1000000000

    if (isNaN(totalCost) || isNaN(incomeinB) || income === 0) return 'NA';
    
    const weeks = totalCost / incomeinB;
    return weeks.toFixed(1);
  };

  const weeksNeeded = calculateWeeks();
  
  // Format the combined costs
  const averageCostDisplay = transformAndFormat(combinedAverageCost);
  const [totalBooms, setTotalBooms] = useState(sfResults?.averageBooms || 1);
  
  useEffect(() => {
    setTotalBooms(sfResults?.averageBooms);
  }, [sfResults]);

  return (
    <div className="flex w-full">
      <div className="flex w-full border rounded-[8px] p-[12px] gap-[16px] border-red-500 bg-red-50 justify-between">
        <div className="flex flex-col justify-between h-full w-full">
          <h5 className="opacity-60">Total Average Cost</h5>
          <h3 className="flex font-bold w-full justify-end items-end">
            {averageCostDisplay}
          </h3>
        </div>
        <div className="h-full w-[1px] opacity-20 bg-black" />
        <div className="flex flex-col justify-between h-full w-full">
          <h5 className="opacity-60">Average Spares</h5>
          <h3 className="flex font-bold w-full justify-end items-end">
            {totalBooms}
          </h3>
        </div>
        <div className="h-full w-[1px] opacity-20 bg-black" />
        <div className="flex flex-col justify-between h-full w-full">
          <h5 className="opacity-60">weeks</h5>
          <h3 className="flex font-bold w-full justify-end items-end">
            {weeksNeeded}
          </h3>
        </div>
      </div>
    </div>
  );
}
