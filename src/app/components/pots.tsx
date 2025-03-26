'use client';
import { useState } from 'react';
import { potCalc } from '../formulas/potentialcalc';
import { PotCalcResult } from '../formulas/cube/cubeprob';

export default function Cube() {
  const [inputs, setInputs] = useState({
    itemType: 'hat',
    potentialType: 'stat',
    goal: '30',
    cubeType: 'black',
    itemLevel: '',
  });

  const [results, setResults] = useState<PotCalcResult>();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const itemLevelNum = Number(inputs.itemLevel);
    const goalNum = Number(inputs.goal);

    if (!itemLevelNum || isNaN(goalNum)) {
      alert('Please fill all fields');
      return;
    }

    const potentialResult = potCalc(
      inputs.itemType as 'hat',
      itemLevelNum,
      inputs.potentialType as 'stat',
      goalNum,
      inputs.cubeType as 'black'
    );

    setResults(potentialResult);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border">
      <h2 className="text-xl font-semibold mb-4">Potential Calculator</h2>
      <div className="space-y-4">
        {/* Input fields */}
        <div>
          <label className="block text-sm font-medium mb-1">Item Level</label>
          <input
            type="number"
            name="itemLevel"
            value={inputs.itemLevel}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. 150"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Item Type</label>
          <select
            name="itemType"
            value={inputs.itemType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="hat">Hat</option>
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Potential Type
          </label>
          <select
            name="potentialType"
            value={inputs.potentialType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="stat">Stat%</option>
            <option value="cooldown">Cooldown Reduction</option>
            <option value="critDamage">Critical Damage</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Goal Value</label>
          <input
            type="number"
            name="goal"
            value={inputs.goal}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
            placeholder="e.g. 30"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Cube Type</label>
          <select
            name="cubeType"
            value={inputs.cubeType}
            onChange={handleInputChange}
            className="w-full p-2 border rounded"
          >
            <option value="black">Black Cube</option>
            <option value="red">Red Cube</option>
          </select>
        </div>

        <button
          onClick={calculate}
          className="mt-2 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
        >
          Calculate Potential
        </button>

        {results && (
          <div className="mt-6 space-y-4">
            <h3 className="font-medium text-lg">Potential Results</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p>
                  <strong>Average Cost:</strong>
                </p>
                <p>{results.averageCost} mesos</p>
              </div>
              <div>
                <p>
                  <strong>Success Chance:</strong>
                </p>
                <p>{(results.totalProbability * 100).toFixed(6)}%</p>
              </div>
              <div>
                <p>
                  <strong>Average Attempts:</strong>
                </p>
                <p>{results.averageTry.toFixed(1)}</p>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="font-medium">Valid Combinations</h3>
              <div className="max-h-60 overflow-y-auto mt-2 border rounded p-2">
                {results.combinations.map((combo, i) => (
                  <div key={i} className="py-1 border-b last:border-b-0">
                    Line 1: {combo.line1}, Line 2: {combo.line2}, Line 3:{' '}
                    {combo.line3}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
