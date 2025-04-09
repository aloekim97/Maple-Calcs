import { StarForceResults } from './inputs/starforceInputs';

interface SfCost {
  sfResults: StarForceResults | null;
}

export default function SfCost({ sfResults }: SfCost) {
  const transformAndFormat = (
    costString: string | null | undefined
  ): string => {
    const num = Number(costString?.replace(/,/g, ''));

    if (isNaN(num)) return 'NA';
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
      return num.toLocaleString();
    }

    return transformed.toFixed(2).replace(/\.?0+$/, '') + suffix;
  };

  const averageCostDisplay = transformAndFormat(sfResults?.averageCost);
  const unlucky = transformAndFormat(sfResults?.unluckyCost);
  const lucky = transformAndFormat(sfResults?.luckyCost);
  const median = transformAndFormat(sfResults?.medianCost);
  return (
    <div className="flex w-full flex-col border border-[#FFCC02] bg-[#FFFAE6] rounded-[8px] p-[12px] gap-[4px]">
      <h4>Starforce Cost</h4>
      <div className="flex flex-col w-full h-full">
        <div className="grid grid-cols-4 w-full h-full gap-x-[16px] gap-y-[4px] items-center">
          <h4 className="flex justify-start h-full w-full items-center">
            Median:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            {median}
          </p>
          <h4 className="flex justify-start h-full w-full items-center">
            Unlucky:
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
            Lucky:
          </h4>
          <p className="font-normal flex justify-end h-full w-full items-center">
            {lucky}
          </p>
        </div>
      </div>
    </div>
  );
}
