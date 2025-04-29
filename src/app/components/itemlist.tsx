'use client';
import { useState, useMemo, useCallback, useRef } from 'react';
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
  setWeeklyIncome: Dispatch<SetStateAction<string>>;
  weeklyIncome: string;
}

const ITEM_TYPES = [
  'Weapon',
  'Secondary',
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
  weeklyIncome,
  setWeeklyIncome,
}: ItemsPageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [itemType, setItemType] = useState<string | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [itemSet, setItemSet] = useState<string | null>(null);
  const [jobFilter, setJobFilter] = useState<string | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Custom debounce function
  const debounceSearch = useCallback((value: string) => {
    clearTimeout(searchTimeoutRef.current);
    searchTimeoutRef.current = setTimeout(() => {
      setSearchTerm(value);
    }, 300);
  }, []);

  // Optimized filtered items calculation
  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return itemList.filter((item) => {
      const matchesSearch =
        term === '' || item['Item Name']?.toLowerCase().includes(term);
      const matchesType = !itemType || item.Type === itemType;
      const matchesSet = !itemSet || item.Set === itemSet;
      const matchesJob = !jobFilter || item.Job === jobFilter;

      return matchesSearch && matchesType && matchesSet && matchesJob;
    });
  }, [searchTerm, itemType, itemSet, jobFilter]);

  // Optimized handlers
  const handleSetNumberChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '' || !isNaN(Number(value))) {
        setSetNumber(value);
      }
    },
    [setSetNumber]
  );

  const handleWeeklyIncomeChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === '' || /^[0-9]*\.?[0-9]*$/.test(value)) {
        setWeeklyIncome(value);
      }
    },
    [setWeeklyIncome]
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debounceSearch(e.target.value);
    },
    [debounceSearch]
  );

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
    <div className="p-[16px] flex flex-col gap-2 grow">
      <div className="flex gap-2">
        <FilterSection label="Search Items">
          <Input2
            type="text"
            placeholder="Search..."
            value={searchTerm ?? ''}
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
        <div className="flex w-px rounded-full h-full bg-black opacity-20" />

        <FilterSection label="Weekly Income">
          <Input
            type="number"
            placeholder="B/Week"
            value={weeklyIncome ?? ''}
            onChange={handleWeeklyIncomeChange}
            min={1}
            onBlur={(e) => {
              const value = e.target.value;
              setWeeklyIncome(value === '' ? '0' : value);
            }}
          />
        </FilterSection>

        <div className="flex w-px rounded-full h-full bg-black opacity-20" />

        <FilterSection label="Set Number">
          <Input
            type="number"
            placeholder="Set#"
            value={setNumber ?? ''}
            onChange={handleSetNumberChange}
            min={1}
            onBlur={(e) => {
              const value = e.target.value;
              setSetNumber(value === '' ? '0' : value);
            }}
          />
        </FilterSection>
      </div>

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
