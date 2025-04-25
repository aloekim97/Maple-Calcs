import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useInView } from 'react-intersection-observer';
import type { Item } from '../../../types/item';

// Configuration constants
const FALLBACK_IMAGE = '/optimized-fallback.webp';
const ITEM_SIZE = 40; // Fixed size for all item buttons
const JOB_COLORS: Record<string, string> = {
  'Warrior': '#DD242399',
  'Mage': '#0085F199',
  'Bowman': '#05980099',
  'Thief': '#DD911999',
  'Pirate': '#591AD499'
};

// Dynamically load Next.js Image with skeleton fallback
const NextImage = dynamic(() => import('next/image'), {
  loading: () => (
    <div 
      className="absolute inset-0 bg-gray-200 animate-pulse rounded-[4px]" 
      style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
    />
  ),
  ssr: false
});

interface ItemButtonProps {
  item: Item;
  onClick?: () => void;
  priority?: boolean;
}

const ItemButton = ({ item, onClick, priority = false }: ItemButtonProps) => {
  const [imageState, setImageState] = useState({
    src: item.url,
    loaded: false,
    error: false
  });

  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: '200px',
    threshold: 0.01,
  });

  useEffect(() => {
    if (!inView && !priority) return;

    const img = new Image();
    img.src = imageState.src;

    const handleLoad = () => {
      setImageState(prev => ({ ...prev, loaded: true }));
      cleanup();
    };

    const handleError = () => {
      if (!imageState.error) {
        setImageState({
          src: FALLBACK_IMAGE,
          loaded: false,
          error: true
        });
      } else {
        setImageState(prev => ({ ...prev, loaded: true }));
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
  }, [inView, priority, imageState.src, imageState.error]);

  const itemName = item['Item Name'].replace(/_/g, ' ');
  const borderColor = JOB_COLORS[item.Job || ''] || '#00000099';

  return (
    <button
      ref={ref}
      onClick={onClick}
      className="pr-[4px] pl-[4px] pb-[4px] hover:cursor-pointer"
      title={itemName}
      aria-label={`${itemName} item button`}
      style={{
        width: ITEM_SIZE,
        height: ITEM_SIZE
      }}
    >
      <div 
        className="relative p-[4px] border-[1px] rounded-[8px] border-opacity-20 hover:border-[2px] transition-all duration-50"
        style={{ 
          borderColor,
          width: ITEM_SIZE,
          height: ITEM_SIZE
        }}
      >
        {imageState.loaded ? (
          <NextImage
            src={imageState.src}
            alt={itemName}
            width={ITEM_SIZE}
            height={ITEM_SIZE}
            loading={priority ? 'eager' : 'lazy'}
            quality={75} // Optimized quality setting
            priority={priority}
            onError={() => {
              setImageState({
                src: FALLBACK_IMAGE,
                loaded: false,
                error: true
              });
            }}
            className="object-contain" // Ensures proper image fitting
          />
        ) : (
          <div 
            className="absolute inset-0 bg-gray-200 animate-pulse rounded-[4px]"
            style={{ width: ITEM_SIZE, height: ITEM_SIZE }}
          />
        )}
      </div>
    </button>
  );
};

export default ItemButton;