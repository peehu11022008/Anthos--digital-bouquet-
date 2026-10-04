'use client';

import React, { useState } from 'react';
import type { GardenFlower as GardenFlowerType } from '@/types';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { FLOWER_REGISTRY } from '@/lib/flowers';
import { formatDate } from '@/lib/utils';

interface GardenFlowerProps {
  flower: GardenFlowerType;
}

export const GardenFlower: React.FC<GardenFlowerProps> = ({ flower }) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const FlowerComp = FLOWER_COMPONENT_MAP[flower.flowerKey];
  const flowerData = FLOWER_REGISTRY[flower.flowerKey];

  if (!FlowerComp) return null;

  return (
    <div
      className="absolute cursor-pointer select-none transition-transform hover:scale-110 active:scale-95"
      style={{
        left: `${flower.x}%`,
        top: `${flower.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
      onClick={() => setShowTooltip(!showTooltip)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Visual Flower Component */}
      <div className="w-16 h-24 flex items-center justify-center filter drop-shadow-sm">
        <FlowerComp
          petalColor={flower.petalColor}
          stemColor={flower.stemColor}
          width={60}
          height={90}
        />
      </div>

      {/* Tooltip Card */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-30 w-44 bg-cream rounded-2xl p-2.5 shadow-soft-lg border border-blush/30 text-center pointer-events-none">
          <p className="text-xs font-bold text-text-dark font-sans">
            {flowerData?.name || 'Flower'}
          </p>
          <p className="text-[11px] text-text-muted mt-0.5 line-clamp-1 italic">
            From &ldquo;{flower.bouquetName}&rdquo;
          </p>
          <p className="text-[10px] text-blush-dark font-medium mt-1">
            Planted {formatDate(flower.plantedAt)}
          </p>
        </div>
      )}
    </div>
  );
};
