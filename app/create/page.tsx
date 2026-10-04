'use client';

import React, { useState } from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { BouquetCanvas } from '@/components/editor/BouquetCanvas';
import { FlowerPicker } from '@/components/editor/FlowerPicker';
import { AccessoryPicker } from '@/components/editor/AccessoryPicker';
import { MoodSelector } from '@/components/editor/MoodSelector';
import { LetterCard } from '@/components/letter/LetterCard';
import { SceneSelector } from '@/components/editor/SceneSelector';
import { FinishScreen } from '@/components/finish/FinishScreen';
import { MeaningModal } from '@/components/editor/MeaningModal';
import { Button } from '@/components/ui/Button';
import {
  Flower2,
  Sparkles,
  Mail,
  Image as ImageIcon,
  Send,
  ArrowLeft,
  ArrowRight,
  Clock,
} from 'lucide-react';
import { formatTimeSpent } from '@/lib/utils';
import type { EditorStep } from '@/types';

export default function CreateBouquetPage() {
  const { step, setStep, getTimeSpentMs, flowers } = useBouquetStore();
  const [activeTab, setActiveTab] = useState<'flowers' | 'accessories'>('flowers');
  const [inspectFlowerKey, setInspectFlowerKey] = useState<string | null>(null);

  const timeDisplay = formatTimeSpent(getTimeSpentMs());

  const stepsList: Array<{ step: EditorStep; label: string; icon: React.ReactNode }> = [
    { step: 0, label: 'Mood', icon: <Sparkles size={14} /> },
    { step: 1, label: 'Arrange', icon: <Flower2 size={14} /> },
    { step: 2, label: 'Letter', icon: <Mail size={14} /> },
    { step: 3, label: 'Scene', icon: <ImageIcon size={14} /> },
    { step: 4, label: 'Share', icon: <Send size={14} /> },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col justify-between bg-cream select-none">
      {/* ─── Top Studio Bar ────────────────────────────────────────── */}
      <div className="bg-cream/90 backdrop-blur-md border-b border-blush/20 px-4 py-2.5 flex items-center justify-between sticky top-16 z-30">
        {/* Back Button or Reset */}
        <div className="w-24">
          {step > 0 && (
            <button
              onClick={() => setStep((step - 1) as EditorStep)}
              className="flex items-center gap-1 text-xs font-semibold text-text-soft hover:text-text-dark transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Back</span>
            </button>
          )}
        </div>

        {/* Step Indicator Pills */}
        <div className="flex items-center gap-1 sm:gap-2">
          {stepsList.map((s) => {
            const isCurrent = step === s.step;
            const isPast = step > s.step;

            return (
              <button
                key={s.step}
                onClick={() => setStep(s.step)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                  isCurrent
                    ? 'bg-blush text-text-dark font-semibold shadow-xs'
                    : isPast
                    ? 'text-text-soft hover:bg-cream-dark'
                    : 'text-text-muted hover:text-text-soft'
                }`}
              >
                {s.icon}
                <span className="hidden sm:inline">{s.label}</span>
              </button>
            );
          })}
        </div>

        {/* Quiet Time Elapsed & Next Button */}
        <div className="w-24 flex items-center justify-end gap-2">
          {step < 4 ? (
            <Button
              variant="primary"
              size="sm"
              onClick={() => setStep((step + 1) as EditorStep)}
              rightIcon={<ArrowRight size={14} />}
            >
              Next
            </Button>
          ) : null}
        </div>
      </div>

      {/* ─── Studio Step Content ──────────────────────────────────── */}
      <div className="flex-1 flex flex-col">
        {/* STEP 0: Mood Selection */}
        {step === 0 && (
          <MoodSelector onContinue={() => setStep(1)} />
        )}

        {/* STEP 1: Main Canvas Bouquet Arrangement */}
        {step === 1 && (
          <div className="flex-1 flex flex-col lg:flex-row h-[calc(100vh-8.5rem)] relative overflow-hidden">
            {/* Sidebar with Tabs for Flowers vs Accessories */}
            <div className="flex flex-col border-r border-blush/20 bg-cream">
              {/* Tab Selector */}
              <div className="flex border-b border-blush/20 bg-cream-dark/50">
                <button
                  onClick={() => setActiveTab('flowers')}
                  className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                    activeTab === 'flowers'
                      ? 'border-blush text-text-dark bg-cream'
                      : 'border-transparent text-text-soft hover:text-text-dark'
                  }`}
                >
                  <Flower2 size={14} />
                  <span>Flowers</span>
                </button>
                <button
                  onClick={() => setActiveTab('accessories')}
                  className={`flex-1 py-2.5 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-colors ${
                    activeTab === 'accessories'
                      ? 'border-blush text-text-dark bg-cream'
                      : 'border-transparent text-text-soft hover:text-text-dark'
                  }`}
                >
                  <Sparkles size={14} />
                  <span>Accessories</span>
                </button>
              </div>

              {/* Tab Contents */}
              <div className="flex-1 overflow-hidden">
                {activeTab === 'flowers' ? (
                  <FlowerPicker onOpenMeaning={(key) => setInspectFlowerKey(key)} />
                ) : (
                  <AccessoryPicker />
                )}
              </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 h-full relative">
              <BouquetCanvas />
            </div>
          </div>
        )}

        {/* STEP 2: Write Personal Letter */}
        {step === 2 && (
          <div className="py-6">
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest text-blush-dark font-semibold">
                Step 2 of 4
              </span>
              <h2 className="text-2xl font-bold text-text-dark font-sans mt-1">
                Attach a Personal Letter
              </h2>
              <p className="text-xs text-text-soft mt-1">
                A warm note written on cozy stationery.
              </p>
            </div>
            <LetterCard />
            <div className="text-center pb-8">
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(3)}
                rightIcon={<ArrowRight size={16} />}
              >
                Continue to Atmosphere & Scene
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: Choose Background Scene & Atmosphere */}
        {step === 3 && (
          <div className="py-6">
            <div className="text-center mb-4">
              <span className="text-xs uppercase tracking-widest text-blush-dark font-semibold">
                Step 3 of 4
              </span>
              <h2 className="text-2xl font-bold text-text-dark font-sans mt-1">
                Place in a Peaceful Setting
              </h2>
              <p className="text-xs text-text-soft mt-1">
                Choose where your bouquet rests and how the sunlight falls upon it.
              </p>
            </div>
            <SceneSelector />
            <div className="text-center pb-8">
              <Button
                variant="primary"
                size="md"
                onClick={() => setStep(4)}
                rightIcon={<ArrowRight size={16} />}
              >
                Continue to Name & Gift
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: Finish Screen & Share */}
        {step === 4 && <FinishScreen />}
      </div>

      {/* Flower Meaning Inspector Modal */}
      <MeaningModal
        isOpen={Boolean(inspectFlowerKey)}
        onClose={() => setInspectFlowerKey(null)}
        flowerKey={inspectFlowerKey}
      />
    </div>
  );
}
