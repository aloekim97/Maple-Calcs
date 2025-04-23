'use client';
import { useState, useMemo, useCallback } from 'react';
import items from '../../../public/data.json';
import ItemButton from '@/components/ui/itembuttons';
import { Item } from '../../../types/item';
import { Dispatch, SetStateAction } from 'react';
import { Input2 } from '@/components/ui/search';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/filter';

interface ItemsPageProps {
  setSelectedGear: Dispatch<SetStateAction<Item | null>>;
  setNumber: string;
  setSetNumber: Dispatch<SetStateAction<string>>;
}

// Constants for better maintainability
const ITEM_TYPES = [
  'Weapon',
  'Emblem',
  'Hat',
  'Top',
  'Bottom',
  'Shoes',
  'Gloves',
  'Cape/Belt/Shoulder',
  'Accessory',
  'Pocket',
  'Badge',
  'Heart',
];

const JOB_TYPES = ['Warrior', 'Mage', 'Bowman', 'Thief', 'Pirate'];

const itemList = items as Item[];

const ItemsPage = ({
  setSelectedGear,
  setNumber,
  setSetNumber,
}: ItemsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemType, setItemType] = useState<string | null>(null);
  const [itemSet, setItemSet] = useState<string | null>(null);
  const [jobFilter, setJobFilter] = useState<string | null>(null);

  const filteredItems = useMemo(() => {
    return itemList.filter((item) => {
      const matchesSearch = item['Item Name']
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesType = itemType ? item.Type === itemType : true;
      const matchesSet = itemSet ? item.Set === itemSet : true;
      const matchesJob = jobFilter ? item.Job === jobFilter : true;

      return matchesSearch && matchesType && matchesSet && matchesJob;
    });
  }, [searchTerm, itemType, itemSet, jobFilter]);

  const handleSetNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSetNumber(value || '1');
    },
    [setSetNumber]
  );

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleTypeFilter = useCallback((val: string) => {
    setItemType(val === 'all' ? null : val);
  }, []);

  const handleJobFilter = useCallback((val: string) => {
    setJobFilter(val === 'all' ? null : val);
  }, []);

  const handleItemSelect = useCallback(
    (item: Item) => {
      setSelectedGear(item);
    },
    [setSelectedGear]
  );

  return (
    <div className="p-4 flex flex-col gap-2">
      <div className="flex gap-2">
        <FilterSection label="Search Items">
          <Input2
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </FilterSection>

        <FilterSection label="Filter by Type">
          <Select value={itemType || 'all'} onValueChange={handleTypeFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Type</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {ITEM_TYPES.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterSection>

        {/* Job Filter */}
        <FilterSection label="Filter by Job">
          <Select value={jobFilter || 'all'} onValueChange={handleJobFilter}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by Job" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Job</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                {JOB_TYPES.map((job) => (
                  <SelectItem key={job} value={job}>
                    {job}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </FilterSection>

        {/* Divider */}
        <div className="flex w-px rounded-full h-full bg-black opacity-20" />

        {/* Set Number Input */}
        <FilterSection label="Set Number">
          <Input
            type="number"
            placeholder="Set#"
            value={setNumber}
            onChange={handleSetNumberChange}
            min={1}
          />
        </FilterSection>
      </div>

      {/* Items Grid */}
      <div className="grid grid-cols-14 overflow-y-auto w-full justify-start items-start overflow-x-hidden pr-1 pt-0">
        {filteredItems.map((item) => (
          <ItemButton
            key={`${item['Item Name']}-${item.Type}`}
            item={item}
            onClick={() => handleItemSelect(item)}
          />
        ))}
      </div>
    </div>
  );
};

// Helper component for filter sections
const FilterSection = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="flex-1 flex-col gap-1">
    <p className="p3 opacity-60">{label}</p>
    {children}
  </div>
);

export default ItemsPage;
