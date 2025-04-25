import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import itemStats from '@/app/formulas/sf/itemstats';
import { Item } from '../../../../types/item';
import { SetData } from '../../../../types/set';
import { PotLines } from '../gearcalc';
import { SFResults } from '../fdRes';
import { StarForceResults } from '../inputs/starforceInputs';

// Dynamic imports for better code splitting
const Image = dynamic(() => import('next/image'), {
  loading: () => <div className="bg-gray-200 animate-pulse" />,
  ssr: false,
});

// Constants for better maintainability
const NON_SF_TYPES = new Set([
  'Black_Heart',
  'Genesis_Badge',
  "Mitra's_Rage",
  'Crystal_Ventus_Badge',
  'Cursed_Spellbook',
  'Stone_Of_Eternal_Life',
  'Pinky_Holy_Cup',
  'Seven_Days_Badge',
  'Ruin_Force_Shield',
]);

const NON_CUBE_TYPES = new Set([
  'Black_Heart',
  'Genesis_Badge',
  'Crystal_Ventus_Badge',
  'Cursed_Spellbook',
  'Stone_Of_Eternal_Life',
  'Pinky_Holy_Cup',
]);

const CLASS_STAT_MAP: Record<string, string> = {
  Mage: 'INT',
  Thief: 'LUK',
  Bowman: 'DEX',
  Warrior: 'STR',
};

const STAR_IMAGES = {
  filled:
    'https://5pd8q9yvpv.ufs.sh/f/8nGwjuDDSJXHFfx84xZEOVRa453eNj2hcwmvSiBgztn9fCox',
  empty:
    'https://5pd8q9yvpv.ufs.sh/f/8nGwjuDDSJXHD0jFE8cbMl9DrsY0GCXk2pecWgKnBqHA1oFO',
};

interface GearProps {
  selectedGear: Item;
  endStar: string;
  potLines: PotLines;
  sfStats?: SFResults;
  setNumber?: string;
  setStats?: SetData;
  sfRes?: StarForceResults;
}

const toNumber = (value: string | number | undefined): number => {
  if (value === undefined) return 0;
  return typeof value === 'string' ? parseFloat(value) || 0 : value;
};

