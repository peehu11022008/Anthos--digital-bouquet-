'use client';

import React from 'react';
import type { GardenStats as StatsType } from '@/types';
import { Flower2, Gift, Send } from 'lucide-react';

interface GardenStatsProps {
  stats: StatsType;
}

export const GardenStats: React.FC<GardenStatsProps> = ({ stats }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-4 select-none">
      {/* Stat 1 */}
      <div className="flex items-center gap-2.5 px-4 py-2 bg-cream rounded-full border border-blush/20 shadow-xs">
        <Flower2 size={16} className="text-sage-dark" />
        <span className="text-xs text-text-soft">
          <strong className="text-text-dark font-bold">{stats.flowersPlanted}</strong> flowers planted
        </span>
      </div>

      {/* Stat 2 */}
      <div className="flex items-center gap-2.5 px-4 py-2 bg-cream rounded-full border border-blush/20 shadow-xs">
        <Gift size={16} className="text-blush-dark" />
        <span className="text-xs text-text-soft">
          <strong className="text-text-dark font-bold">{stats.bouquetsCreated}</strong> bouquets created
        </span>
      </div>

      {/* Stat 3 */}
      <div className="flex items-center gap-2.5 px-4 py-2 bg-cream rounded-full border border-blush/20 shadow-xs">
        <Send size={16} className="text-sky-dark" />
        <span className="text-xs text-text-soft">
          <strong className="text-text-dark font-bold">{stats.giftsSent}</strong> gifts shared
        </span>
      </div>
    </div>
  );
};
