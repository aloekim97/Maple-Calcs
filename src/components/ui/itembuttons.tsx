import Image from 'next/image';
import { Item } from '../../../types/item';

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
}

const ItemButton = ({ item, onClick }: ItemButtonProps) => {
  const imagePath = `/image/items/${item['Item Name']}.png`;
  ///image/items/${item["Item Name"]}.png
  return (
    <button
      onClick={onClick}
      className="p-1 hover:scale-105 transition-transform duration-200"
      title={item['Item Name'].replace(/_/g, ' ')}
    >
      <div className="relative size-[40px] p-[4px]">
        <Image
          src={imagePath}
          alt={item['Item Name'].replace(/_/g, ' ')}
          fill
          objectFit="contain"
          className="rounded-md"
        />
      </div>
    </button>
  );
};

export default ItemButton;
