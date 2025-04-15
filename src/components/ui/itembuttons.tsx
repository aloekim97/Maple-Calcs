import Image from 'next/image';
import { Item } from '../../../types/item';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
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

const ItemButton = ({ item, onClick }: ItemButtonProps) => {
  const [imageSrc, setImageSrc] = useState(
    `/image/items/${item['Item Name']}.png`
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const borderColor = getJobColor(item.Job);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px 0px', // Load when 200px away from viewport
  });

  useEffect(() => {
    if (!inView) return;

    const loadImage = async () => {
      // 1. Check cache first
      if ('caches' in window) {
        const cached = await caches.match(
          `/image/items/${item['Item Name']}.png`
        );
        if (cached) {
          setIsLoaded(true);
          return;
        }
      }

      // 2. Fallback to network with timeout
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000);

      const res = await fetch(`/image/items/${item['Item Name']}.png`, {
        signal: controller.signal,
      });
      clearTimeout(timeout);

      if (!res.ok) throw new Error('Failed to load');
      setIsLoaded(true);
    };

    loadImage();
  }, [inView, item]);

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
            width={100}
            height={100}
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
