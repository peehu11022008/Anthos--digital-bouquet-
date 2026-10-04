'use client';

import React from 'react';
import { Modal } from '@/components/ui/Modal';
import { FLOWER_REGISTRY } from '@/lib/flowers';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { useBouquetStore } from '@/store/bouquetStore';
import { Sparkles, Heart } from 'lucide-react';

interface MeaningModalProps {
  isOpen: boolean;
  onClose: () => void;
  flowerKey?: string | null;
}

export const MeaningModal: React.FC<MeaningModalProps> = ({
  isOpen,
  onClose,
  flowerKey,
}) => {
  const { selectedId, selectedType, flowers } = useBouquetStore();

  const activeKey =
    flowerKey ||
    (selectedType === 'flower' && selectedId
      ? flowers.find((f) => f.id === selectedId)?.flowerKey
      : null);

  const flowerData = activeKey ? FLOWER_REGISTRY[activeKey] : null;
  const FlowerComp = activeKey ? FLOWER_COMPONENT_MAP[activeKey] : null;

  if (!flowerData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      <div className="flex flex-col items-center text-center p-2">
        {/* Flower SVG Illustration */}
        <div className="w-24 h-32 flex items-center justify-center mb-3">
          {FlowerComp && (
            <FlowerComp
              petalColor={flowerData.defaultPetalColor}
              stemColor={flowerData.defaultStemColor}
              width={90}
              height={130}
            />
          )}
        </div>

        {/* Flower Name */}
        <h3 className="text-2xl font-bold text-text-dark font-sans tracking-wide">
          {flowerData.name}
        </h3>
        <span className="text-xs uppercase tracking-wider font-semibold text-blush-dark bg-blush-light px-3 py-1 rounded-full mt-1.5 mb-4">
          {flowerData.category}
        </span>

        {/* Meaning Quote Box */}
        <div className="w-full bg-cream-dark/60 border border-blush/30 rounded-2xl p-4 my-2 text-text-dark">
          <p className="text-base font-handwriting text-xl leading-relaxed text-text-dark">
            &ldquo;{flowerData.meaning}&rdquo;
          </p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap justify-center gap-1.5 mt-3">
          {flowerData.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-text-soft bg-cream-dark px-2.5 py-1 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </Modal>
  );
};
