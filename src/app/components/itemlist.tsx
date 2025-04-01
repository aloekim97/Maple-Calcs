import items from '../../../public/data.json'; // adjust path to your JSON file
import ItemButton from '@/components/ui/itembuttons';
import { Item } from '../../../types/item';

// Cast the imported JSON to Item array
const itemList = items as Item[];

const ItemsPage = () => {
  const handleItemClick = (itemName: string) => {
    console.log('Selected item:', itemName);
    // Add your click handler logic here
  };

  return (
    <div>
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 overflow-auto h-full w-full">
        {itemList.map((item) => (
          <ItemButton
            key={item["Item Name"]}
            item={item}
            onClick={() => handleItemClick(item["Item Name"])}
          />
        ))}
      </div>
    </div>
  );
};

export default ItemsPage;