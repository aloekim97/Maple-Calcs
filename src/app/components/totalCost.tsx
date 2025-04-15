import { SfCost } from './starForceRes';

export default function TotalCost({ sfResults }: SfCost) {
  return (
    <div className="flex w-full flex-col border rounded-[8px] p-[12px] gap-[4px]">
      <h4>Total Cost</h4>
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
          140 B
        </p>
        <h4 className="flex justify-start h-full w-full items-center">
          Lucky:
        </h4>
        <p className="font-normal flex justify-end h-full w-full items-center">
          140 B
        </p>
      </div>
      <div className="flex justify-between">
        <h4 className="flex justify-start h-full w-full items-center">
          Average Spares:
        </h4>
        <p className="font-normal flex justify-end h-full w-full items-center">
          {sfResults?.averageBooms}
        </p>
      </div>
    </div>
  );
}
