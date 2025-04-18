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
import sets from '../../../public/sets.json';
import itemStats from '../formulas/sf/itemstats';
import Link from 'next/link';

interface SFStats {
  hp?: number;
  endStar?: number;
  difference: {
    stat: number;
    att: number;
  };
}

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
  const [sfResults, setSfResults] = useState<{
    cost: any;
    stats: SFStats | null;
  } | null>(null);
  const [potLines, setPotLines] = useState<Lines | null>(null);
  const [endStar, setEndStar] = useState('');
  const starForceRef = useRef<StarForceHandle>(null);
  const cubeRef = useRef<CubeHandle>(null);
  const [setNumber, setSetNumber] = useState<string>('');
  const [setStats, setSetStats] = useState<SetData | null>(null);

  const calculateSFStats = (
    gear: Item | null,
    stars: string
  ): SFStats | null => {
    if (!gear || !stars) return null;

    const starNum = Number(stars);
    if (isNaN(starNum)) return null;

    const starCount = gear.Set === 'Genesis' ? 22 : Math.min(starNum, 30);
    const startStars = 0;
    const equipLevel = Number(gear.Level);
    const attackStat = gear.ATK === '' ? gear['M.ATK'] : gear.ATK;
    const weaponAtt = Number(attackStat) || 0;

    return itemStats(
      startStars,
      starCount,
      equipLevel,
      weaponAtt,
      gear.Type === 'Weapon' ? 'Weapon' : undefined
    );
  };

  useEffect(() => {
    setSfResults(null);
    setCubeResults(null);
    setEndStar('');
  }, [selectedGear]);

  useEffect(() => {
    if (selectedGear && endStar) {
      const stats = calculateSFStats(selectedGear, endStar);
      setSfResults((prev) => ({
        ...(prev || { cost: null }),
        stats: stats,
      }));
    } else {
      setSfResults((prev) => ({
        ...(prev || { cost: null }),
        stats: null,
      }));
    }
  }, [selectedGear, endStar]);

  useEffect(() => {
    if (selectedGear?.Set && setNumber) {
      const setCount = parseInt(setNumber, 10);
      const isValidSetCount = !isNaN(setCount) && setCount > 0;
      const stats = isValidSetCount
        ? sets.find(
            (s) => s.Set === selectedGear.Set && s['Set Count'] === setCount
          )
        : null;
      setSetStats(stats || null);
    } else {
      setSetStats(null);
    }
  }, [selectedGear, setNumber]);

  const handleCalculate = () => {
    starForceRef.current?.calculate();
    cubeRef.current?.calculate();
  };

  return (
    <div className="flex flex-col w-[1440px] max-h-[800px] py-[16px] px-[64px] gap-[16px]">
      <div className="flex gap-[8px] h-[64px] w-full justify-between items-center">
        <div className="w-[196px]" />
        <Image
          src="image/geardiff.svg"
          width={172}
          height={32}
          alt="geardiff"
          role="img"
          style={{
            width: 'auto',
            height: 'auto',
          }}
        />
        <div className="flex gap-[4px]">
          <Link
            href={'/about'}
            className="flex h-[40px] w-[96px] items-center justify-center opacity-60 hover:opacity-80 hover:cursor-pointer hover:bg-[#00000010] px-[24px] rounded-full"
          >
            <p className="leading-[16px] text-[16px] font-semibold">About</p>
          </Link>
          <Link
            href={'/about'}
            className="flex h-[40px] w-[96px] items-center justify-center opacity-60 hover:opacity-80 hover:cursor-pointer hover:bg-[#00000010] px-[24px] rounded-full"
          >
            <p className="leading-[16px] text-[16px] font-semibold">Donate</p>
          </Link>
        </div>
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
                setEndStar={(stars) => {
                  setEndStar(stars);
                  if (selectedGear) {
                    setSfResults((prev) => ({
                      ...prev,
                      stats: calculateSFStats(selectedGear, stars),
                    }));
                  }
                }}
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
                <h4 className="opacity-60">Select an item to view details</h4>
              </div>
            )}
          </div>
          <div className="flex w-full gap-[16px]">
            <SfCost sfResults={sfResults} />
            <CubeCost cubeRes={cubeResults} />
          </div>
          <div className="flex w-full gap-[16px]">
            <TotalCost cubeRes={cubeResults} sfResults={sfResults} />
            <div className="flex w-full border rounded-[8px] p-[12px] gap-[16px] border-red-500 bg-red-50  justify-between">
              <div className="flex flex-col justify-between h-full w-full">
                <h5 className="opacity-60">Average Spares</h5>
                <h2 className="flex font-bold w-full justify-end items-end">
                  40
                </h2>
              </div>
              <div className="h-full w-[1px] opacity-20 bg-black" />
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
            potLines={potLines}
            sfStats={
              sfResults?.stats || calculateSFStats(selectedGear, endStar)
            }
          />
        </div>
      </div>
    </div>
  );
}
