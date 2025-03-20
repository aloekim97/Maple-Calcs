import { useState } from 'react';
import itemStats from '../formulas/itemstats';
import { calculateKMS } from '../formulas/starforceCalc';
import cubeCalc from '../formulas/cubecalc';

export default function StarForce() {
  const [itemLevel, setItemLevel] = useState<string>('');
  const [startStar, setStartStar] = useState<string>('');
  const [endStar, setEndStar] = useState<string>('');
  // const [charStat, setCharStat] = useState<string>('');
  // const [charatt, setCharAtt] = useState<string>('');
  const cube = cubeCalc(30, 150, "hat", 'black')
  const [kms, setKms] = useState<{
    averageCost: string;
    averageBooms: string;
    luckyCost: string;
    unluckyCost: string;
  }>({
    averageCost: '0',
    averageBooms: '0',
    luckyCost: '0',
    unluckyCost: '0',
  });

  const [stars, setStars] = useState<{
    finalStats: { stat: number; att: number };
    difference: { stat: number; att: number };
  }>({
    finalStats: { stat: 0, att: 0 },
    difference: { stat: 0, att: 0 },
  });

  function calc() {
    const itemLevelNum = Number(itemLevel);
    const startStarNum = Number(startStar);
    const endStarNum = Number(endStar);

    const kmsResult = calculateKMS(startStarNum, endStarNum, itemLevelNum);
    setKms(kmsResult);

    const statsResult = itemStats(startStarNum, endStarNum, itemLevelNum);
    setStars(statsResult);
  }

  return (
    <div className="flex w-full p-4 border">
      <div className="flex flex-row space-x-4">
          
        {/* <div className="border">
          <div>Main Stat</div>
          <input
            type="number"
            onChange={(e) => setCharStat(e.target.value)}
            value={charStat}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex-1">
          <div>Attack Value</div>
          <input
            type="number"
            onChange={(e) => setCharAtt(e.target.value)}
            value={charatt}
            className="w-full p-2 border rounded"
          />
        </div> */}

        <div className="flex-1">
          <div>Item Level</div>
          <input
            type="number"
            onChange={(e) => setItemLevel(e.target.value)}
            value={itemLevel}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex-1">
          <div>Start Star</div>
          <input
            type="number"
            onChange={(e) => setStartStar(e.target.value)}
            value={startStar}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex-1">
          <div>End Star</div>
          <input
            type="number"
            onChange={(e) => setEndStar(e.target.value)}
            value={endStar}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>

      <button
        onClick={calc}
        className="mt-4 p-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-[30px]"
      >
        Calc
      </button>

      <div className="mt-4 p-4 border rounded">
        <div className="font-bold">KMS odds</div>
        <div>
          <strong>Average Cost:</strong> {kms.averageCost}
        </div>
        <div>
          <strong>Average Booms:</strong> {kms.averageBooms}
        </div>
        <div>
          <strong>Lucky Cost:</strong> {kms.luckyCost}
        </div>
        <div>
          <strong>Unlucky Cost:</strong> {kms.unluckyCost}
        </div>
      </div>

      <div className="mt-4 p-4 border rounded">
        <div>att final: {stars.finalStats.att}</div>
        <div>att diff: {stars.difference.att}</div>
        <div>stat final: {stars.finalStats.stat}</div>
        <div>stat diff: {stars.difference.stat}</div>
      </div>
    </div>
  );
}
