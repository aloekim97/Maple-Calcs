'use client';
import { useState } from 'react';
import items from '../../../public/data.json';
import ItemButton from '@/components/ui/itembuttons';
import { Item } from '../../../types/item';
import { Dispatch, SetStateAction } from 'react';
import { Input } from "@/components/ui/search";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/filter"
import { Label } from '@radix-ui/react-label';

interface ItemsPageProps {
  setSelectedGear: Dispatch<SetStateAction<Item | null>>;
}

const itemList = items as Item[];

const ItemsPage = ({ setSelectedGear, setNumber, setSetNumber }: ItemsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemType, setItemType] = useState<string | null>(null);
  const [itemSet, setItemSet] = useState<string | null>(null);
  const [jobFilter, setJobFilter] = useState<string | null>(null);

  const changeNum = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Update parent state directly
    setSetNumber(value || ''); // Default to '2' if empty
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredItems = itemList.filter(item => {
    const matchesSearch = item["Item Name"].toLowerCase().includes(searchTerm);
    const matchesType = itemType ? item.Type === itemType : true;
    const matchesSet = itemSet ? item.Set === itemSet : true;
    const matchesJob = jobFilter ? item.Job === jobFilter : true;
    
    return matchesSearch && matchesType && matchesSet && matchesJob;
  });

  return (
    <div className="p-4 flex flex-col gap-[8px]">
      <div className="flex gap-[8px]">
        <div className='flex w-full flex-col gap-[4px]'>
          <p className='p3 opacity-60'>
            Search by Name
          </p>
          <Input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className='flex w-full flex-col gap-[4px]'>
          <p className='p3 opacity-60'>
            Filter by Type
          </p>
          <Select
            value={itemType || "all"}
            onValueChange={(val) => setItemType(val === "all" ? null : val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {[
                  'Weapon', 'Emblem', 'Hat', 'Top', 'Bottom', 'Shoes', 'Gloves', 
                  'Cape/Belt/Shoulder', 'Accessory', 'Pocket', 'Badge', 'Heart'
                ].map((type) => (
                  <SelectItem key={type} value={type}>{type}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-full flex-col gap-[4px]'>
          <p className='p3 opacity-60'>
            Filter by Set
          </p>
          <Select
            value={itemSet || "all"}
            onValueChange={(val) => setItemSet(val === "all" ? null : val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Set" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Set</SelectLabel>
                <SelectItem value="all">All</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Accessory</SelectLabel>
                {[
                  'Boss', 'Dawn', 'Reinforced', 'Superior', 'Pitch'
                ].map((set) => (
                  <SelectItem key={set} value={set}>{set}</SelectItem>
                ))}
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Class</SelectLabel>
                {[
                  'CRA', 'Arcane', 'Eternal', 'Genesis'
                ].map((set) => (
                  <SelectItem key={set} value={set}>{set}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className='flex w-full flex-col gap-[4px]'>
          <p className='p3 opacity-60'>
            Filter by Job
          </p>
          <Select
            value={jobFilter || "all"}
            onValueChange={(val) => setJobFilter(val === "all" ? null : val)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Job</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {['Warrior', 'Mage', 'Bowman', 'Thief', 'Pirate'].map((job) => (
                  <SelectItem key={job} value={job}>{job}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
          <div className='flex w-[1px] rounded-full h-full bg-black opacity-20'/>
          <div className='flex flex-col w-full gap-[4px]'>
            <p className='p3 opacity-60'>Set Number</p>
            <Input
              type="number"
              placeholder="Set#"
              value={setNumber}  // Use prop value
              onChange={changeNum}
            />
          </div>
      </div>

      <div className="grid grid-cols-14 overflow-y-auto w-full justify-start items-start">
        {filteredItems.map((item) => (
          <ItemButton
            key={item["Item Name"]}
            item={item}
            onClick={() => setSelectedGear(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;