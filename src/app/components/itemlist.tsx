'use client';
import { useState } from 'react';
import items from '../../../public/data.json';
import ItemButton from '@/components/ui/itembuttons';
import { Item } from '../../../types/item';
import { Dispatch, SetStateAction } from 'react';
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ItemsPageProps {
  setSelectedGear: Dispatch<SetStateAction<Item | null>>;
}

const itemList = items as Item[];

const ItemsPage = ({ setSelectedGear }: ItemsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemType, setItemType] = useState('');
  const [itemSet, setItemSet] = useState('');
  const [jobFilter, setJobFilter] = useState('');

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
    <div className="p-4">
      <div className="grid mb-4 space-y-4 grid-cols-4 gap-[8px]">
        <Input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <Select
          value={itemType}
          onValueChange={setItemType}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Item Types" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Item Type</SelectLabel>
              {['Weapon', 'Emblem', 'Hat', 'Top', 'Bottom', 'Shoes', 'Gloves', 
                'Cape/Belt/Shoulder', 'Accessory', 'Pocket', 'Badge', 'Heart'].map(type => (
                <SelectItem key={type} value={type}>{type}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={itemSet}
          onValueChange={setItemSet}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Sets" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Item Set</SelectLabel>
              {['CRA', 'Arcane', 'Eternal', 'Genesis', 'Boss', 'Dawn', 
                'Reinforced', 'Superior', 'Pitch'].map(set => (
                <SelectItem key={set} value={set}>{set}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={jobFilter}
          onValueChange={setJobFilter}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="All Jobs" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Job</SelectLabel>
              {['Warrior', 'Mage', 'Bowman', 'Thief', 'Pirate'].map(job => (
                <SelectItem key={job} value={job}>{job}</SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-14 overflow-y-auto h-full w-full">
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