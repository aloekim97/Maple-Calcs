import Image from 'next/image';
import { Item } from "../../../types/item"

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
}

const getJobColor = (job: string | null): string => {
  switch (job) {
    case 'WARRIOR': return '#DD242399';
    case 'MAGE': return '#0085F199';
    case 'BOWMAN': return '#05980099';
    case 'THIEF': return '#DD911999';
    case 'PIRATE': return '#591AD499';
    default: return '#00000099';
  }
};

const ItemButton = ({ item, onClick }: ItemButtonProps) => {
  const imagePath = `/image/items/${item["Item Name"]}.png`;
  const borderColor = getJobColor(item.Job);

  return (
    <button
      onClick={onClick}
      className="p-1 hover:cursor-pointer transition-transform duration-200"
      title={item["Item Name"].replace(/_/g, ' ')}
    >
      <div
        className="relative size-[40px] p-[4px] border rounded-[8px] border-opacity-20 hover:border-[2px] transition-opacity duration-200"
        style={{ borderColor }}
      >
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