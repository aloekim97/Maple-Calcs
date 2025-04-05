import { PotCalcResult } from '../formulas/cube/potentialprobability';

interface CubeRes {
  cubeRes: PotCalcResult | null;
}

export default function CubeCost({ cubeRes }: CubeRes) {
  const transformAndFormat = (costString: string | null | undefined): string => {
    // Remove all commas and convert to number
    const num = Number(costString?.replace(/,/g, ''));

    if (isNaN(num)) return 'NA'; // Handle NaN cases
    if (num === Infinity) return '∞';

    let transformed: number;
    let suffix: string = '';

    if (num >= 1_000_000_000_000) {
      transformed = num / 1_000_000_000;
      suffix = 'T';
    } else if (num >= 1_000_000_000) {
      transformed = num / 1_000_000_000;
      suffix = 'B';
    } else if (num >= 1_000_000) {
      transformed = num / 1_000_000;
      suffix = 'M';
    } else {
      return num.toLocaleString(); // Format regular numbers with commas
    }

    // Format to 3 decimal places, remove trailing zeros, and add suffix
    return transformed.toFixed(3).replace(/\.?0+$/, '') + suffix;
  };

  // Usage with your cubeRes.averageCost string:
  const averageCostDisplay = transformAndFormat(cubeRes?.averageCost);

  return (
    <div className="flex w-full flex-col border border-[#00B188] bg-[#E6F8F4] rounded-[8px] p-[12px] gap-[4px]">
      <h4>Potential Cost</h4>
      <div className="flex flex-col w-full h-full">
        <div className="grid grid-cols-4 w-full h-full gap-x-[16px] gap-y-[4px] items-center">
          <h4 className="flex justify-start h-full w-full items-center">
            Median:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            140 B
          </p>
          <h4 className="flex justify-start h-full w-full items-center">
            Unlucky:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            140 B
          </p>
          <h4 className="flex justify-start h-full w-full items-center">
            Average:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            {averageCostDisplay}
          </p>
          <h4 className="flex justify-start h-full w-full items-center">
            Lucky:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            140 B
          </p>
        </div>
      </div>
    </div>
  );
}
