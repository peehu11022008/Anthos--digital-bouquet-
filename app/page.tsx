'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { FLOWERS } from '@/lib/flowers';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { LittleGarden } from '@/components/scenes/LittleGarden';
import {
  Flower2,
  Sparkles,
  Heart,
  Palette,
  Send,
  ArrowRight,
  Clock,
  BookOpen,
} from 'lucide-react';

export default function HomePage() {
  const showcaseFlowers = FLOWERS.slice(0, 5);

  return (
    <div className="flex flex-col items-center select-none overflow-hidden">
      {/* ─── Hero Section ────────────────────────────────────────── */}
      <section className="w-full max-w-5xl mx-auto px-4 pt-12 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blush-light border border-blush/40 text-xs font-semibold text-blush-dark mb-6 animate-fade-in shadow-xs">
          <Sparkles size={14} />
          <span>A Calming Digital Flower-Gifting World</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-display text-text-dark tracking-wide leading-tight mb-4 animate-fade-up">
          Make something beautiful.
          <br />
          <span className="text-blush-dark">Give it meaning.</span>
        </h1>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-text-soft font-normal leading-relaxed mb-8">
          Welcome to Anthos. Take your time to arrange hand-drawn cartoon blossoms,
          recolor petals, write handwritten letters, and send peaceful digital gifts to those you care about.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link href="/create">
            <Button
              variant="primary"
              size="lg"
              className="px-8 py-4 text-base"
              rightIcon={<ArrowRight size={18} />}
            >
              Start Creating a Bouquet
            </Button>
          </Link>

          <Link href="/garden">
            <Button variant="secondary" size="lg" className="px-6 py-4 text-base">
              Explore Your Garden
            </Button>
          </Link>
        </div>

        {/* Hero Visual Preview Card */}
        <div className="relative w-full max-w-2xl mx-auto h-72 sm:h-84 rounded-4xl overflow-hidden shadow-soft-xl border border-blush/30 bg-cream-dark">
          <div className="absolute inset-0 pointer-events-none">
            <LittleGarden timeOfDay="afternoon" width="100%" height="100%" />
          </div>

          {/* Handcrafted bouquet arrangement display */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="relative w-64 h-64">
              {showcaseFlowers.map((flower, i) => {
                const Comp = FLOWER_COMPONENT_MAP[flower.key];
                if (!Comp) return null;
                const offsets = [
                  { x: -50, y: -20, r: -12, s: 0.85 },
                  { x: 50, y: -15, r: 15, s: 0.85 },
                  { x: 0, y: -40, r: 0, s: 0.95 },
                  { x: -25, y: 15, r: -8, s: 0.8 },
                  { x: 30, y: 20, r: 10, s: 0.8 },
                ];
                const off = offsets[i];
                return (
                  <div
                    key={flower.key}
                    className="absolute left-1/2 top-1/2"
                    style={{
                      transform: `translate(-50%, -50%) translate(${off.x}px, ${off.y}px) rotate(${off.r}deg) scale(${off.s})`,
                      filter: 'drop-shadow(0 4px 8px rgba(180, 140, 140, 0.15))',
                    }}
                  >
                    <Comp
                      petalColor={flower.defaultPetalColor}
                      stemColor={flower.defaultStemColor}
                      width={100}
                      height={150}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-cream/90 backdrop-blur-md px-4 py-1 rounded-full border border-blush/30 text-xs text-text-soft font-medium shadow-xs">
            Hand-drawn blossoms waiting for your touch
          </div>
        </div>
      </section>

      {/* ─── Philosophy & Features ─────────────────────────────────── */}
      <section className="w-full max-w-5xl mx-auto px-4 py-16 border-t border-blush/20">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-widest text-blush-dark font-semibold">
            The Anthos Experience
          </span>
          <h2 className="text-3xl font-bold text-text-dark font-sans mt-1">
            Slow, soft, and intentional.
          </h2>
          <p className="text-xs text-text-soft mt-2 max-w-md mx-auto">
            No rush, no points, and no losing. Just a tranquil corner of the internet where thoughtful gestures grow.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature 1 */}
          <div className="bg-cream rounded-3xl p-6 border border-blush/30 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-blush-light flex items-center justify-center text-blush-dark mb-4">
              <Palette size={22} />
            </div>
            <h3 className="text-lg font-bold text-text-dark font-sans mb-1">
              Complete Creative Freedom
            </h3>
            <p className="text-xs text-text-soft leading-relaxed">
              Drag, rotate, scale, recolor, and layer flowers and accessories. Every bouquet is unique to your imagination.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-cream rounded-3xl p-6 border border-blush/30 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-butter-light flex items-center justify-center text-butter-dark mb-4">
              <BookOpen size={22} />
            </div>
            <h3 className="text-lg font-bold text-text-dark font-sans mb-1">
              Symbolic Flower Meanings
            </h3>
            <p className="text-xs text-text-soft leading-relaxed">
              Sunflowers for warmth, daisies for cheer, lavender for quiet calm. Uncover flower lore and let Anthos weave their sentiment into words.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-cream rounded-3xl p-6 border border-blush/30 shadow-soft">
            <div className="w-12 h-12 rounded-2xl bg-sage-light flex items-center justify-center text-sage-dark mb-4">
              <Clock size={22} />
            </div>
            <h3 className="text-lg font-bold text-text-dark font-sans mb-1">
              Thoughtful Time Tracking
            </h3>
            <p className="text-xs text-text-soft leading-relaxed">
              Show your recipient how much care you gave: &ldquo;Made with 18 minutes of love.&rdquo; A reminder that time is the sweetest gift.
            </p>
          </div>
        </div>
      </section>

      {/* ─── Bottom Call to Action ─────────────────────────────────── */}
      <section className="w-full max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-gradient-to-b from-cream to-cream-dark p-8 sm:p-12 rounded-4xl border border-blush/40 shadow-soft-lg">
          <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-blush-light flex items-center justify-center text-blush-dark">
            <Flower2 size={28} />
          </div>
          <h2 className="text-2xl sm:text-3xl font-display text-text-dark mb-2">
            Ready to plant something thoughtful?
          </h2>
          <p className="text-xs sm:text-sm text-text-soft max-w-md mx-auto mb-6">
            Enter the studio, arrange your bouquet at your own pace, and share a gentle smile.
          </p>
          <Link href="/create">
            <Button variant="primary" size="lg" className="px-8 py-3.5">
              Enter the Bouquet Studio
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
