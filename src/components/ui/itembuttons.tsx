import Image from 'next/image';
import { Item } from '../../../types/item';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
  priority?: boolean;
}

const FALLBACK_IMAGE = 'https://5pd8q9yvpv.ufs.sh/f/8nGwjuDDSJXHACoDMprTLW4BhN1zuUS7DEpgGnjdv6aKerOM';

const getJobColor = (job: string | null): string => {
  switch (job) {
    case 'Warrior': return '#DD242399';
    case 'Mage': return '#0085F199';
    case 'Bowman': return '#05980099';
    case 'Thief': return '#DD911999';
    case 'Pirate': return '#591AD499';
    default: return '#00000099';
  }
};

const ItemButton = ({ item, onClick, priority = false }: ItemButtonProps) => {
  const [imageSrc, setImageSrc] = useState(item.url);
  const [isLoaded, setIsLoaded] = useState(false);
  const borderColor = getJobColor(item.Job);
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px',
    threshold: 0.01,
  });

  useEffect(() => {
    if (!inView && !priority) return;

    const img = document.createElement('img');
    img.src = imageSrc;

    const handleLoad = () => {
      setIsLoaded(true);
      // Clean up event listeners
      img.onload = null;
      img.onerror = null;
    };

    const handleError = () => {
      setImageSrc(FALLBACK_IMAGE);
      // Don't set isLoaded yet - let it try the fallback
      img.onload = null;
      img.onerror = null;
    };

    img.onload = handleLoad;
    img.onerror = handleError;

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [inView, priority, imageSrc]);

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
              setImageSrc(FALLBACK_IMAGE);
              setIsLoaded(false); // Retry with fallback
            }}
          />
        ) : (
          <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[4px]" />
        )}
      </div>
    </button>
  );
};

export default ItemButton;