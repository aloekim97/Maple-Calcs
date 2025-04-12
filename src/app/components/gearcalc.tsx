'use client';
import StarForce, {
  StarForceHandle,
  StarForceResults,
} from './inputs/starforceInputs';
import Cube, { CubeHandle } from './inputs/cubeInputs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ItemsPage from './itemlist';
import { useEffect, useRef, useState } from 'react';
import { Item } from '../../../types/item';
import { Lines, PotCalcResult } from '../formulas/cube/potentialprobability';
import CubeCost from './results/cubeRes';
import SfCost from './starForceRes';
import GearRes from './results/gearRes';
import TotalCost from './totalCost';
import FdRes from './fdRes';
import { SetData } from '../../../types/set';
import sets from "../../../public/sets.json"


const getMaxStars = (level: number): number => {
  if (level >= 138) return 30;
  else if (level >= 128) return 20;
  else if (level >= 118) return 15;
  else if (level >= 108) return 10;
  else if (level >= 95) return 8;
  else return 5;
};

export default function GearCalculator() {
  const [selectedGear, setSelectedGear] = useState<Item | null>(null);
  const [cubeResults, setCubeResults] = useState<PotCalcResult | null>(null);
  const [sfResults, setSfResults] = useState<StarForceResults | null>(null);
  const [potLines, setPotLines] = useState<Lines | null>(null);
  const [endStar, setEndStar] = useState('');
  const starForceRef = useRef<StarForceHandle>(null);
  const cubeRef = useRef<CubeHandle>(null);
  const [setNumber, setSetNumber] = useState<string>('');
  const [setStats, setSetStats] = useState<SetData | null>(null);


  useEffect(() => {
    setSfResults(null);
    setCubeResults(null);
    setEndStar('');
  }, [selectedGear]);

  const handleCalculate = () => {
    starForceRef.current?.calculate();
    cubeRef.current?.calculate();
  };

  useEffect(() => {
    if (selectedGear?.Set && setNumber) {
      const setCount = parseInt(setNumber, 10);
      const isValidSetCount = !isNaN(setCount) && setCount > 0;
      const stats = isValidSetCount
        ? sets.find(s => 
            s.Set === selectedGear.Set && 
            s["Set Count"] === setCount
          )
        : null;
      setSetStats(stats || null);
    } else {
      setSetStats(null);
    }
  }, [selectedGear, setNumber]);

  return (
    <div className="flex flex-col w-[1440px] max-h-[946px] py-[16px] px-[64px] gap-[16px]">
      <div className="flex gap-[8px] h-[64px] w-full justify-center items-center">
        <Image
          src="image/geardiff.svg"
          width={172}
          height={32}
          alt="geardiff"
          role="img"
          style={{
            width: 'auto', 
            height: 'auto' 
          }}
        />
      </div>
      <div className="flex w-full gap-[32px]">
        <div className="flex flex-col w-full gap-[32px]">
          <div className="flex w-full overflow-hidden h-[280px] bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]">
            <ItemsPage 
              setSelectedGear={setSelectedGear}
              setNumber={setNumber}
              setSetNumber={setSetNumber}
            />
          </div>
          <div className="flex w-full gap-[32px]">
            <div className="w-full">
              <StarForce
                selectedGear={selectedGear}
                setEndStar={setEndStar}
                setSfRes={setSfResults}
                ref={starForceRef}
              />
            </div>
            <div className="w-full">
              <Cube
                selectedGear={selectedGear}
                setCubeResults={setCubeResults}
                setPotLines={setPotLines}
                ref={cubeRef}
              />
            </div>
          </div>
          <Button onClick={handleCalculate}>Calculate</Button>
        </div>
        <div className="flex flex-col w-full bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] p-[16px] gap-[16px]">
          <div className="flex w-full gap-[16px] rounded-[8px] border grow">
            {selectedGear ? (
              <GearRes
                selectedGear={selectedGear}
                endStar={endStar}
                potLines={potLines}
                sfStats={sfResults?.stats}
                setNumber={setNumber}
                setStats={setStats}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p>Select an item to view details</p>
              </div>
            )}
          </div>
          <div className="flex w-full gap-[16px]">
            <SfCost sfResults={sfResults} />
            <CubeCost cubeRes={cubeResults} />
          </div>
          <div className="flex w-full gap-[16px]">
            <TotalCost cubeRes={cubeResults} />
            <div className="flex w-full border rounded-[8px] p-[12px] gap-[16px] justify-between">
              <div className="flex flex-col justify-between h-full w-full">
                <h5 className="opacity-60">Average Spares</h5>
                  <h2 className="flex font-bold w-full justify-end items-end">
                    40
                  </h2>
              </div>
              <div className='h-full w-[1px] opacity-20 bg-black'/>
              <div className="flex flex-col justify-between h-full w-full">
                <h5 className="opacity-60">Meso/1FD</h5>
                  <h2 className="flex font-bold w-full justify-end items-end">
                    ~10B
                  </h2>
              </div>
            </div>
          </div>
            <FdRes 
              setStats={setStats} 
              selectedGear={selectedGear} 
              sfResults={sfResults}
            />
        </div>
      </div>
    </div>
  );
}
