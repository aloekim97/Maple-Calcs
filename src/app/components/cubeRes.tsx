export default function CubeCost() {
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
            140 B
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
