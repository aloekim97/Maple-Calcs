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

  useEffect(() => {
    setSfResults(null);
    setCubeResults(null);
    setEndStar('');
  }, [selectedGear]);

  const handleCalculate = () => {
    starForceRef.current?.calculate();
    cubeRef.current?.calculate();
  };
  return (
    <div className="flex flex-col w-[1440px] h-[924px] py-[32px] gap-[32px]">
      <div className="flex gap-[8px] h-[64px] w-full justify-center items-center">
        <Image
          src="image/geardiff.svg"
          width={22}
          height={24}
          alt="geardiff"
          role="img"
          style={{
            width: 'auto', 
            height: 'auto' 
          }}
        />
        <h2 className="">Gear Diff</h2>
      </div>
      <div className="flex grow h-full gap-[32px]">
        <div className="flex flex-col w-full gap-[32px]">
          <div className="flex w-full h-[640px] overflow-hidden bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]">
            <ItemsPage setSelectedGear={setSelectedGear} />
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
        <div className="flex flex-col w-full h-full bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] p-[16px] gap-[16px]">
          <div className="flex w-full h-full gap-[16px] rounded-[8px] border grow">
            {selectedGear ? (
              <GearRes
                selectedGear={selectedGear}
                endStar={endStar}
                potLines={potLines}
                sfStats={sfResults?.stats}
              />
            ) : (
              <div className="flex items-center justify-center w-full h-full">
                <p>Select an item to view details</p>
              </div>
            )}
          </div>
          <div className="flex w-full h-full gap-[16px]">
            <SfCost sfResults={sfResults} />
            <CubeCost cubeRes={cubeResults} />
          </div>
          <div className="flex w-full h-full gap-[16px]">
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
                  40
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col border rounded-[8px] p-[12px] gap-[4px] justify-between">
              <h4 className="opacity-60">Meso/1FD</h4>
              <div className="flex flex-col w-full h-full justify-end items-end">
                <h1 className="flex text-[72px] leading-[72px] font-bold w-full justify-end items-end">
                  ~10B
                </h1>
              </div>
            </div>
          </div>
          <div className="flex w-full h-full gap-[16px] border p-[12px] rounded-[8px]">
            <h4 className="opacity-60">FD</h4>
            <div className="flex flex-col w-full h-full justify-end items-end">
              <h1 className="flex text-[72px] leading-[72px] font-bold w-full justify-end items-end">
                ~20.1%
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
