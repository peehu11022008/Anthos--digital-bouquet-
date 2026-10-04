'use client';

import React from 'react';
import { Plus } from 'lucide-react';
import { ACCESSORIES } from '@/lib/accessories';
import { ACCESSORY_COMPONENT_MAP } from '@/components/accessories';
import { useBouquetStore } from '@/store/bouquetStore';

export const AccessoryPicker: React.FC = () => {
  const addAccessory = useBouquetStore((s) => s.addAccessory);

  return (
    <div className="flex flex-col h-full bg-cream border-r border-blush/20 w-72 sm:w-80 select-none">
      <div className="p-3 border-b border-blush/20">
        <h3 className="text-sm font-semibold text-text-dark">Bouquet Decorations</h3>
        <p className="text-[11px] text-text-muted mt-0.5">
          Add wraps, ribbons, butterflies, and gentle details.
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-2">
          {ACCESSORIES.map((acc) => {
            const AccComp = ACCESSORY_COMPONENT_MAP[acc.key];
            return (
              <div
                key={acc.key}
                onClick={() => addAccessory(acc.key)}
                className="group bg-cream-dark/60 hover:bg-cream-dark border border-blush/20 hover:border-blush rounded-2xl p-3 flex flex-col items-center text-center cursor-pointer transition-all duration-200 hover:shadow-soft"
              >
                {/* SVG Visual */}
                <div className="w-14 h-14 flex items-center justify-center transition-transform group-hover:scale-110">
                  {AccComp && <AccComp color={acc.defaultColor} width={48} height={48} />}
                </div>

                {/* Name */}
                <span className="text-xs font-semibold text-text-dark mt-2">
                  {acc.name}
                </span>

                {/* Add button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    addAccessory(acc.key);
                  }}
                  className="mt-2 w-full py-1 text-[11px] font-medium bg-lavender-light hover:bg-lavender text-text-dark rounded-full flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus size={12} />
                  Add
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
