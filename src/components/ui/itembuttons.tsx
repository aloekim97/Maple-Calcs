import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import type { Item } from '../../../types/item';

// Dynamically load the Image component only when needed
const NextImage = dynamic(() => import('next/image'), {
  loading: () => <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-[4px]" />,
  ssr: false
});

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
  priority?: boolean;
}

const FALLBACK_IMAGE = 'https://5pd8q9yvpv.ufs.sh/f/8nGwjuDDSJXHACoDMprTLW4BhN1zuUS7DEpgGnjdv6aKerOM';

const getJobColor = (job: string | null): string => {
  const colorMap: Record<string, string> = {
    'Warrior': '#DD242399',
    'Mage': '#0085F199',
    'Bowman': '#05980099',
    'Thief': '#DD911999',
    'Pirate': '#591AD499'
  };
  return colorMap[job || ''] || '#00000099';
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

    const img = new Image();
    img.src = imageSrc;

    const handleLoad = () => {
      setIsLoaded(true);
      cleanup();
    };

    const handleError = () => {
      if (imageSrc !== FALLBACK_IMAGE) {
        setImageSrc(FALLBACK_IMAGE);
      } else {
        setIsLoaded(true); 
      }
      cleanup();
    };

    const cleanup = () => {
      img.onload = null;
      img.onerror = null;
    };

    img.onload = handleLoad;
    img.onerror = handleError;

    return cleanup;
  }, [inView, priority, imageSrc]);

  const itemName = item['Item Name'].replace(/_/g, ' ');
  const buttonClass = "pr-[4px] pl-[4px] pb-[4px] hover:cursor-pointer";
  const imageContainerClass = "relative size-[40px] p-[4px] border-[1px] rounded-[8px] border-opacity-20 hover:border-[2px] transition-all duration-50 hover:cursor-pointer";

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={buttonClass}
      title={itemName}
      aria-label={`${itemName} item button`}
    >
      <div className={imageContainerClass} style={{ borderColor }}>
        {isLoaded ? (
          <NextImage
            src={imageSrc}
            alt={itemName}
            width={40}
            height={40}
            loading={priority ? 'eager' : 'lazy'}
            priority={priority}
            onError={() => {
              setImageSrc(FALLBACK_IMAGE);
              setIsLoaded(false);
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