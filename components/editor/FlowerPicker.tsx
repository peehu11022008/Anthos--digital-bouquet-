'use client';

import React, { useState, useMemo } from 'react';
import { Search, Info, Plus } from 'lucide-react';
import { FLOWERS, FLOWER_CATEGORIES } from '@/lib/flowers';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { useBouquetStore } from '@/store/bouquetStore';
import type { FlowerCategory } from '@/types';

interface FlowerPickerProps {
  onOpenMeaning: (flowerKey: string) => void;
}

export const FlowerPicker: React.FC<FlowerPickerProps> = ({ onOpenMeaning }) => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const addFlower = useBouquetStore((s) => s.addFlower);

  const filteredFlowers = useMemo(() => {
    return FLOWERS.filter((flower) => {
      const matchesSearch =
        flower.name.toLowerCase().includes(search.toLowerCase()) ||
        flower.meaning.toLowerCase().includes(search.toLowerCase()) ||
        flower.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));

      const matchesCategory =
        activeCategory === 'All' || flower.category === activeCategory;

      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  return (
    <div className="flex flex-col h-full bg-cream border-r border-blush/20 w-72 sm:w-80 select-none">
      {/* Search Input */}
      <div className="p-3 border-b border-blush/20">
        <div className="relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" />
          <input
            type="text"
            placeholder="Search flowers or feelings..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs rounded-full bg-cream-dark border border-blush/20 text-text-dark placeholder-text-muted focus:outline-none focus:ring-1 focus:ring-blush"
          />
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 pb-0.5 no-scrollbar">
          {['All', ...FLOWER_CATEGORIES].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                activeCategory === cat
                  ? 'bg-blush text-text-dark font-semibold shadow-xs'
                  : 'bg-cream-dark text-text-soft hover:bg-blush-light'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Flower Grid */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          {filteredFlowers.map((flower) => {
            const FlowerComp = FLOWER_COMPONENT_MAP[flower.key];
            return (
              <div
                key={flower.key}
                className="group relative bg-cream-dark/60 hover:bg-cream-dark border border-blush/20 hover:border-blush rounded-2xl p-2.5 flex flex-col items-center text-center transition-all duration-200 hover:shadow-soft"
              >
                {/* Meaning trigger button in top-right */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenMeaning(flower.key);
                  }}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full text-text-muted hover:text-text-dark hover:bg-blush-light transition-colors"
                  title={`Meaning of ${flower.name}`}
                  aria-label={`Meaning of ${flower.name}`}
                >
                  <Info size={13} />
                </button>

                {/* SVG Visual */}
                <div
                  onClick={() => addFlower(flower.key)}
                  className="w-16 h-20 flex items-center justify-center cursor-pointer transition-transform group-hover:scale-105"
                >
                  {FlowerComp && (
                    <FlowerComp
                      petalColor={flower.defaultPetalColor}
                      stemColor={flower.defaultStemColor}
                      width={55}
                      height={75}
                    />
                  )}
                </div>

                {/* Flower Name */}
                <span className="text-xs font-semibold text-text-dark mt-1 line-clamp-1">
                  {flower.name}
                </span>

                {/* Short Meaning Snippet */}
                <span className="text-[10px] text-text-muted line-clamp-1 italic mt-0.5">
                  {flower.meaning.split(',')[0]}
                </span>

                {/* Add Button */}
                <button
                  onClick={() => addFlower(flower.key)}
                  className="mt-2 w-full py-1 text-[11px] font-medium bg-blush-light hover:bg-blush text-text-dark rounded-full flex items-center justify-center gap-1 transition-colors"
                >
                  <Plus size={12} />
                  Add
                </button>
              </div>
            );
          })}
        </div>

        {filteredFlowers.length === 0 && (
          <div className="text-center py-8 text-xs text-text-muted">
            No flowers match your search.
          </div>
        )}
      </div>
    </div>
  );
};
