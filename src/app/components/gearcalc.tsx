'use client';
import StarForce from './starforceInputs';
import Cube from './cubeInputs';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ItemsPage from './itemlist';
import { useState } from 'react';
import { Item } from '../../../types/item';
import { Lines, PotCalcResult } from '../formulas/cube/potentialprobability';
import CubeCost from './cubeRes';
import SfCost from './starForceRes';
import GearRes from './gearRes';

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
  const [sfResults, setSfResults] = useState<PotCalcResult | null>(null);
  const [potLines, setPotLines] = useState<Lines | null>(null);
  const [endStar, setEndStar] = useState('');
  return (
    <div className="flex flex-col w-[1440px] h-[924px] py-[32px] gap-[32px]">
      <div className="flex gap-[8px] h-[64px] w-full justify-center items-center">
        <Image src="image/geardiff.svg" width={22} height={24} alt="geardiff" />
        <h2 className="">Gear Diff</h2>
      </div>
      <div className="flex grow h-full gap-[32px]">
        <div className="flex flex-col w-full gap-[32px]">
          <div className="flex w-full h-[640px] overflow-hidden bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]">
            <ItemsPage setSelectedGear={setSelectedGear} />
          </div>
          <div className="flex w-full gap-[32px]">
            <div className="w-full">
              <StarForce
                selectedGear={selectedGear}
                endStar={endStar}
                setEndStar={setEndStar}
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
          <Button>Calculate</Button>
        </div>
        <div className="flex flex-col w-full h-full bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)] p-[16px] gap-[16px]">
          <div className="flex w-full h-full gap-[16px] rounded-[8px] border grow">
            {selectedGear ? (
              <GearRes
                selectedGear={selectedGear}
                endStar={endStar}
                potLines={potLines}
              />
            ) : (
              // <>
              //   <div className="flex flex-col justify-between items-center w-full p-[12px]">
              //     <div className="grid grid-cols-3 w-full gap-[8px]">
              //       {Array.from({ length: 6 }).map((_, row) => (
              //         <div
              //           key={row}
              //           className="grid grid-cols-5 justify-between"
              //         >
              //           {Array.from({ length: 5 }).map((_, col) => {
              //             const starIndex = row * 5 + col;
              //             const isFilled = starIndex < Number(endStar);
              //             return (
              //               <Image
              //                 key={starIndex}
              //                 src={
              //                   isFilled
              //                     ? '/image/Star_Icon.svg'
              //                     : '/image/No_Star_Icon.svg'
              //                 }
              //                 width={16}
              //                 height={16}
              //                 alt="star"
              //               />
              //             );
              //           })}
              //         </div>
              //       ))}
              //     </div>
              //     <Image
              //       src={`/image/items/${selectedGear['Item Name']}.png`}
              //       width={184}
              //       height={184}
              //       alt={selectedGear['Item Name'].replace(/_/g, ' ')}
              //       className="p-[4px]"
              //     />
              //     <div className="flex flex-col gap-[8px] w-full">
              //       <div className="flex justify-between w-full">
              //         <h4 className="text-[#00B188]">Magic Attack</h4>
              //         <h4 className="text-pot">+13%</h4>
              //       </div>
              //       <div className="flex justify-between w-full">
              //         <h4 className="text-[#00B188]">Magic Attack</h4>
              //         <h4 className="text-pot">+13%</h4>
              //       </div>
              //       <div className="flex justify-between w-full">
              //         <h4 className="text-[#00B188]">Magic Attack</h4>
              //         <h4 className="text-pot">+13%</h4>
              //       </div>
              //     </div>
              //   </div>
              //   <div className="flex flex-col justify-center items-center w-full p-[12px] gap-[8px]">
              //     <h3 className="flex w-full justify-start leading-[24px]">
              //       {selectedGear['Item Name'].replace(/_/g, ' ')}
              //     </h3>

              //     <div className="flex justify-between w-full">
              //       <h4>Type:</h4>
              //       <p className="flex justify-end items-end">
              //         {selectedGear.Type}
              //       </p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>Level:</h4>
              //       <p>{selectedGear.Level}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>Set:</h4>
              //       <p>{selectedGear.Set || 'none'}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>Main Stat:</h4>
              //       <p>{selectedGear['Main Stat'] || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>Sub Stat:</h4>
              //       <p>{selectedGear['Sub Stat'] || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>HP:</h4>
              //       <p>{selectedGear.HP || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>MP:</h4>
              //       <p>{selectedGear.MP || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>ATK:</h4>
              //       <p>{selectedGear.ATK || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>M.ATK:</h4>
              //       <p>{selectedGear['M.ATK'] || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>IED:</h4>
              //       <p>{selectedGear.IED || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>BOSS DAMAGE:</h4>
              //       <p>{selectedGear['BOSS DAMAGE'] || 0}</p>
              //     </div>

              //     <div className="flex justify-between w-full">
              //       <h4>DAMAGE:</h4>
              //       <p>{selectedGear.DAMAGE || 0}</p>
              //     </div>
              //   </div>
              // </>
              <div className="flex items-center justify-center w-full h-full">
                <p>Select an item to view details</p>
              </div>
            )}
          </div>
          <div className="flex w-full h-full gap-[16px]">
            <SfCost />
            <CubeCost />
          </div>
          <div className="flex w-full h-full gap-[16px]">
            <div className="flex w-full flex-col border rounded-[8px] p-[12px] gap-[4px]">
              <h4>Total Cost</h4>
              <div className="grid grid-cols-4 w-full h-full gap-x-[16px] gap-y-[4px] items-center">
                <h4 className="flex justify-start h-full w-full items-center">
                  Median:
                </h4>
                <p className="font-normal flex justify-end h-full w-full items-center">
                  140 B
                </p>
                <h4 className="flex justify-start h-full w-full items-center">
                  Unlucky:
                </h4>
                <p className="font-normal flex justify-end h-full w-full items-center">
                  140 B
                </p>
                <h4 className="flex justify-start h-full w-full items-center">
                  Average:
                </h4>
                <p className="font-normal flex justify-end h-full w-full items-center">
                  140 B
                </p>
                <h4 className="flex justify-start h-full w-full items-center">
                  Lucky:
                </h4>
                <p className="font-normal flex justify-end h-full w-full items-center">
                  140 B
                </p>
              </div>
              <div className="flex justify-between">
                <h4 className="flex justify-start h-full w-full items-center">
                  Average Spares:
                </h4>
                <p className="font-normal flex justify-end h-full w-full items-center">
                  40
                </p>
              </div>
            </div>
            <div className="flex w-full flex-col border rounded-[8px] p-[12px] gap-[4px] justify-between">
              <h4 className="opacity-60">Meso/1FD</h4>
              <div className="flex flex-col w-full h-full justify-end items-end">
                <h1 className="flex text-[72px] leading-[72px] font-bold w-full justify-end items-end">
                  ~10B
                </h1>
              </div>
            </div>
          </div>
          <div className="flex w-full h-full gap-[16px] border p-[12px] rounded-[8px]">
            <h4 className="opacity-60">FD</h4>
            <div className="flex flex-col w-full h-full justify-end items-end">
              <h1 className="flex text-[72px] leading-[72px] font-bold w-full justify-end items-end">
                ~20.1%
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
