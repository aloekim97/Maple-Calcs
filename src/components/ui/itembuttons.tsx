import Image from 'next/image';
import { Item } from '../../../types/item';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
  priority?: boolean;
}

const getJobColor = (job: string | null): string => {
  switch (job) {
    case 'Warrior':
      return '#DD242399';
    case 'Mage':
      return '#0085F199';
    case 'Bowman':
      return '#05980099';
    case 'Thief':
      return '#DD911999';
    case 'Pirate':
      return '#591AD499';
    default:
      return '#00000099';
  }
};

const ItemButton = ({ item, onClick, priority = false }: ItemButtonProps) => {
  const [imageSrc, setImageSrc] = useState(
    `/image/items/${item['Item Name']}.png`
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const borderColor = getJobColor(item.Job);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px',
    threshold: 0.01,
  });

  useEffect(() => {
    if (!inView && !priority) return;

    // Create image element without 'new' keyword
    const img = document.createElement('img');
    img.src = `/image/items/${item['Item Name']}.png`;

    const handleLoad = () => {
      setIsLoaded(true);
      // Clean up event listeners
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };

    const handleError = () => {
      setImageSrc('/image/items/fallback.png');
      setIsLoaded(true);
      // Clean up event listeners
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };

    img.addEventListener('load', handleLoad);
    img.addEventListener('error', handleError);

    // Cleanup function
    return () => {
      img.removeEventListener('load', handleLoad);
      img.removeEventListener('error', handleError);
    };
  }, [inView, item, priority]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="pr-[4px] pl-[4px] pb-[4px] hover:cursor-pointer"
      title={item['Item Name'].replace(/_/g, ' ')}
      aria-label={`${item['Item Name'].replace(/_/g, ' ')} item button`}
    >
      <div
        className="relative size-[40px] p-[4px] border-[1px] rounded-[8px] border-opacity-20 hover:border-[2px] transition-all duration-50 hover:cursor-pointer"
        style={{ borderColor }}
      >
        {isLoaded ? (
          <Image
            src={imageSrc}
            alt={item['Item Name'].replace(/_/g, ' ')}
            width={40}
            height={40}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            onError={() => {
              setImageSrc('/image/items/fallback.png');
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[4px] hover:cursor-pointer"></div>
        )}
      </div>
    </button>
  );
};

export default ItemButton;
