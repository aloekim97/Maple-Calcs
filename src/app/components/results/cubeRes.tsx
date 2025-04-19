import { PotCalcResult } from '@/app/formulas/cube/potentialprobability';

interface CubeRes {
  cubeRes:
    | (PotCalcResult & {
        luckyCost?: string;
        unluckyCost?: string;
        medianCost?: string;
      })
    | null;
}

export default function CubeCost({ cubeRes }: CubeRes) {
  const transformAndFormat = (
    costString: string | null | undefined
  ): string => {
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

    return transformed.toFixed(1).replace(/\.?0+$/, '') + suffix;
  };

  const averageCostDisplay = transformAndFormat(cubeRes?.averageCost);
  const unlucky = transformAndFormat(cubeRes?.unluckyCost);
  const lucky = transformAndFormat(cubeRes?.luckyCost);
  const median = transformAndFormat(cubeRes?.medianCost);

  return (
    <div className="flex w-full flex-col border border-[#00B188] bg-[#E6F8F4] rounded-[8px] p-[12px] gap-[4px]">
      <h5 className="opacity-60">Potential Cost</h5>
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
            {median === '0' ? '0' : averageCostDisplay}
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
