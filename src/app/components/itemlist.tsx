'use client';
import items from '../../../public/data.json';
import ItemButton from '@/components/ui/itembuttons';
import { Item } from '../../../types/item';
import { Dispatch, SetStateAction } from 'react';

interface ItemsPageProps {
  setSelectedGear: Dispatch<SetStateAction<Item | null>>;
}

const itemList = items as Item[];

const ItemsPage = ({ setSelectedGear }: ItemsPageProps) => {
  const handleItemClick = (item: Item) => {
    console.log('Selected item:', item);
    setSelectedGear(item);
  };

  return (
    <div>
      <div className="grid grid-cols-14 overflow-y-auto h-full w-full">
        {itemList.map((item) => (
          <ItemButton
            key={item["Item Name"]}
            item={item}
            onClick={() => handleItemClick(item)}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;