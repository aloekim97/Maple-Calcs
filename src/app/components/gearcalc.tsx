'use client';
import { useEffect, useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import StarForce, { StarForceResults } from './inputs/starforceInputs';
import Cube from './inputs/cubeInputs';
import ItemsPage from './itemlist';
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

// Type definitions
export interface SFStats {
  hp?: number;
  endStar?: number;
  difference: {
    stat: number;
    att: number;
  };
  cost?: number;
}

export interface PotLines {
  line1?: { [stat: string]: number };
  line2?: { [stat: string]: number };
  line3?: { [stat: string]: number };
}

const MAX_STARS_REGULAR = 30;
const MAX_STARS_GENESIS = 22;

export default function GearCalculator() {
  const [selectedGear, setSelectedGear] = useState<Item | null>(null);
  const [potLines, setPotLines] = useState<PotLines | null>(null);
  const [endStar, setEndStar] = useState<string>('');
  const [cubeResults, setCubeResults] = useState<PotCalcResult | null>(null);
  const [sfResults, setSfResults] = useState<StarForceResults | null>(null);
  const [setNumber, setSetNumber] = useState<string>('');
  const [setStats, setSetStats] = useState<SetData | null>(null);

  const currentSfStats = useMemo(() => {
    if (!selectedGear || !endStar || !selectedGear.Level) return null;

    const starNum = Number(endStar);
    if (isNaN(starNum)) return null;

    try {
      const maxStars =
        selectedGear.Set === 'Genesis' ? MAX_STARS_GENESIS : MAX_STARS_REGULAR;
      const starCount = Math.min(starNum, maxStars);
      const attackStat = selectedGear.ATK || selectedGear['M.ATK'] || '0';
      const weaponAtt = Number(attackStat) || 0;

      return itemStats(
        0,
        starCount,
        Number(selectedGear.Level),
        weaponAtt,
        selectedGear.Type === 'Weapon' ? 'Weapon' : undefined
      );
    } catch (error) {
      console.error('Error calculating SF stats:', error);
      return null;
    }
  }, [selectedGear, endStar]);

  useEffect(() => {
    const loadFromLocalStorage = () => {
      try {
        const savedGear = localStorage.getItem('selectedGear');
        if (savedGear) setSelectedGear(JSON.parse(savedGear));

        const savedPotLines = localStorage.getItem('potLines');
        if (savedPotLines) setPotLines(JSON.parse(savedPotLines));

        const savedEndStar = localStorage.getItem('endStar');
        if (savedEndStar && !isNaN(Number(savedEndStar))) {
          setEndStar(savedEndStar);
        }

        const savedSetNumber = localStorage.getItem('setNumber');
        if (savedSetNumber) setSetNumber(savedSetNumber);
      } catch (error) {
        console.error('Failed to load from localStorage:', error);
      }
    };

    loadFromLocalStorage();
  }, []);

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

  useEffect(() => {
    if (selectedGear && endStar) {
      const starNum = Number(endStar);
      if (!isNaN(starNum)) {
        const maxStars =
          selectedGear.Set === 'Genesis'
            ? MAX_STARS_GENESIS
            : MAX_STARS_REGULAR;
        if (starNum > maxStars) {
          setEndStar(maxStars.toString());
        }
      }
    }
  }, [selectedGear, endStar]);

  useEffect(() => {
    setSfResults((prev) => ({
      ...(prev || { cost: null }),
      stats: currentSfStats,
    }));
  }, [currentSfStats]);

  useEffect(() => {
    if (!selectedGear?.Set || !setNumber) {
      setSetStats(null);
      return;
    }

    const setCount = parseInt(setNumber, 10);
    if (isNaN(setCount) || setCount <= 0) {
      setSetStats(null);
      return;
    }

    const stats = sets.find(
      (s) => s.Set === selectedGear.Set && s['Set Count'] === setCount
    );
    setSetStats(stats || null);
  }, [selectedGear, setNumber]);

  const handleGearChange = useCallback((gear: Item | null) => {
    setSelectedGear(gear);
    setSfResults(null);
    setCubeResults(null);
    if (!gear) {
      setEndStar('');
    }
  }, []);

  const handleStarChange = useCallback(
    (stars: string) => {
      setEndStar(stars);
      if (selectedGear) {
        setSfResults((prev) => ({
          ...prev,
          stats: currentSfStats,
        }));
      }
    },
    [selectedGear, currentSfStats]
  );

  return (
    <div className="flex flex-col w-[1440px] max-h-[800px] py-4 px-16 gap-4">
      <Header />

      <div className="flex w-full gap-8">
        <div className="flex flex-col w-full gap-8">
          <ItemsContainer>
            <ItemsPage
              setSelectedGear={handleGearChange}
              setNumber={setNumber}
              setSetNumber={setSetNumber}
            />
          </ItemsContainer>

          <div className="flex w-full gap-8">
            <StarForceContainer>
              <StarForce
                selectedGear={selectedGear}
                setEndStar={handleStarChange}
                setSfRes={setSfResults}
              />
            </StarForceContainer>

            <CubeContainer>
              <Cube
                selectedGear={selectedGear}
                setCubeResults={setCubeResults}
                setPotLines={setPotLines}
              />
            </CubeContainer>
          </div>
        </div>

        <ResultsPanel
          selectedGear={selectedGear}
          endStar={endStar}
          potLines={potLines}
          sfResults={sfResults}
          setNumber={setNumber}
          setStats={setStats}
          cubeResults={cubeResults}
          currentSfStats={currentSfStats}
        />
      </div>
    </div>
  );
}

const Header = () => (
  <div className="flex gap-2 h-16 w-full justify-between items-center">
    <div className="w-[196px]" />
    <Image
      src="image/geardiff.svg"
      width={172}
      height={32}
      alt="geardiff"
      role="img"
      style={{ width: 'auto', height: 'auto' }}
    />
    <div className="flex gap-1">
      <NavLink href="/about" label="About" />
      <NavLink href="/about" label="Donate" />
    </div>
  </div>
);

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <Link
    href={href}
    className="flex h-10 w-24 items-center justify-center opacity-60 hover:opacity-80 hover:cursor-pointer hover:bg-[#00000010] px-6 rounded-full"
  >
    <p className="leading-4 text-base font-semibold">{label}</p>
  </Link>
);

const ItemsContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="flex w-full overflow-hidden h-[280px] bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]">
    {children}
  </div>
);

const StarForceContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">{children}</div>
);

const CubeContainer = ({ children }: { children: React.ReactNode }) => (
  <div className="w-full">{children}</div>
);

interface ResultsPanelProps {
  selectedGear: Item | null;
  endStar: string;
  potLines: PotLines | null;
  sfResults: StarForceResults | null;
  setNumber: string;
  setStats: SetData | null;
  cubeResults: PotCalcResult | null;
  currentSfStats: SFStats | null;
}

const ResultsPanel = ({
  selectedGear,
  endStar,
  potLines,
  sfResults,
  setNumber,
  setStats,
  cubeResults,
  currentSfStats,
}: ResultsPanelProps) => (
  <div className="flex flex-col w-full bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] p-4 gap-4">
    <GearResultsContainer selectedGear={selectedGear}>
      {selectedGear ? (
        <GearRes
          selectedGear={selectedGear}
          endStar={endStar}
          potLines={potLines}
          sfStats={sfResults?.stats}
          setNumber={setNumber}
          setStats={setStats}
          sfRes={sfResults}
        />
      ) : (
        <EmptyState message="Select an item to view details" />
      )}
    </GearResultsContainer>

    <div className="flex w-full gap-4">
      <SfCost sfResults={sfResults} />
      <CubeCost cubeRes={cubeResults} />
    </div>

    <div className="flex w-full gap-4">
      <TotalCost cubeRes={cubeResults} sfResults={sfResults} />
    </div>

    <FdRes
      setStats={setStats}
      selectedGear={selectedGear}
      sfStats={sfResults?.stats || currentSfStats}
      potLines={potLines}
    />
  </div>
);

const GearResultsContainer = ({
  selectedGear,
  children,
}: {
  selectedGear: Item | null;
  children: React.ReactNode;
}) => (
  <div
    className={`flex w-full gap-4 rounded-[8px] border grow ${
      !selectedGear ? 'items-center justify-center' : ''
    }`}
  >
    {children}
  </div>
);

const EmptyState = ({ message }: { message: string }) => (
  <h4 className="opacity-60">{message}</h4>
);
