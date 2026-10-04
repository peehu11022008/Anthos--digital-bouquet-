'use client';

import React from 'react';
import type { GardenFlower as GardenFlowerType } from '@/types';
import { GardenFlower } from './GardenFlower';
import { LittleGarden } from '@/components/scenes/LittleGarden';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Flower2, Plus } from 'lucide-react';

interface GardenViewProps {
  flowers: GardenFlowerType[];
}

export const GardenView: React.FC<GardenViewProps> = ({ flowers }) => {
  return (
    <div className="relative w-full max-w-4xl mx-auto h-[400px] sm:h-[480px] rounded-4xl overflow-hidden shadow-soft-xl border border-blush/30 bg-cream-dark select-none my-6">
      {/* Background Illustrated Garden Scene */}
      <div className="absolute inset-0 pointer-events-none">
        <LittleGarden timeOfDay="afternoon" width="100%" height="100%" />
      </div>

      {/* Planted Flowers */}
      {flowers.map((fl) => (
        <GardenFlower key={fl.id} flower={fl} />
      ))}

      {/* Empty State if no flowers have been planted yet */}
      {flowers.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center p-6 z-20">
          <div className="bg-cream/95 backdrop-blur-md rounded-3xl p-8 max-w-sm text-center shadow-soft-lg border border-blush/30">
            <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-blush-light flex items-center justify-center text-blush-dark">
              <Flower2 size={24} />
            </div>
            <h3 className="text-lg font-bold text-text-dark font-sans">
              Your Garden Awaits
            </h3>
            <p className="text-xs text-text-soft mt-1 mb-5 leading-relaxed">
              Every time you craft and gift a bouquet, a blossom takes root in your personal meadow.
            </p>
            <Link href="/create">
              <Button variant="primary" size="md" leftIcon={<Plus size={16} />}>
                Craft Your First Bouquet
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
