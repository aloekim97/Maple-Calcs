import Image from 'next/image';
import { Item } from '../../../types/item';
import { useEffect, useState } from 'react';
import sets from '../../../public/sets.json';

interface GearProps {
  selectedGear: Item;
  endStar: string;
  potLines: any;
  setNumber: string;
}

export default function GearRes({
  selectedGear,
  endStar,
  potLines,
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
  const setCount = parseInt(setNumber);
  const setStats = selectedGear?.Set 
    ? sets.find(s => s[""] === selectedGear.Set && s["Set Count"] === setCount)
    : null;
  console.log(selectedGear?.Set)
  console.log(setCount)
  useEffect(() => {
    if (selectedGear.Type === 'Weapon') {
      setStat(selectedGear.Job === 'Mage' ? 'M.ATT' : 'ATT');
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
          : 'stat' // Default fallback
      );
    }
  }, [selectedGear.Type, selectedGear.Job]);

  console.log({ selectedGear, potLines, stat });
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
            <h4 className="text-[#00B188]">+{getPotValue(potLines?.first)}%</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4 className="text-[#00B188]">{stat}:</h4>
            <h4 className="text-[#00B188]">+{getPotValue(potLines?.second)}%</h4>
          </div>
          <div className="flex justify-between w-full">
            <h4 className="text-[#00B188]">{stat}:</h4>
            <h4 className="text-[#00B188]">+{getPotValue(potLines?.third)}%</h4>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center w-full p-[12px] gap-[8px]">
        <h3 className="flex w-full justify-start leading-[24px]">{selectedGear['Item Name'].replace(/_/g, ' ')}</h3>
        <div className='flex w-full h-full justify-between'>
          <div className='flex flex-col gap-[4px] justify-end'>
           <h4>Type:</h4>
           <h4>Level:</h4>
           <h4>Set:</h4>
           <h4>Main Stat:</h4>
           <h4>Sub Stat:</h4>
           <h4>HP:</h4>
           <h4>MP:</h4>
           <h4>ATK:</h4>
           <h4>M.ATK:</h4>
           <h4>IED:</h4>
           <h4>BOSS DAMAGE:</h4>
           <h4>DAMAGE:</h4>
          </div>
          <div className='flex flex-col gap-[4px] items-end'>            
            <p>{selectedGear.Type}</p>
            <p>{selectedGear.Level}</p>
            <p>{selectedGear.Set || 'none'}</p>
            <p>{selectedGear['Main Stat'] || 0}</p>
            <p>{selectedGear['Sub Stat'] || 0}</p>
            <p>{selectedGear.HP || 0}</p>
            <p>{selectedGear.MP || 0}</p>
            <p>{selectedGear.ATK || 0}</p>
            <p>{selectedGear['M.ATK'] || 0}</p>
            <p>{selectedGear.IED || 0}</p>
            <p>{selectedGear['BOSS DAMAGE'] || 0}</p>
            <p>{selectedGear.DAMAGE || 0}</p>
          </div>
        </div>
        <div className="flex justify-betwen w-full h-full">
          <div className='flex flex-col'>
            <h5>Set:</h5>
          </div>
          <div className='flex flex-col'>
            <p>{selectedGear?.Set || 'none'}</p>
            {setStats && (
              <div>
                <p>Stat: {setStats.Stat}</p>
                <p>HP&MP: {setStats["HP&MP"]}</p>
                <p>Boss Damage: {setStats["Boss Damage"] || 'N/A'}</p>
                <p>IED: {setStats.IED || 'N/A'}</p>
                <p>Crit Damage: {setStats["Crit Damage"] || 'N/A'}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
