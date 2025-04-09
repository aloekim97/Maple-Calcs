import Image from 'next/image';
import { Item } from '../../../types/item';
import { useEffect, useState } from 'react';
import { SetData } from '../../../types/set';
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

  const setCount = parseInt(setNumber || '', 10); // Fallback to '2' if empty
  const isValidSetCount = !isNaN(setCount) && setCount > 0;

  const setStats = selectedGear?.Set && isValidSetCount
  ? sets.find(s => {
      const isSetMatch = s["Set"].toLowerCase() === selectedGear.Set.toLowerCase();
      const isCountMatch = s["Set Count"] === setCount;
      return isSetMatch && isCountMatch;
    })
  : null;

  console.log("Matching Set:", selectedGear?.Set, "Count:", setCount);
  console.log("Available Sets:", sets.filter(s => s.Set === selectedGear?.Set));

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
          : 'Main Stat' // Default fallback
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
        <div className='flex justify-between items-start w-full gap-[16px]'>
          <div className="flex flex-col gap-[8px] w-full h-full">
            <h5 className='opacity-60 text-[#00B188]'>Potential:</h5>
            <div className="flex justify-between w-full">
              <h5 className="text-[#00B188]">{stat}:</h5>
              <h6 className="text-[#00B188]">+{getPotValue(potLines?.first)}%</h6>
            </div>
            <div className="flex justify-between w-full">
              <h5 className="text-[#00B188]">{stat}:</h5>
              <h6 className="text-[#00B188]">+{getPotValue(potLines?.second)}%</h6>
            </div>
            <div className="flex justify-between w-full">
              <h5 className="text-[#00B188]">{stat}:</h5>
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
      <div className="flex flex-col justify-center h-full w-full gap-[8px] p-[12px]">
        <h3 className="flex w-full justify-start leading-[24px]">{selectedGear['Item Name'].replace(/_/g, ' ')}</h3>
        <div className='flex w-full h-full justify-between'>
          <div className='flex flex-col gap-[2px] justify-between'>
           <h4>Type:</h4>
           <h4>Level:</h4>
           <h4>Main Stat:</h4>
           <h4>Sub Stat:</h4>
           <h4>HP:</h4>
           <h4>ATK:</h4>
           <h4>M.ATK:</h4>
           <h4>IED:</h4>
           <h4>BOSS DAMAGE:</h4>
           <h4>DAMAGE:</h4>
          </div>
          <div className='flex flex-col items-end gap-[2px] justify-between'>            
            <p>{selectedGear.Type}</p>
            <p>{selectedGear.Level}</p>
            <p>+{selectedGear['Main Stat'] || 0}</p>
            <p>+{selectedGear['Sub Stat'] || 0}</p>
            <p>+{selectedGear.HP || 0}</p>
            <p>+{selectedGear.ATK || 0}</p>
            <p>+{selectedGear['M.ATK'] || 0}</p>
            <p>+{selectedGear.IED || 0}</p>
            <p>+{selectedGear['BOSS DAMAGE'] || 0}</p>
            <p>+{selectedGear.DAMAGE || 0}</p>
          </div>
        </div>
        {/* <div className="flex justify-betwen w-full h-full">
          <div className='flex flex-col w-full gap-[2px]'>
            {setStats ? (
              <div>
                <div className='flex gap-[4px]'>
                  <h5 className='opacity-60'>Set Bonus:</h5>
                  <div className='flex gap-[4px]'>
                    {setStats["Set"] && <h5 className='opacity-60'>{setStats["Set"]}</h5>}
                    {setStats["Set Count"] && <h5 className='opacity-60'>( {setStats["Set Count"]} )</h5>}
                  </div>
                </div>
                {setStats.Stat && 
                  <div className='flex w-full justify-between'>
                    <h4>All Stat:</h4>
                    <p>+{setStats.Stat}</p>
                  </div>
                }
                {setStats.Att && 
                  <div className='flex w-full justify-between'>
                    <h4>ATT:</h4>
                    <p>+{setStats.Att}</p>
                  </div>
                }
                {setStats["HP&MP"] && 
                  <div className='flex w-full justify-between'>
                    <h4>HP/MP:</h4>
                    <p>+{setStats["HP&MP"]}</p>
                  </div>
                }
                {setStats["Boss Damage"] && 
                  <div className='flex w-full justify-between'>
                    <h4>Boss Damage:</h4>
                    <p>+{setStats["Boss Damage"]}</p>
                  </div>
                }
                {setStats.IED && 
                  <div className='flex w-full justify-between'>
                    <h4>IED:</h4>
                    <p>+{setStats.IED}</p>
                  </div>
                }
                {setStats["Crit Damage"] && 
                  <div className='flex w-full justify-between'>
                    <h4>Crit Damage:</h4>
                    <p>+{setStats["Crit Damage"]}</p>
                  </div>
                }
                {setStats["Crit Damage"] && <p>Crit Damage: {setStats["Crit Damage"]}</p>}
              </div>
            ) : (
              <div className='h-0'/>
            )}
          </div>
        </div> */}
      </div>
    </>
  );
}
