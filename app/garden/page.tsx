'use client';

import React, { useState, useEffect } from 'react';
import { loadGarden, loadBouquetArchive, loadStats } from '@/lib/storage';
import { GardenStats } from '@/components/garden/GardenStats';
import { GardenView } from '@/components/garden/GardenView';
import { BouquetArchive } from '@/components/garden/BouquetArchive';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { Plus, Flower2 } from 'lucide-react';
import type { GardenFlower, BouquetData, GardenStats as StatsType } from '@/types';

export default function PersonalGardenPage() {
  const [gardenFlowers, setGardenFlowers] = useState<GardenFlower[]>([]);
  const [archive, setArchive] = useState<BouquetData[]>([]);
  const [stats, setStats] = useState<StatsType>({
    flowersPlanted: 0,
    bouquetsCreated: 0,
    giftsSent: 0,
  });

  useEffect(() => {
    setGardenFlowers(loadGarden());
    setArchive(loadBouquetArchive());
    setStats(loadStats());
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 text-center select-none">
      {/* Title & Introduction */}
      <div className="mb-4">
        <span className="text-xs uppercase tracking-widest text-blush-dark font-semibold">
          Your Personal Meadow
        </span>
        <h1 className="text-3xl sm:text-4xl font-display text-text-dark mt-1">
          Anthos Garden
        </h1>
        <p className="text-xs text-text-soft max-w-md mx-auto mt-2">
          A living reflection of every bouquet you have created and gifted.
        </p>
      </div>

      {/* Stats Summary */}
      <GardenStats stats={stats} />

      {/* Visual Garden Meadow */}
      <GardenView flowers={gardenFlowers} />

      {/* Action Button */}
      <div className="my-6">
        <Link href="/create">
          <Button variant="primary" size="lg" leftIcon={<Plus size={16} />}>
            Create a New Bouquet
          </Button>
        </Link>
      </div>

      {/* Bouquet Keepsake Archive */}
      <BouquetArchive bouquets={archive} />
    </div>
  );
}
