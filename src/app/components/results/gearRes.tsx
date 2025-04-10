import Image from 'next/image';
import { Item } from '../../../../types/item';
import { useEffect, useState } from 'react';
import itemStats from '@/app/formulas/sf/itemstats';

interface GearProps {
  selectedGear: Item;
  endStar: string;
  potLines: any;
  sfStats: any;
}
interface SFResults {
  hp?: number;
  endStar?: number;
  difference: {
    stat: number;
    att: number;
  };
}

interface PotValue {
  value: number;
  stat: string;
}

interface PotentialLine {
  stat?: number;
  att?: number;
  boss?: number;
  ied?: number;
  cd?: number;
  cdr?: number;
  dropmeso?: number;
  str?: number;
  dex?: number;
  int?: number;
  luk?: number;
}

interface PotValues {
  first: PotValue;
  second: PotValue;
  third: PotValue;
}

export default function GearRes({
  selectedGear,
  endStar,
  potLines,
  sfStats,
  setNumber,
}: GearProps) {
  const [stat, setStat] = useState('');
  const getPotValue = (potLine: string) => {
    try {
      const parsed = JSON.parse(potLine);
      return parsed.stat || 0; // Return 0 if stat doesn't exist
    } catch {
      return 0; // Fallback if JSON parsing fails
    }
  };

  const setCount = parseInt(setNumber || '', 10); // Fallback to '2' if empty
  const isValidSetCount = !isNaN(setCount) && setCount > 0;

  const setStats = selectedGear?.Set && isValidSetCount
  ? sets.find(s => {
      const isSetMatch = s["Set"].toLowerCase() === selectedGear.Set.toLowerCase();
      const isCountMatch = s["Set Count"] === setCount;
      return isSetMatch && isCountMatch;
    })
  : null;

  const [potValues, setPotValues] = useState<PotValues>({
    first: { value: 0, stat: '' },
    second: { value: 0, stat: '' },
    third: { value: 0, stat: '' },
  });
  const [sfResults, setSfResults] = useState<SFResults | null>(null);
  const getPotValueAndStat = (
    potLine: string | PotentialLine | undefined
  ): PotValue => {
    if (!potLine) return { value: 0, stat: '' };

    try {
      const parsed =
        typeof potLine === 'string' ? JSON.parse(potLine) : potLine;

      const statMap = [
        { key: 'stat', label: 'STAT' },
        {
          key: 'att',
          label: selectedGear.Job === 'Mage' ? 'MAGIC ATT' : 'ATT',
        },
        { key: 'boss', label: 'BOSS' },
        { key: 'ied', label: 'IED' },
        { key: 'cd', label: 'CRIT DMG' },
        { key: 'cdr', label: 'COOLDOWN' },
        { key: 'dropmeso', label: 'DROP/MESO' },
        { key: 'str', label: 'STR' },
        { key: 'dex', label: 'DEX' },
        { key: 'int', label: 'INT' },
        { key: 'luk', label: 'LUK' },
      ];

      for (const { key, label } of statMap) {
        if (parsed[key] !== undefined) {
          return { value: parsed[key], stat: label };
        }
      }

      return { value: 0, stat: '' };
    } catch (error) {
      console.error('Error parsing potential line:', error);
      return { value: 0, stat: '' };
    }
  };

  useEffect(() => {
    const att =
      selectedGear.ATK === '' ? selectedGear['M.ATK'] : selectedGear.ATK;
    if (selectedGear.Set === 'Genesis') {
      const gene = itemStats(0, 22, 200, att, selectedGear.Type);
      setSfResults(gene);
    } else {
      setSfResults(sfStats || null);
    }
  }, [selectedGear, sfStats]);

  useEffect(() => {
    if (!potLines) return;

    setPotValues({
      first: getPotValueAndStat(potLines.first),
      second: getPotValueAndStat(potLines.second),
      third: getPotValueAndStat(potLines.third),
    });
  }, [selectedGear.Job, potLines]);

  const toNumber = (value: string | number | undefined): number => {
    if (value === undefined) return 0;
    return typeof value === 'string' ? parseFloat(value) || 0 : value;
  };

  const renderStars = () => {
    const totalStars = selectedGear.Set === 'Genesis' ? 22 : Number(endStar);
    const starRows = [];

    for (let row = 0; row < 6; row++) {
      const starsInRow = [];
      for (let col = 0; col < 5; col++) {
        const starIndex = row * 5 + col;
        const isFilled = starIndex < totalStars;
        starsInRow.push(
          <Image
            key={starIndex}
            src={isFilled ? '/image/Star_Icon.svg' : '/image/No_Star_Icon.svg'}
            width={16}
            height={16}
            alt="star"
            role="img"
            style={{
              width: 'auto',
              height: 'auto',
            }}
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
  };

  const renderStatWithBonus = (
    baseValue: number | string | undefined,
    bonus: number
  ) => {
    const base = toNumber(baseValue);
    if (!sfResults || !sfResults.difference) return `${base}`;
    return `${base + bonus} (${base} + ${bonus})`;
  };

  return (
    <>
      <div className="flex flex-col justify-between items-center w-full p-[12px]">
        <div className="grid grid-cols-3 w-full gap-[8px]">{renderStars()}</div>

        <Image
          src={`/image/items/${selectedGear['Item Name']}.png`}
          width={184}
          height={184}
          alt={selectedGear['Item Name'].replace(/_/g, ' ')}
          className="p-[4px]"
        />

<div className='flex justify-between items-start w-full gap-[16px]'>
          <div className="flex flex-col gap-[8px] w-full h-full">
            <h5 className='opacity-60 text-[#00B188]'>Potential:</h5>
            <div className="flex justify-between w-full">
              <h5 className="text-[#00B188]">{potValues.first.stat}:</h5>
              <h6 className="text-[#00B188]">+{getPotValue(potLines?.first)}%</h6>
            </div>
            <div className="flex justify-between w-full">
              <h5 className="text-[#00B188]">{potValues.second.stat}:</h5>
              <h6 className="text-[#00B188]">+{getPotValue(potLines?.second)}%</h6>
            </div>
            <div className="flex justify-between w-full">
              <h5 className="text-[#00B188]">{potValues.third.stat}:</h5>
              <h6 className="text-[#00B188]">+{getPotValue(potLines?.third)}%</h6>
            </div>
          </div>
          <div className="flex justify-betwen w-full h-full">
            <div className='flex flex-col h-full w-full'>
              {setStats ? (
                <div className='flex flex-col gap-[8px]'>
                  <div className='flex gap-[4px]'>
                    {/* <h5 className='opacity-60'>Set Bonus:</h5> */}
                    <div className='flex gap-[4px]'>
                      {setStats["Set"] && <h5 className='opacity-60'>{setStats["Set"]}</h5>}
                      {setStats["Set Count"] && <h5 className='opacity-60'>( {setStats["Set Count"]} )</h5>}
                    </div>
                  </div>
                  {setStats.Stat && 
                    <div className='flex w-full justify-between'>
                      <h5>All Stat:</h5>
                      <h6>+{setStats.Stat}</h6>
                    </div>
                  }
                  {setStats.Att && 
                    <div className='flex w-full justify-between'>
                      <h5>ATT:</h5>
                      <h6>+{setStats.Att}</h6>
                    </div>
                  }
                  {setStats["HP&MP"] && 
                    <div className='flex w-full justify-between'>
                      <h5>HP/MP:</h5>
                      <h6>+{setStats["HP&MP"]}</h6>
                    </div>
                  }
                  {setStats["Boss Damage"] && 
                    <div className='flex w-full justify-between'>
                      <h5>Boss:</h5>
                      <h6>+{setStats["Boss Damage"]}</h6>
                    </div>
                  }
                  {setStats.IED && 
                    <div className='flex w-full justify-between'>
                      <h5>IED:</h5>
                      <h6>+{setStats.IED}</h6>
                    </div>
                  }
                  {setStats["Crit Damage"] && 
                    <div className='flex w-full justify-between'>
                      <h5>Crit Damage:</h5>
                      <h6>+{setStats["Crit Damage"]}</h6>
                    </div>
                  }
                </div>
              ) : (
                <div className='h-0'/>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center w-full p-[12px] gap-[8px]">
        <h3 className="flex w-full justify-start leading-[24px]">
          {selectedGear['Item Name'].replace(/_/g, ' ')}
        </h3>

        <div className="flex justify-between w-full">
          <h4>Type:</h4>
          <p>{selectedGear.Type}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>Level:</h4>
          <p>{selectedGear.Level}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>Set:</h4>
          <p>{selectedGear.Set || 'none'}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>Main Stat:</h4>
          <p>
            {sfResults
              ? renderStatWithBonus(
                  selectedGear['Main Stat'],
                  sfResults.difference.stat
                )
              : `${selectedGear['Main Stat'] || 0}`}
          </p>
        </div>

        <div className="flex justify-between w-full">
          <h4>Sub Stat:</h4>
          <p>
            {sfResults
              ? renderStatWithBonus(
                  selectedGear['Sub Stat'],
                  sfResults.difference.stat
                )
              : `${selectedGear['Sub Stat'] || 0}`}
          </p>
        </div>

        <div className="flex justify-between w-full">
          <h4>HP:</h4>
          <p>{selectedGear.HP || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>MP:</h4>
          <p>{selectedGear.MP || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>ATK:</h4>
          <p>
            {sfResults
              ? renderStatWithBonus(selectedGear.ATK, sfResults.difference.att)
              : `${toNumber(selectedGear.ATK)}`}
          </p>
        </div>

        <div className="flex justify-between w-full">
          <h4>M.ATK:</h4>
          <p>
            {sfResults
              ? renderStatWithBonus(selectedGear.ATK, sfResults.difference.att)
              : `${toNumber(selectedGear.ATK)}`}
          </p>
        </div>

        <div className="flex justify-between w-full">
          <h4>IED:</h4>
          <p>{selectedGear.IED || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>BOSS DAMAGE:</h4>
          <p>{selectedGear['Boss Damage'] || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>DAMAGE:</h4>
          <p>{selectedGear.DAMAGE || 0}</p>
        </div>
      </div>
    </>
  );
}
