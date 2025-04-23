import Image from 'next/image';
import { Item } from '../../../../types/item';
import { useCallback, useEffect, useMemo, useState } from 'react';
import itemStats from '@/app/formulas/sf/itemstats';
import { SetData } from '../../../../types/set';
import { PotLines } from '../gearcalc';
import { SFResults } from '../fdRes';
import { StarForceResults } from '../inputs/starforceInputs';

interface GearProps {
  selectedGear: Item;
  endStar: string;
  potLines: PotLines;
  sfStats?: SFResults;
  setNumber?: string;
  setStats?: SetData;
  sfRes?: StarForceResults;
}

interface LineData {
  itemStat: Record<string, string>;
  statValue: Record<string, number>;
}

const classStatMap: Record<string, string> = {
  Mage: 'INT',
  Thief: 'LUK',
  Bowman: 'DEX',
  Warrior: 'STR',
};

const toNumber = (value: string | number | undefined): number => {
  if (value === undefined) return 0;
  return typeof value === 'string' ? parseFloat(value) || 0 : value;
};

export default function GearRes({
  selectedGear,
  potLines,
  sfStats,
  setStats,
  sfRes,
}: GearProps) {
  const [endStar, setEndStar] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [lines, setLines] = useState({
    line1: '',
    line2: '',
    line3: '',
  });
  
  // Memoized SF results calculation
  const sfResults = useMemo(() => {
    const att = selectedGear.ATK || selectedGear['M.ATK'] || '';
    if (selectedGear.Set === 'Genesis') {
      return itemStats(0, 22, 200, toNumber(att), selectedGear.Type);
    }
    return sfStats || null;
  }, [selectedGear, sfStats]);

  // Memoized line data parsing
  const lineData = useMemo(() => {
    const result: LineData = {
      itemStat: {},
      statValue: {},
    };

    (['line1', 'line2', 'line3'] as const).forEach((lineKey) => {
      const lineValue = potLines[lineKey];
      if (!lineValue) return;

      try {
        const parsed =
          typeof lineValue === 'string' ? JSON.parse(lineValue) : lineValue;
        const numericEntry = Object.entries(parsed).find(
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          ([_, value]) => typeof value === 'number'
        );

        if (!numericEntry) return;

        const [statKey, statValue] = numericEntry;
        const resolvedStatKey =
          statKey === 'stat'
            ? classStatMap[selectedGear?.Job] || statKey
            : statKey;

        result.itemStat[lineKey] = resolvedStatKey;
        result.statValue[lineKey] = statValue as number;
      } catch (error) {
        console.error(`Error parsing ${lineKey}:`, error);
      }
    });

    return result;
  }, [potLines, selectedGear?.Job]);

  console.log(lineData)

  // Effect for localStorage synchronization
  useEffect(() => {
    let savedEndStar;
    if (sfRes === null) savedEndStar = '0';
    else savedEndStar = localStorage.getItem('endStar');
    if (savedEndStar) setEndStar(savedEndStar);

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

  // Memoized star rendering
  const renderStars = useCallback(() => {
    const totalStars = selectedGear.Set === 'Genesis' ? 22 : Number(endStar);
    const starRows = [];

    for (let row = 0; row < 6; row++) {
      const starsInRow = [];
      for (let col = 0; col < 5; col++) {
        const starIndex = row * 5 + col;
        starsInRow.push(
          <Image
            key={starIndex}
            src={
              starIndex < totalStars
                ? '/image/Star_Icon.svg'
                : '/image/No_Star_Icon.svg'
            }
            width={16}
            height={16}
            alt="star"
            role="img"
          />
        );
      }
      starRows.push(
        <div key={row} className="grid grid-cols-5 justify-between">
          {starsInRow}
        </div>
      );
    }

    return starRows;
  }, [endStar, selectedGear.Set]);

  const renderStatWithBonus = (
    baseValue: number | string | undefined,
    bonus: number
  ): string => {
    const base = toNumber(baseValue);
    if (!sfResults?.difference) return `${base}`;
    return `${base + bonus} (${base} + ${bonus})`;
  };

  const itemName = selectedGear['Item Name'].replace(/_/g, ' ');
  const mainStatValue = selectedGear['Main Stat'];
  const subStatValue = selectedGear['Sub Stat'];
  const atkValue = selectedGear.ATK || selectedGear['M.ATK'];
  const NON_SF_TYPES = new Set([
    'Black_Heart',
    'Genesis_Badge',
    `Mitra's_Rage`,
    `Crystal_Ventus_Badge`,
    'Cursed_Spellbook',
    'Stone_Of_Eternal_Life',
    'Pinky_Holy_Cup',
  ]);
  const NON_CUBE_TYPES = new Set([
    'Black_Heart',
    'Genesis_Badge',
    'Crystal_Ventus_Badge',
    'Cursed_Spellbook',
    'Stone_Of_Eternal_Life',
    'Pinky_Holy_Cup',
  ]);
  return (
    <>
      <div className="flex flex-col justify-between items-center w-full p-[12px]">
        {/* Starforce Section */}
        {!NON_SF_TYPES.has(selectedGear?.['Item Name'] ?? '') ? (
          <div className="grid grid-cols-3 w-full gap-[8px]">
            {renderStars()}
          </div>
        ) : (
          <div className="grid grid-cols-3 w-full gap-[8px]"></div>
        )}

        {/* Item Image */}
        <Image
          src={`/image/items/${selectedGear['Item Name']}.png`}
          width={184}
          height={184}
          alt={itemName}
          className="p-[4px]"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = '/image/items/fallback.png';
          }}
        />

        {/* Stats Section */}
        <div className="flex w-full">
          {/* Potential Stats */}
          {!NON_CUBE_TYPES.has(selectedGear?.['Item Name'] ?? '') &&
          !(
            lineData?.statValue?.line1 === 1 &&
            lineData?.statValue?.line2 === 1 &&
            lineData?.statValue?.line3 === 1
          ) ? (
            <div className="flex flex-col gap-[4px] w-full mr-[16px]">
              <h5 className="opacity-60 text-[#00B188]">Potential:</h5>
              {Object.entries(lineData?.itemStat ?? {}).map(
                ([lineKey, statName]) => (
                  <div key={lineKey} className="flex justify-between w-full">
                    <h5 className="text-[#00B188]">
                      {statName?.toString().toUpperCase()}:
                    </h5>
                    <h6 className="text-[#00B188]">
                      +{lineData?.statValue?.[lineKey] ?? 0}%
                    </h6>
                  </div>
                )
              )}
            </div>
          ) : null}

          {/* Set Stats */}
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
                  .filter(
                    ([key, value]) =>
                      !['Set', 'Set Count'].includes(key) && value
                  )
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
                  {`Input a valid value for "Set Number" to see the respective set bonuses.`}
                </h5>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start w-full p-[12px] gap-[8px]">
        <h3 className="flex w-full justify-start leading-[24px]">{itemName}</h3>

        <div className="flex flex-col w-full gap-[6px]">
          {[
            { label: 'Type:', value: selectedGear['Sub-Type'] },
            { label: 'Lvl:', value: selectedGear.Level },
            { label: 'Set:', value: selectedGear.Set || 'none' },
            {
              label: 'Main Stat:',
              value: sfResults
                ? renderStatWithBonus(mainStatValue, sfResults.difference.stat)
                : `${mainStatValue || 0}`,
            },
            {
              label: 'Sub Stat:',
              value: sfResults
                ? renderStatWithBonus(subStatValue, sfResults.difference.stat)
                : `${subStatValue || 0}`,
            },
            { label: 'HP:', value: selectedGear.HP || 0 },
            { label: 'MP:', value: selectedGear.MP || 0 },
            {
              label: 'Atk:',
              value: sfResults
                ? renderStatWithBonus(atkValue, sfResults.difference.att)
                : `${toNumber(atkValue)}`,
            },
            {
              label: 'M.Atk:',
              value: sfResults
                ? renderStatWithBonus(atkValue, sfResults.difference.att)
                : `${toNumber(atkValue)}`,
            },
            { label: 'IED:', value: selectedGear.IED || 0 },
            { label: 'Boss Damage:', value: selectedGear['Boss Damage'] || 0 },
            { label: 'Damage:', value: selectedGear.Damage || 0 },
          ].map((item, index) => (
            <div key={index} className="flex justify-between w-full">
              <h4>{item.label}</h4>
              <p>{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
