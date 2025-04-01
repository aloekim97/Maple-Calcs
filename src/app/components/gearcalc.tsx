'use client';
import StarForce from './starforce';
import Cube from './cube';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ItemsPage from './itemlist';
import { useState } from 'react';
import { Item } from '../../../types/item';

export default function GearCalculator() {
  const [selectedGear, setSelectedGear] = useState<Item | null>(null);
  console.log(selectedGear);
  return (
    <div className="flex flex-col w-[1440px] h-[924px] py-[32px] gap-[32px]">
      <div className="flex gap-[4px] h-[64px] w-full justify-center items-center">
        <Image src="image/geardiff.svg" width={28} height={32} alt="geardiff" />
        <h2 className="">Gear Diff</h2>
      </div>
      <div className="flex grow h-full gap-[32px]">
        <div className="flex flex-col w-full gap-[32px]">
          <div className="flex w-full h-[640px] overflow-hidden bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]">
            <ItemsPage setSelectedGear={setSelectedGear} />
          </div>
          <div className="flex w-full gap-[32px]">
            <div className="w-full">
              <StarForce selectedGear={selectedGear}/>
            </div>
            <div className="w-full">
              <Cube selectedGear={selectedGear}/>
            </div>
          </div>
          <Button />
        </div>
        <div className="flex w-full h-full bg-white rounded-[16px] shadow-[0px_4px_8px_4px_rgba(0,0,0,0.1)]"></div>
      </div>
    </div>
  );
}
