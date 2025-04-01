'use client';
import { useState } from 'react';
import itemStats from '../formulas/sf/itemstats';
import { calculateKMS } from '../formulas/starforceCalc';
import { Input } from "@/components/ui/input"
import { Button } from '@/components/ui/button';

export default function StarForce() {
  const [inputs, setInputs] = useState({
    itemLevel: '',
    startStar: '',
    endStar: '',
  });

  const [results, setResults] = useState<{
    averageCost: string;
    averageBooms: string;
    luckyCost: string;
    unluckyCost: string;
    stats: {
      finalStats: { stat: number; att: number };
      difference: { stat: number; att: number };
    };
  }>();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const itemLevelNum = Number(inputs.itemLevel);
    const startStarNum = Number(inputs.startStar);
    const endStarNum = Number(inputs.endStar);

    if (!itemLevelNum || isNaN(startStarNum) || isNaN(endStarNum)) {
      alert('Please fill all fields');
      return;
    }

    const starForceResult = calculateKMS(
      startStarNum,
      endStarNum,
      itemLevelNum
    );
    const statsResult = itemStats(startStarNum, endStarNum, itemLevelNum);

    setResults({
      ...starForceResult,
      stats: statsResult,
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border h-full w-full                                              ">
      <h2 className="text-xl font-semibold mb-4">Star Force Calculator</h2>
      <div className="space-y-4">
        {/* Input fields */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Level</label>
          <Input
            type="number"
            name="itemLevel"
            value={inputs.itemLevel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. 150"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
              margin: 0
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Start Star</label>
          <Input
            type="number"
            name="startStar"
            value={inputs.startStar}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. 0"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
              margin: 0
            }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">End Star</label>
          <Input
            type="number"
            name="endStar"
            value={inputs.endStar}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. 15"
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
              margin: 0
            }}
          />
        </div>

        <Button
          onClick={calculate}
          className="mt-2 p-3 text-white rounded w-full"
        >
          Calculate Star Force
        </Button>

        {results && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-lg">Star Force Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Average Cost:</strong>
                </p>
                <p>{results.averageCost}</p>
              </div>
              <div>
                <p>
                  <strong>Average Booms:</strong>
                </p>
                <p>{results.averageBooms}</p>
              </div>
              <div>
                <p>
                  <strong>Lucky Cost:</strong>
                </p>
                <p>{results.luckyCost}</p>
              </div>
              <div>
                <p>
                  <strong>Unlucky Cost:</strong>
                </p>
                <p>{results.unluckyCost}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">Stat Differences</h3>
              <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                  <p>
                    <strong>Final Stats:</strong>
                  </p>
                  <p>ATK: {results.stats.finalStats.att}</p>
                  <p>STAT: {results.stats.finalStats.stat}</p>
                </div>
                <div>
                  <p>
                    <strong>Difference:</strong>
                  </p>
                  <p>ATK: +{results.stats.difference.att}</p>
                  <p>STAT: +{results.stats.difference.stat}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