export default function GearRes({
  selectedGear,
  endStar,
  potLines,
  sfStats,
  setStats,
  sfRes,
}: GearProps) {
  const [localEndStar, setLocalEndStar] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lines, setLines] = useState({
    line1: '',
    line2: '',
    line3: '',
  });

  // Memoized calculations
  const {
    sfResults,
    lineData,
    itemName,
    shouldShowStars,
    shouldShowPotential,
  } = useMemo(() => {
    const att = selectedGear.ATK || selectedGear['M.ATK'] || '';
    const isGenesis = selectedGear.Set === 'Genesis';
    const itemName = selectedGear['Item Name'].replace(/_/g, ' ');

    const lineData = {
      itemStat: {} as Record<string, string>,
      statValue: {} as Record<string, number>,
    };

    (['line1', 'line2', 'line3'] as const).forEach((lineKey) => {
      const lineValue = potLines?.[lineKey];
      if (!lineValue) return;

      try {
        const parsed =
          typeof lineValue === 'string' ? JSON.parse(lineValue) : lineValue;
        const numericEntry = Object.entries(parsed).find(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => typeof value === 'number'
        );

        if (numericEntry) {
          const [statKey, statValue] = numericEntry;
          lineData.itemStat[lineKey] =
            statKey === 'stat'
              ? CLASS_STAT_MAP[selectedGear?.Job] || statKey
              : statKey;
          lineData.statValue[lineKey] = statValue as number;
        }
      } catch (error) {
        console.error(`Error parsing ${lineKey}:`, error);
      }
    });

    const shouldShowStars = !(
      NON_SF_TYPES.has(selectedGear?.['Item Name'] ?? '') ||
      (selectedGear?.['Item Name'] ?? '').startsWith('P.No')
    );

    const shouldShowPotential =
      !NON_CUBE_TYPES.has(selectedGear?.['Item Name'] ?? '') &&
      !(
        lineData?.statValue?.line1 === 1 &&
        lineData?.statValue?.line2 === 1 &&
        lineData?.statValue?.line3 === 1
      );

    return {
      sfResults: isGenesis
        ? itemStats(0, 22, 200, toNumber(att), selectedGear.Type)
        : sfStats,
      lineData,
      itemName,
      shouldShowStars,
      shouldShowPotential,
    };
  }, [selectedGear, potLines, sfStats]);

  // Local storage synchronization
  useEffect(() => {
    const savedEndStar = sfRes === null ? '0' : localStorage.getItem('endStar');
    if (savedEndStar) setLocalEndStar(savedEndStar);

    const updateFromLocalStorage = () => {
      setLines({
        line1: localStorage.getItem('potLine1') || '',
        line2: localStorage.getItem('potLine2') || '',
        line3: localStorage.getItem('potLine3') || '',
      });
    };

    updateFromLocalStorage();
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key && ['potLine1', 'potLine2', 'potLine3'].includes(e.key)) {
        updateFromLocalStorage();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [sfRes]);

  // Star rendering with memoization
  const renderStars = useCallback(() => {
    const totalStars =
      selectedGear.Set === 'Genesis' ? 22 : Number(localEndStar || endStar);
    return Array.from({ length: 6 }).map((_, row) => (
      <div key={row} className="grid grid-cols-5 justify-between">
        {Array.from({ length: 5 }).map((_, col) => {
          const starIndex = row * 5 + col;
          return (
            <Image
              key={starIndex}
              src={
                starIndex < totalStars ? STAR_IMAGES.filled : STAR_IMAGES.empty
              }
              width={16}
              height={16}
              alt="star"
              role="img"
            />
          );
        })}
      </div>
    ));
  }, [localEndStar, endStar, selectedGear.Set]);

  const renderStatWithBonus = useCallback(
    (baseValue: number | string | undefined, bonus: number): string => {
      const base = toNumber(baseValue);
      if (!sfResults?.difference) return `${base}`;
      return `${base + bonus} (${base} + ${bonus})`;
    },
    [sfResults]
  );

  // Memoized stat items for rendering
  const statItems = useMemo(
    () => [
      { label: 'Type:', value: selectedGear['Sub-Type'] },
      { label: 'Lvl:', value: selectedGear.Level },
      { label: 'Set:', value: selectedGear.Set || 'none' },
      {
        label: 'Main Stat:',
        value: sfResults
          ? renderStatWithBonus(
              selectedGear['Main Stat'],
              sfResults.difference.stat
            )
          : `${selectedGear['Main Stat'] || 0}`,
      },
      {
        label: 'Sub Stat:',
        value: sfResults
          ? renderStatWithBonus(
              selectedGear['Sub Stat'],
              sfResults.difference.stat
            )
          : `${selectedGear['Sub Stat'] || 0}`,
      },
      { label: 'HP:', value: selectedGear.HP || 0 },
      { label: 'MP:', value: selectedGear.MP || 0 },
      {
        label: selectedGear.ATK ? 'Atk:' : 'M.Atk:',
        value: sfResults
          ? renderStatWithBonus(
              selectedGear.ATK || selectedGear['M.ATK'],
              sfResults.difference.att
            )
          : `${toNumber(selectedGear.ATK || selectedGear['M.ATK'])}`,
      },
      { label: 'IED:', value: selectedGear.IED || 0 },
      { label: 'Boss Damage:', value: selectedGear['Boss Damage'] || 0 },
      { label: 'Damage:', value: selectedGear.Damage || 0 },
    ],
    [selectedGear, sfResults, renderStatWithBonus]
  );

  return (
    <div className="flex w-full">
      <div className="flex flex-col items-center justify-between w-full p-[12px]">
        {shouldShowStars ? (
          <div className="grid grid-cols-3 w-full gap-[8px]">
            {renderStars()}
          </div>
        ) : (
          <div className="grid grid-cols-3 w-full gap-[8px]"></div>
        )}

        <div className="relative min-w-[184px] h-[184px]">
          {' '}
          {/* Fixed size container */}
          <Image
            src={selectedGear.url}
            fill // This makes the image fill the container
            sizes="184px" // Optimizes for this specific size
            alt={itemName}
            quality={75} 
            className="object-contain p-[4px]" // Contain ensures proper aspect ratio
            priority={true} // If this is above-the-fold content
          />
        </div>

        <div className="flex w-full mt-[12px]">
          {shouldShowPotential && (
            <div className="flex flex-col gap-[4px] w-full mr-[16px]">
              <h5 className="opacity-60 text-[#00B188]">Potential:</h5>
              {Object.entries(lineData.itemStat).map(([lineKey, statName]) => (
                <div key={lineKey} className="flex justify-between w-full">
                  <h5 className="text-[#00B188]">{statName.toUpperCase()}:</h5>
                  <h6 className="text-[#00B188]">
                    +{lineData.statValue[lineKey] ?? 0}%
                  </h6>
                </div>
              ))}
            </div>
          )}

          <div className="w-full">
            {setStats ? (
              <div className="flex flex-col gap-[4px]">
                <div className="flex gap-[4px] items-center">
                  {setStats.Set && (
                    <h5 className="opacity-60 border-white border">
                      {setStats.Set}
                    </h5>
                  )}
                  {setStats['Set Count'] && (
                    <h5 className="opacity-60 bg-gray-200 rounded-full border border-gray-400 px-[2px]">
                      {setStats['Set Count']}
                    </h5>
                  )}
                </div>

                {Object.entries(setStats)
                  .filter(([key]) => !['Set', 'Set Count'].includes(key))
                  .map(([key, value]) => (
                    <div key={key} className="flex justify-between w-full">
                      <h5>
                        {key === 'Boss Damage' ? 'Boss' : key.replace('&', '/')}
                        :
                      </h5>
                      <h6>+{value}</h6>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="flex flex-col w-full gap-[4px]">
                <h5 className="opacity-60">Set</h5>
                <h5 className="opacity-80">
                  {`Input a valid "Set Number" to see set bonuses`}
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col items-start w-full p-[12px] gap-[8px]">
        <h3 className="w-full text-left leading-[24px]">{itemName}</h3>
        <div className="flex flex-col w-full gap-[6px]">
          {statItems.map((item, index) => (
            <div key={index} className="flex justify-between w-full">
              <h4>{item.label}</h4>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
