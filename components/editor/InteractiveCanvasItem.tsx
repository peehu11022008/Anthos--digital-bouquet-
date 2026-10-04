'use client';

import React, { useRef, useState, useCallback } from 'react';
import type { FlowerInstance, AccessoryInstance } from '@/types';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { ACCESSORY_COMPONENT_MAP } from '@/components/accessories';
import { RotateCw } from 'lucide-react';

interface InteractiveCanvasItemProps {
  item: (FlowerInstance | AccessoryInstance) & { type: 'flower' | 'accessory' };
  isSelected: boolean;
  onSelect: () => void;
  onChange: (patch: Partial<FlowerInstance | AccessoryInstance>) => void;
  onDoubleClick: () => void;
}

export const InteractiveCanvasItem: React.FC<InteractiveCanvasItemProps> = ({
  item,
  isSelected,
  onSelect,
  onChange,
  onDoubleClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ clientX: number; clientY: number; startX: number; startY: number }>({
    clientX: 0,
    clientY: 0,
    startX: 0,
    startY: 0,
  });

  // ── Dragging the Item ──────────────────────────────────────────
  const handlePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect();

    dragStartRef.current = {
      clientX: e.clientX,
      clientY: e.clientY,
      startX: item.x,
      startY: item.y,
    };

    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartRef.current.clientX;
    const deltaY = e.clientY - dragStartRef.current.clientY;

    onChange({
      x: dragStartRef.current.startX + deltaX,
      y: dragStartRef.current.startY + deltaY,
    });
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging) {
      setIsDragging(false);
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {
        // Safe fallback
      }
    }
  };

  // ── Rotating via Top Handle ────────────────────────────────────
  const handleRotatePointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    const handleEl = e.currentTarget;
    handleEl.setPointerCapture(e.pointerId);

    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const angleRad = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
      let angleDeg = angleRad * (180 / Math.PI) + 90;
      if (angleDeg < 0) angleDeg += 360;

      onChange({ rotation: Math.round(angleDeg) });
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        handleEl.releasePointerCapture(upEvent.pointerId);
      } catch {}
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // ── Scaling via Corner Handle ──────────────────────────────────
  const handleScalePointerDown = (e: React.PointerEvent, corner: 'tl' | 'tr' | 'bl' | 'br') => {
    e.stopPropagation();
    const handleEl = e.currentTarget;
    handleEl.setPointerCapture(e.pointerId);

    const startClientX = e.clientX;
    const startClientY = e.clientY;
    const startScaleX = item.scaleX || 1;
    const startScaleY = item.scaleY || 1;

    const onPointerMove = (moveEvent: PointerEvent) => {
      const deltaX = moveEvent.clientX - startClientX;
      const deltaY = moveEvent.clientY - startClientY;
      const distDelta = (corner === 'br' || corner === 'tr' ? deltaX : -deltaX) +
                        (corner === 'br' || corner === 'bl' ? deltaY : -deltaY);

      const scaleChange = distDelta * 0.008;
      const newScale = Math.max(0.3, Math.min(2.5, startScaleX + scaleChange));

      onChange({
        scaleX: Number(newScale.toFixed(2)),
        scaleY: Number(newScale.toFixed(2)),
      });
    };

    const onPointerUp = (upEvent: PointerEvent) => {
      try {
        handleEl.releasePointerCapture(upEvent.pointerId);
      } catch {}
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  const isFlower = item.type === 'flower';
  const FlowerComp = isFlower && 'flowerKey' in item ? FLOWER_COMPONENT_MAP[item.flowerKey] : null;
  const AccComp = !isFlower && 'accessoryKey' in item ? ACCESSORY_COMPONENT_MAP[item.accessoryKey] : null;

  return (
    <div
      ref={containerRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onDoubleClick={(e) => {
        e.stopPropagation();
        onDoubleClick();
      }}
      className={`absolute select-none cursor-move touch-none transition-shadow ${
        isDragging ? 'opacity-90' : 'opacity-100'
      }`}
      style={{
        left: `${item.x}px`,
        top: `${item.y}px`,
        zIndex: item.zIndex,
        transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg) scale(${item.scaleX || 1}, ${item.scaleY || 1})`,
      }}
    >
      {/* SVG Element */}
      <div className="relative pointer-events-auto filter drop-shadow-sm">
        {isFlower && FlowerComp && 'petalColor' in item && (
          <FlowerComp
            petalColor={item.petalColor}
            stemColor={item.stemColor}
            width={120}
            height={180}
          />
        )}
        {!isFlower && AccComp && 'color' in item && (
          <AccComp color={item.color} width={80} height={80} />
        )}
      </div>

      {/* Selected Transform Box & Handles */}
      {isSelected && (
        <div className="absolute inset-0 -m-2 border-2 border-dashed border-blush rounded-2xl pointer-events-none">
          {/* Top Rotation Handle */}
          <div
            onPointerDown={handleRotatePointerDown}
            className="absolute -top-7 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-cream border-2 border-blush flex items-center justify-center text-blush-dark shadow-xs cursor-grab active:cursor-grabbing pointer-events-auto transition-transform hover:scale-110"
            title="Rotate"
          >
            <RotateCw size={12} />
          </div>
          {/* Stem line to rotate handle */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-0.5 h-2 bg-blush" />

          {/* 4 Corner Scale Handles */}
          <div
            onPointerDown={(e) => handleScalePointerDown(e, 'tl')}
            className="absolute -top-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-cream border-2 border-blush pointer-events-auto cursor-nwse-resize shadow-xs hover:scale-125"
          />
          <div
            onPointerDown={(e) => handleScalePointerDown(e, 'tr')}
            className="absolute -top-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-cream border-2 border-blush pointer-events-auto cursor-nesw-resize shadow-xs hover:scale-125"
          />
          <div
            onPointerDown={(e) => handleScalePointerDown(e, 'bl')}
            className="absolute -bottom-1.5 -left-1.5 w-3.5 h-3.5 rounded-full bg-cream border-2 border-blush pointer-events-auto cursor-nesw-resize shadow-xs hover:scale-125"
          />
          <div
            onPointerDown={(e) => handleScalePointerDown(e, 'br')}
            className="absolute -bottom-1.5 -right-1.5 w-3.5 h-3.5 rounded-full bg-cream border-2 border-blush pointer-events-auto cursor-nwse-resize shadow-xs hover:scale-125"
          />
        </div>
      )}
    </div>
  );
};
