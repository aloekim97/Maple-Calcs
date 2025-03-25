import { useState } from 'react';
import itemStats from '../formulas/itemstats';
import { calculateKMS } from '../formulas/starforceCalc';
import { potCalc, PotCalcResult } from '../formulas/potentialcalc';

export default function GearCalculator() {
  // Star Force state
  const [starInputs, setStarInputs] = useState({
    itemLevel: '',
    startStar: '',
    endStar: ''
  });

  // Potential state
  const [potentialInputs, setPotentialInputs] = useState({
    itemType: 'hat',
    potentialType: 'stat',
    goal: '30',
    cubeType: 'black',
    itemLevel: ''
  });

  // Results state
  const [results, setResults] = useState<{
    starForce?: {
      averageCost: string;
      averageBooms: string;
      luckyCost: string;
      unluckyCost: string;
      stats: {
        finalStats: { stat: number; att: number };
        difference: { stat: number; att: number };
      };
    };
    potential?: PotCalcResult;
  }>({});

  const handleStarInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStarInputs(prev => ({ ...prev, [name]: value }));
  };

  const handlePotentialInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPotentialInputs(prev => ({ ...prev, [name]: value }));
  };

  const calculateStarForce = () => {
    const itemLevelNum = Number(starInputs.itemLevel);
    const startStarNum = Number(starInputs.startStar);
    const endStarNum = Number(starInputs.endStar);
    
    if (!itemLevelNum || isNaN(startStarNum) || isNaN(endStarNum)) {
      alert('Please fill all Star Force fields');
      return;
    }

    const starForceResult = calculateKMS(startStarNum, endStarNum, itemLevelNum);
    const statsResult = itemStats(startStarNum, endStarNum, itemLevelNum);

    setResults(prev => ({
      ...prev,
      starForce: {
        ...starForceResult,
        stats: statsResult
      }
    }));
  };

  const calculatePotential = () => {
    const itemLevelNum = Number(potentialInputs.itemLevel);
    const goalNum = Number(potentialInputs.goal);

    if (!itemLevelNum || isNaN(goalNum)) {
      alert('Please fill all Potential fields');
      return;
    }

    const potentialResult = potCalc(
      potentialInputs.itemType as 'hat',
      itemLevelNum,
      potentialInputs.potentialType as 'stat',
      goalNum,
      potentialInputs.cubeType as 'black'
    );

    setResults(prev => ({
      ...prev,
      potential: potentialResult
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">MapleStory Gear Calculator</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Star Force Section (Left) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Star Force Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Level</label>
              <input
                type="number"
                name="itemLevel"
                value={starInputs.itemLevel}
                onChange={handleStarInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. 150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Start Star</label>
              <input
                type="number"
                name="startStar"
                value={starInputs.startStar}
                onChange={handleStarInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. 0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">End Star</label>
              <input
                type="number"
                name="endStar"
                value={starInputs.endStar}
                onChange={handleStarInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. 15"
              />
            </div>

            <button
              onClick={calculateStarForce}
              className="mt-2 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            >
              Calculate Star Force
            </button>
          </div>

          {results.starForce && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-lg">Star Force Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Average Cost:</strong></p>
                  <p>{results.starForce.averageCost}</p>
                </div>
                <div>
                  <p><strong>Average Booms:</strong></p>
                  <p>{results.starForce.averageBooms}</p>
                </div>
                <div>
                  <p><strong>Lucky Cost:</strong></p>
                  <p>{results.starForce.luckyCost}</p>
                </div>
                <div>
                  <p><strong>Unlucky Cost:</strong></p>
                  <p>{results.starForce.unluckyCost}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium">Stat Differences</h3>
                <div className="grid grid-cols-2 gap-4 mt-2">
                  <div>
                    <p><strong>Final Stats:</strong></p>
                    <p>ATK: {results.starForce.stats.finalStats.att}</p>
                    <p>STAT: {results.starForce.stats.finalStats.stat}</p>
                  </div>
                  <div>
                    <p><strong>Difference:</strong></p>
                    <p>ATK: +{results.starForce.stats.difference.att}</p>
                    <p>STAT: +{results.starForce.stats.difference.stat}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Potential Section (Right) */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Potential Calculator</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Item Level</label>
              <input
                type="number"
                name="itemLevel"
                value={potentialInputs.itemLevel}
                onChange={handlePotentialInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. 150"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Item Type</label>
              <select
                name="itemType"
                value={potentialInputs.itemType}
                onChange={handlePotentialInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="hat">Hat</option>
                <option value="top">Top</option>
                <option value="bottom">Bottom</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Potential Type</label>
              <select
                name="potentialType"
                value={potentialInputs.potentialType}
                onChange={handlePotentialInputChange}
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
                value={potentialInputs.goal}
                onChange={handlePotentialInputChange}
                className="w-full p-2 border rounded"
                placeholder="e.g. 30"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Cube Type</label>
              <select
                name="cubeType"
                value={potentialInputs.cubeType}
                onChange={handlePotentialInputChange}
                className="w-full p-2 border rounded"
              >
                <option value="black">Black Cube</option>
                <option value="red">Red Cube</option>
              </select>
            </div>

            <button
              onClick={calculatePotential}
              className="mt-2 p-3 bg-blue-600 text-white rounded hover:bg-blue-700 w-full"
            >
              Calculate Potential
            </button>
          </div>

          {results.potential && (
            <div className="mt-6 space-y-4">
              <h3 className="font-medium text-lg">Potential Results</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p><strong>Average Cost:</strong></p>
                  <p>{results.potential.averageCost} mesos</p>
                </div>
                <div>
                  <p><strong>Success Chance:</strong></p>
                  <p>{(results.potential.totalProbability * 100).toFixed(6)}%</p>
                </div>
                <div>
                  <p><strong>Average Attempts:</strong></p>
                  <p>{results.potential.averageTry.toFixed(1)}</p>
                </div>
              </div>

              <div className="mt-4">
                <h3 className="font-medium">Valid Combinations</h3>
                <div className="max-h-60 overflow-y-auto mt-2 border rounded p-2">
                  {results.potential.combinations.map((combo, i) => (
                    <div key={i} className="py-1 border-b last:border-b-0">
                      Line 1: {combo.line1}, Line 2: {combo.line2}, Line 3: {combo.line3}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}