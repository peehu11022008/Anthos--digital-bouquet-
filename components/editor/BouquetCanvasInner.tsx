'use client';

import React, { useState, useMemo } from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { InteractiveCanvasItem } from './InteractiveCanvasItem';
import { SelectionToolbar } from './SelectionToolbar';
import { ColorPanel } from './ColorPanel';
import { MeaningModal } from './MeaningModal';
import { SCENE_COMPONENT_MAP } from '@/components/scenes';

interface BouquetCanvasInnerProps {
  width: number;
  height: number;
}

export const BouquetCanvasInner: React.FC<BouquetCanvasInnerProps> = ({ width, height }) => {
  const {
    flowers,
    accessories,
    selectedId,
    sceneKey,
    timeOfDay,
    setSelectedId,
    updateFlower,
    updateAccessory,
  } = useBouquetStore();

  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [isMeaningModalOpen, setIsMeaningModalOpen] = useState(false);

  // Combine items and sort by zIndex
  const sortedItems = useMemo(() => {
    const flowerItems = flowers.map((f) => ({ ...f, type: 'flower' as const }));
    const accessoryItems = accessories.map((a) => ({ ...a, type: 'accessory' as const }));
    return [...flowerItems, ...accessoryItems].sort((a, b) => a.zIndex - b.zIndex);
  }, [flowers, accessories]);

  const handleCanvasClick = (e: React.MouseEvent) => {
    // If clicked directly on the canvas background, deselect
    if (e.target === e.currentTarget) {
      setSelectedId(null, null);
    }
  };

  const SceneComponent = SCENE_COMPONENT_MAP[sceneKey];

  return (
    <div
      onClick={handleCanvasClick}
      className="relative w-full h-full flex items-center justify-center overflow-hidden bg-cream-dark select-none"
    >
      {/* Background Scene */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {SceneComponent && (
          <SceneComponent timeOfDay={timeOfDay} width="100%" height="100%" />
        )}
      </div>

      {/* Floating Toolbar when an element is selected */}
      <SelectionToolbar
        onOpenColor={() => setIsColorModalOpen(true)}
        onOpenMeaning={() => setIsMeaningModalOpen(true)}
      />

      {/* Interactive Element Layer */}
      <div
        className="relative z-10 w-full h-full overflow-hidden"
        style={{ width: `${width}px`, height: `${height}px` }}
        onClick={handleCanvasClick}
      >
        {sortedItems.map((item) => {
          return (
            <InteractiveCanvasItem
              key={item.id}
              item={item}
              isSelected={selectedId === item.id}
              onSelect={() => setSelectedId(item.id, item.type)}
              onChange={(patch) => {
                if (item.type === 'flower') {
                  updateFlower(item.id, patch);
                } else {
                  updateAccessory(item.id, patch);
                }
              }}
              onDoubleClick={() => setIsColorModalOpen(true)}
            />
          );
        })}
      </div>

      {/* Modals */}
      <ColorPanel
        isOpen={isColorModalOpen}
        onClose={() => setIsColorModalOpen(false)}
      />
      <MeaningModal
        isOpen={isMeaningModalOpen}
        onClose={() => setIsMeaningModalOpen(false)}
      />

      {/* Empty State Instruction if no flowers placed yet */}
      {flowers.length === 0 && accessories.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
          <div className="bg-cream/90 backdrop-blur-sm px-6 py-4 rounded-3xl shadow-soft border border-blush/30 text-center max-w-xs">
            <p className="text-sm font-semibold text-text-dark font-sans">
              Your canvas is ready
            </p>
            <p className="text-xs text-text-soft mt-1">
              Pick flowers from the sidebar to start arranging your bouquet.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
