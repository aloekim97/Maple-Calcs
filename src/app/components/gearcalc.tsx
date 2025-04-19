'use client';
import StarForce from './inputs/starforceInputs';
import Cube, { CubeHandle } from './inputs/cubeInputs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ItemsPage from './itemlist';
import { useEffect, useState } from 'react';
import { Item } from '../../../types/item';
import { PotCalcResult } from '../formulas/cube/potentialprobability';
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
  cost?: number;
}
export interface Lines {
  first: string;
  second: string;
  third: string;
}
export interface potLines {
  line1: string;
  line2: string;
  line3: string;
}
// const getMaxStars = (level: number): number => {
//   if (level >= 138) return 30;
//   else if (level >= 128) return 20;
//   else if (level >= 118) return 15;
//   else if (level >= 108) return 10;
//   else if (level >= 95) return 8;
//   else return 5;
// };

export default function GearCalculator() {
  const [selectedGear, setSelectedGear] = useState<Item | null>(null);
  const [potLines, setPotLines] = useState<Lines | null>(null);
  const [endStar, setEndStar] = useState<string>('');
  const [cubeResults, setCubeResults] = useState<PotCalcResult | null>(null);
  const [sfResults, setSfResults] = useState<{
    cost: number;
    stats: SFStats | null;
  } | null>(null);
  const [setNumber, setSetNumber] = useState<string>('');
  const [setStats, setSetStats] = useState<SetData | null>(null);
  console.log(potLines)

  // Load all saved data from localStorage on component mount
  useEffect(() => {
    try {
      const savedGear = localStorage.getItem('selectedGear');
      if (savedGear) setSelectedGear(JSON.parse(savedGear));

      const savedPotLines = localStorage.getItem('potLines');
      if (savedPotLines) setPotLines(JSON.parse(savedPotLines));

      const savedEndStar = localStorage.getItem('endStar');
      if (savedEndStar) {
        const starNum = Number(savedEndStar);
        if (!isNaN(starNum)) {
          setEndStar(savedEndStar);
        }
      }

      const savedSetNumber = localStorage.getItem('setNumber');
      if (savedSetNumber) setSetNumber(savedSetNumber);
    } catch (error) {
      console.error('Failed to load from localStorage:', error);
    }
  }, []);

  // Save states to localStorage when they change
  useEffect(() => {
    if (selectedGear !== null) {
      localStorage.setItem('selectedGear', JSON.stringify(selectedGear));
    }
  }, [selectedGear]);

  useEffect(() => {
    if (endStar) {
      localStorage.setItem('endStar', endStar);
    }
  }, [endStar]);

  useEffect(() => {
    if (setNumber) {
      localStorage.setItem('setNumber', setNumber);
    }
  }, [setNumber]);

  // Validate endStar when gear changes
  useEffect(() => {
    if (selectedGear && endStar) {
      const starNum = Number(endStar);
      if (!isNaN(starNum)) {
        const maxStars = selectedGear.Set === 'Genesis' ? 22 : 30;
        if (starNum > maxStars) {
          setEndStar(maxStars.toString());
        }
      }
    }
  }, [selectedGear, endStar]);

  const calculateSFStats = (
    gear: Item | null,
    stars: string
  ): SFStats | null => {
    if (!gear || !stars || !gear.Level) return null;

    const starNum = Number(stars);
    if (isNaN(starNum)) return null;

    try {
      const starCount =
        gear.Set === 'Genesis' ? Math.min(starNum, 22) : Math.min(starNum, 30);
      const startStars = 0;
      const equipLevel = Number(gear.Level);
      const attackStat = gear.ATK || gear['M.ATK'] || '0';
      const weaponAtt = Number(attackStat) || 0;

      return itemStats(
        startStars,
        starCount,
        equipLevel,
        weaponAtt,
        gear.Type === 'Weapon' ? 'Weapon' : undefined
      );
    } catch (error) {
      console.error('Error calculating SF stats:', error);
      return null;
    }
  };

  // Reset related states when gear changes
  useEffect(() => {
    setSfResults(null);
    setCubeResults(null);
    if (!selectedGear) {
      setEndStar('');
    }
  }, [selectedGear]);

  // Calculate SF stats when gear or endStar changes
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

  // Calculate set stats
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
              />
            </div>
            <div className="w-full">
              <Cube
                selectedGear={selectedGear}
                setCubeResults={setCubeResults}
                setPotLines={setPotLines}
              />
            </div>
          </div>
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
