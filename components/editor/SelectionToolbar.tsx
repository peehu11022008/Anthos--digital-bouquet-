'use client';

import React from 'react';
import { Palette, Copy, Trash2, ArrowUp, ArrowDown, Info } from 'lucide-react';
import { useBouquetStore } from '@/store/bouquetStore';
import { FLOWER_REGISTRY } from '@/lib/flowers';

interface SelectionToolbarProps {
  onOpenColor: () => void;
  onOpenMeaning: () => void;
}

export const SelectionToolbar: React.FC<SelectionToolbarProps> = ({
  onOpenColor,
  onOpenMeaning,
}) => {
  const {
    selectedId,
    selectedType,
    flowers,
    accessories,
    duplicateFlower,
    duplicateAccessory,
    removeFlower,
    removeAccessory,
    bringForward,
    sendBack,
  } = useBouquetStore();

  if (!selectedId || !selectedType) return null;

  const isFlower = selectedType === 'flower';
  const item = isFlower
    ? flowers.find((f) => f.id === selectedId)
    : accessories.find((a) => a.id === selectedId);

  if (!item) return null;

  const flowerData = isFlower && 'flowerKey' in item ? FLOWER_REGISTRY[item.flowerKey] : null;

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-cream/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-soft-lg border border-blush/30 flex items-center gap-1">
      {/* Element Name */}
      <span className="text-xs font-semibold text-text-dark px-2 border-r border-blush/30 select-none">
        {flowerData ? flowerData.name : 'Accessory'}
      </span>

      {/* Recolor Button */}
      <button
        onClick={onOpenColor}
        className="p-1.5 rounded-full text-text-soft hover:text-text-dark hover:bg-blush-light transition-colors"
        title="Change colors"
        aria-label="Change colors"
      >
        <Palette size={16} />
      </button>

      {/* Meaning Button (flowers only) */}
      {isFlower && (
        <button
          onClick={onOpenMeaning}
          className="p-1.5 rounded-full text-text-soft hover:text-text-dark hover:bg-blush-light transition-colors"
          title="Flower meaning"
          aria-label="Flower meaning"
        >
          <Info size={16} />
        </button>
      )}

      {/* Layer up */}
      <button
        onClick={() => bringForward(selectedId, selectedType)}
        className="p-1.5 rounded-full text-text-soft hover:text-text-dark hover:bg-blush-light transition-colors"
        title="Bring forward"
        aria-label="Bring forward"
      >
        <ArrowUp size={16} />
      </button>

      {/* Layer down */}
      <button
        onClick={() => sendBack(selectedId, selectedType)}
        className="p-1.5 rounded-full text-text-soft hover:text-text-dark hover:bg-blush-light transition-colors"
        title="Send backward"
        aria-label="Send backward"
      >
        <ArrowDown size={16} />
      </button>

      {/* Duplicate */}
      <button
        onClick={() => {
          if (isFlower) duplicateFlower(selectedId);
          else duplicateAccessory(selectedId);
        }}
        className="p-1.5 rounded-full text-text-soft hover:text-text-dark hover:bg-blush-light transition-colors"
        title="Duplicate"
        aria-label="Duplicate"
      >
        <Copy size={16} />
      </button>

      {/* Delete */}
      <button
        onClick={() => {
          if (isFlower) removeFlower(selectedId);
          else removeAccessory(selectedId);
        }}
        className="p-1.5 rounded-full text-red-500 hover:text-red-700 hover:bg-red-50 transition-colors"
        title="Remove"
        aria-label="Remove"
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
};
