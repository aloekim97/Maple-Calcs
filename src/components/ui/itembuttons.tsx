import Image from 'next/image';
import { Item } from "../../../types/item"

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
}

const ItemButton = ({ item, onClick }: ItemButtonProps) => {
  const imagePath = `/image/items/${item["Item Name"]}.png`;
  ///image/items/${item["Item Name"]}.png
  return (
    <button
      onClick={onClick}
      className="p-1 hover:cursor-pointer transition-transform duration-200"
      title={item["Item Name"].replace(/_/g, ' ')}
    >
      <div className="relative size-[40px] p-[4px] border rounded-[8px]">
        <Image
          src={imagePath}
          alt={item["Item Name"].replace(/_/g, ' ')}
          layout="fill"
          objectFit="contain"
          className="p-[4px]"
        />
      </div>
    </button>
  );
};

export default ItemButton;