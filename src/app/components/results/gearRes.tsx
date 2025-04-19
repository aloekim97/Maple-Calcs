import Image from 'next/image';
import { Item } from '../../../../types/item';
import { useEffect, useState } from 'react';
import itemStats from '@/app/formulas/sf/itemstats';
import { SetData } from '../../../../types/set';
import sets from '../../../../public/sets.json';

interface GearProps {
  selectedGear: Item;
  endStar: string;
  potLines: {
    first?: string | PotentialLine;
    second?: string | PotentialLine;
    third?: string | PotentialLine;
  };
  sfStats?: SFResults;
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
  setStats,
}: GearProps) {
  const [stat, setStat] = useState('');
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

      const statMap: { key: keyof PotentialLine; label: string }[] = [
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
          return { value: Number(parsed[key]), stat: label };
        }
      }

      return { value: 0, stat: '' };
    } catch (error) {
      console.error('Error parsing potential line:', error);
      return { value: 0, stat: '' };
    }
  };

  useEffect(() => {
    const att = selectedGear.ATK === '' ? selectedGear['M.ATK'] : selectedGear.ATK;
    if (selectedGear.Set === 'Genesis') {
      const gene = itemStats(0, 22, 200, Number(att), selectedGear.Type);
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
  ): string => {
    const base = toNumber(baseValue);
    if (!sfResults?.difference) return `${base}`;
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

        <div className='flex w-full'>
        {potLines ? (
          <div className="flex flex-col gap-[4px] w-full mr-[16px]">
            {potLines?.first && potValues.first.stat && (
              <div className="flex flex-col gap-[4px] w-full">
                <h5 className='opacity-60 text-[#00B188]'>Potential:</h5>
                <div className="flex justify-between w-full">
                  <h5 className="text-[#00B188]">{potValues.first.stat}:</h5>
                  <h6 className="text-[#00B188]">+{potValues.first.value}%</h6>
                </div>
              </div>
            )}
            {potLines?.second && potValues.second.stat && (
              <div className="flex justify-between w-full">
                <h5 className="text-[#00B188]">{potValues.second.stat}:</h5>
                <h6 className="text-[#00B188]">+{potValues.second.value}%</h6>
              </div>
            )}
            {potLines?.third && potValues.third.stat && (
              <div className="flex justify-between w-full">
                <h5 className="text-[#00B188]">{potValues.third.stat}:</h5>
                <h6 className="text-[#00B188]">+{potValues.third.value}%</h6>
              </div>
            )}
          </div>
        ):(<div/>)}
          <div className='w-full'>
            {setStats ? (
              <div className='flex flex-col gap-[4px]'>
                <div className='flex w-full gap-[4px] justify-start items-center'>
                  {/* <h5 className='opacity-60'>Set Bonus:</h5> */}
                  <div className='flex gap-[4px]'>
                    {setStats["Set"] && <h5 className='opacity-60 h-full border-white border'>{setStats["Set"]}</h5>}
                    {setStats["Set Count"] && <h5 className='opacity-60 bg-gray-200 rounded-full border border-gray-400 px-[2px]'>{setStats["Set Count"]}</h5>}
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
                {setStats["Final Damage"] && 
                  <div className='flex w-full justify-between'>
                    <h5>Final Damage:</h5>
                    <h6>+{setStats["Final Damage"]}</h6>
                  </div>
                }
              </div>
            ) : (
            <div className='flex flex-col w-full gap-[4px]'> 
              <div className='flex gap-[4px]'>
                <h5 className='opacity-60'>Set</h5>
                <h5 className='opacity-60'>(0)</h5>
              </div>
              <div className='flex gap-[4px]'>
                <h5 className='opacity-80'>Input a valid value for "Set Number" to see the respective set bonuses.</h5>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-start items-start w-full p-[12px] gap-[8px]">
        <h3 className="flex w-full justify-start leading-[24px]">
          {selectedGear['Item Name'].replace(/_/g, ' ')}
        </h3>
        <div className='flex flex-col h-full w-full gap-[6px] justify-between'>
          <div className="flex justify-between gap-[4px]">
            <h4>Type:</h4>
            <p>{selectedGear['Sub-Type']}</p>
          </div>
          <div className="flex justify-between gap-[4px]">
            <h4>Lvl:</h4>
            <p>{selectedGear.Level}</p>
          </div>
          <div className="flex justify-between gap-[4px]">
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
            <h4>Atk:</h4>
            <p>
              {sfResults
                ? renderStatWithBonus(selectedGear.ATK, sfResults.difference.att)
                : `${toNumber(selectedGear.ATK)}`}
            </p>
          </div>

          <div className="flex justify-between w-full">
            <h4>M.Atk:</h4>
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
            <h4>Boss Damage:</h4>
            <p>{selectedGear['Boss Damage'] || 0}</p>
          </div>

          <div className="flex justify-between w-full">
            <h4>Damage:</h4>
            <p>{selectedGear.DAMAGE || 0}</p>
          </div>
        </div>
      </div>
    </>
  );
}
