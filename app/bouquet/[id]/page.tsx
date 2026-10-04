'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { getBouquet } from '@/lib/supabase';
import { getBouquetFromArchive } from '@/lib/storage';
import { formatTimeMessage } from '@/lib/utils';
import { SurpriseScreen } from '@/components/reveal/SurpriseScreen';
import { BouquetReveal } from '@/components/reveal/BouquetReveal';
import { LetterReveal } from '@/components/reveal/LetterReveal';
import { WhyMessage } from '@/components/reveal/WhyMessage';
import { MakeOneBack } from '@/components/reveal/MakeOneBack';
import { Clock, Flower2 } from 'lucide-react';
import type { BouquetData } from '@/types';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function BouquetRecipientPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';

  const [bouquet, setBouquet] = useState<BouquetData | null>(null);
  const [loading, setLoading] = useState(true);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    async function loadData() {
      if (!id) {
        setLoading(false);
        return;
      }

      // 1. Try fetching from Supabase
      try {
        const remoteData = await getBouquet(id);
        if (remoteData) {
          setBouquet(remoteData);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Could not fetch from remote database, checking local storage:', err);
      }

      // 2. Fallback to local storage archive
      const localData = getBouquetFromArchive(id);
      if (localData) {
        setBouquet(localData);
      }
      setLoading(false);
    }

    loadData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <Flower2 size={36} className="text-blush-dark animate-pulse mb-3" />
        <p className="text-sm font-medium text-text-soft">
          Gathering your flowers from the garden...
        </p>
      </div>
    );
  }

  if (!bouquet) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-2xl font-bold text-text-dark font-sans mb-2">
          Bouquet not found
        </h2>
        <p className="text-xs text-text-soft max-w-sm mb-6">
          This bouquet link might have expired or does not exist. You can craft a new bouquet anytime.
        </p>
        <Link href="/create">
          <Button variant="primary">Create a Bouquet</Button>
        </Link>
      </div>
    );
  }

  // Initial Surprise Screen
  if (!hasOpened) {
    return (
      <SurpriseScreen
        bouquetName={bouquet.bouquetName}
        senderName={bouquet.senderName}
        onOpen={() => setHasOpened(true)}
      />
    );
  }

  // The Full Unboxed Experience
  const timeMessage = formatTimeMessage(bouquet.timeSpentMs);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center select-none animate-fade-in">
      {/* Header Info */}
      <div className="mb-6">
        <span className="text-xs uppercase tracking-widest text-blush-dark font-semibold">
          A Gift For You
        </span>
        <h1 className="text-3xl sm:text-4xl font-display text-text-dark mt-1">
          {bouquet.bouquetName || 'A Gentle Bouquet'}
        </h1>

        {/* Time and Sender Badge */}
        <div className="inline-flex items-center gap-2 bg-cream-dark/80 px-4 py-1.5 rounded-full border border-blush/20 text-xs text-text-soft mt-3">
          <Clock size={14} className="text-blush-dark" />
          <span>{timeMessage}</span>
          {bouquet.senderName && (
            <>
              <span className="opacity-40">•</span>
              <span>From {bouquet.senderName}</span>
            </>
          )}
        </div>
      </div>

      {/* The Animated Blooming Bouquet */}
      <BouquetReveal bouquet={bouquet} />

      {/* The Handwritten Stationery Note */}
      <LetterReveal letter={bouquet.letter} senderName={bouquet.senderName} />

      {/* Interpretation of Flowers */}
      <WhyMessage whyMessage={bouquet.whyMessage} />

      {/* Reciprocate CTA */}
      <MakeOneBack />
    </div>
  );
}
