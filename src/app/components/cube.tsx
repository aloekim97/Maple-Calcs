'use client';
import { useState } from 'react';
import { potCalc } from '../formulas/potentialcalc';
import { PotCalcResult } from '../formulas/cube/comboprobability';
import {
  ITEM_PROBABILITIES,
  WSE_PROBABILITIES,
} from '../formulas/cube/potentialprobability';
import { getGoalOptions } from '../formulas/cube/potentialdropdown';

export default function Cube() {
  const allItemTypes = { ...ITEM_PROBABILITIES, ...WSE_PROBABILITIES };
  const [inputs, setInputs] = useState({
    itemType: 'hat',
    goal: '',
    cubeType: 'black',
    itemLevel: '150',
  });

  const handleGoalChange = (e: any) => {
    const selectedValue = JSON.parse(e.target.value);
    setSelectedGoal(selectedValue);
  };

  const [results, setResults] = useState<PotCalcResult>();
  const goalOptions = getGoalOptions(inputs.itemType, Number(inputs.itemLevel));
  const [selectedGoal, setSelectedGoal] = useState(
    goalOptions ? Object.values(goalOptions)[0] : null
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    const itemLevelNum = Number(inputs.itemLevel);

    const potentialResult = potCalc(
      itemLevelNum,
      selectedGoal,
      inputs.cubeType
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
            style={{
              WebkitAppearance: 'none',
              MozAppearance: 'textfield',
              margin: 0,
            }}
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
            {Object.keys(allItemTypes).map((itemType) => (
              <option key={itemType} value={itemType}>
                {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Goal Value</label>
          <select
            name="goal"
            value={JSON.stringify(selectedGoal)} // Ensure controlled input
            onChange={handleGoalChange}
            className="w-full p-2 border rounded"
          >
            {Object.entries(goalOptions).map(([label, value]) => (
              <option key={label} value={JSON.stringify(value)}>
                {label}
              </option>
            ))}
          </select>
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
