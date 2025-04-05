import Image from 'next/image';
import { Item } from '../../../types/item';
import { useEffect, useState } from 'react';

interface GearProps {
  selectedGear: Item;
  endStar: string;
  potLines: any;
  sfStats: any;
}

export default function GearRes({
  selectedGear,
  endStar,
  potLines,
  sfStats,
}: GearProps) {
  const [stat, setStat] = useState('');
  const getPotValue = (potLine: string) => {
    try {
      const parsed = JSON.parse(potLine);
      return parsed.stat || 0; 
    } catch {
      return 0; 
    }
  };
  console.log(sfStats)
  useEffect(() => {
    if (selectedGear.Type === 'Weapon') {
      setStat(selectedGear.Job === 'Mage' ? 'MAGIC ATT' : 'ATT');
    } else {
      setStat(
        selectedGear.Job === 'Warrior'
          ? 'STR'
          : selectedGear.Job === 'Pirate'
          ? 'STR'
          : selectedGear.Job === 'Mage'
          ? 'INT'
          : selectedGear.Job === 'Thief'
          ? 'LUK'
          : selectedGear.Job === 'Archer'
          ? 'DEX'
          : 'stat' 
      );
    }
  }, [selectedGear.Type, selectedGear.Job]);

  return (
    <>
      <div className="flex flex-col justify-between items-center w-full p-[12px]">
        <div className="grid grid-cols-3 w-full gap-[8px]">
          {Array.from({ length: 6 }).map((_, row) => (
            <div key={row} className="grid grid-cols-5 justify-between">
              {Array.from({ length: 5 }).map((_, col) => {
                const starIndex = row * 5 + col;
                const isFilled = starIndex < Number(endStar);
                return (
                  <Image
                    key={starIndex}
                    src={
                      isFilled
                        ? '/image/Star_Icon.svg'
                        : '/image/No_Star_Icon.svg'
                    }
                    width={16}
                    height={16}
                    alt="star"
                  />
                );
              })}
            </div>
          ))}
        </div>
        <Image
          src={`/image/items/${selectedGear['Item Name']}.png`}
          width={184}
          height={184}
          alt={selectedGear['Item Name'].replace(/_/g, ' ')}
          className="p-[4px]"
        />
        <div className="flex flex-col gap-[8px] w-full">
          <div className="flex justify-between w-full">
            <h4 className="text-[#00B188]">{stat}:</h4>
            <h4 className="text-pot">+{getPotValue(potLines?.first)}%</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4 className="text-[#00B188]">{stat}:</h4>
            <h4 className="text-pot">+{getPotValue(potLines?.second)}%</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4 className="text-[#00B188]">{stat}:</h4>
            <h4 className="text-pot">+{getPotValue(potLines?.third)}%</h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-[12px] gap-[8px]">
        <h3 className="flex w-full justify-start leading-[24px]">
          {selectedGear['Item Name'].replace(/_/g, ' ')}
        </h3>

        <div className="flex justify-between w-full">
          <h4>Type:</h4>
          <p className="flex justify-end items-end">{selectedGear.Type}</p>
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
          <p>{selectedGear['Main Stat'] || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>Sub Stat:</h4>
          <p>{selectedGear['Sub Stat'] || 0}</p>
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
          <p>{selectedGear.ATK || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>M.ATK:</h4>
          <p>{selectedGear['M.ATK'] || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>IED:</h4>
          <p>{selectedGear.IED || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>BOSS DAMAGE:</h4>
          <p>{selectedGear['BOSS DAMAGE'] || 0}</p>
        </div>

        <div className="flex justify-between w-full">
          <h4>DAMAGE:</h4>
          <p>{selectedGear.DAMAGE || 0}</p>
        </div>
      </div>
    </>
  );
}
