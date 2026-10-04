'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { ColorGrid, PASTEL_PALETTE } from '@/components/ui/ColorSwatch';
import { FLOWER_REGISTRY } from '@/lib/flowers';
import { ACCESSORY_REGISTRY } from '@/lib/accessories';
import { Modal } from '@/components/ui/Modal';

interface ColorPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const STEM_PALETTE = [
  '#4ADE80', '#65A348', '#7AAB6A', '#6B9E5A',
  '#86A86A', '#5E9E4A', '#92400E', '#4B5563',
];

export const ColorPanel: React.FC<ColorPanelProps> = ({ isOpen, onClose }) => {
  const {
    selectedId,
    selectedType,
    flowers,
    accessories,
    updateFlower,
    updateAccessory,
  } = useBouquetStore();

  if (!selectedId || !selectedType) return null;

  const isFlower = selectedType === 'flower';
  const flower = isFlower ? flowers.find((f) => f.id === selectedId) : null;
  const accessory = !isFlower ? accessories.find((a) => a.id === selectedId) : null;

  const flowerData = flower ? FLOWER_REGISTRY[flower.flowerKey] : null;
  const accessoryData = accessory ? ACCESSORY_REGISTRY[accessory.accessoryKey] : null;

  const curatedColors = flowerData
    ? [flowerData.defaultPetalColor, ...flowerData.alternateColors]
    : accessoryData
    ? [accessoryData.defaultColor, ...accessoryData.alternateColors]
    : PASTEL_PALETTE.slice(0, 8);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={flowerData ? `Customize ${flowerData.name}` : 'Customize Color'}
      size="sm"
    >
      <div className="space-y-5">
        {/* Curated Colors */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-text-soft uppercase tracking-wide">
            Recommended Palette
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {curatedColors.map((color) => (
              <button
                key={color}
                onClick={() => {
                  if (isFlower) updateFlower(selectedId, { petalColor: color });
                  else updateAccessory(selectedId, { color });
                }}
                className="w-8 h-8 rounded-full border border-black/10 shadow-sm transition-transform hover:scale-110 active:scale-95"
                style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              />
            ))}
          </div>
        </div>

        {/* Full Pastel Palette for Petals/Accessory */}
        <ColorGrid
          label={isFlower ? 'Petal Color' : 'Accessory Color'}
          colors={PASTEL_PALETTE}
          selected={isFlower ? flower?.petalColor : accessory?.color}
          onSelect={(c) => {
            if (isFlower) updateFlower(selectedId, { petalColor: c });
            else updateAccessory(selectedId, { color: c });
          }}
          onCustom={(c) => {
            if (isFlower) updateFlower(selectedId, { petalColor: c });
            else updateAccessory(selectedId, { color: c });
          }}
        />

        {/* Stem & Leaves Color (flowers only) */}
        {isFlower && flower && (
          <ColorGrid
            label="Stem & Leaf Color"
            colors={STEM_PALETTE}
            selected={flower.stemColor}
            onSelect={(c) => updateFlower(selectedId, { stemColor: c })}
            onCustom={(c) => updateFlower(selectedId, { stemColor: c })}
          />
        )}
      </div>
    </Modal>
  );
};
