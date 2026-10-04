'use client';

import React from 'react';
import { MOODS } from '@/lib/moods';
import { useBouquetStore } from '@/store/bouquetStore';
import { Button } from '@/components/ui/Button';
import {
  Heart,
  Sun,
  Feather,
  Coffee,
  Sparkles,
  Compass,
  Gift,
  Smile,
  ArrowRight,
} from 'lucide-react';
import type { Mood } from '@/types';

interface MoodSelectorProps {
  onContinue: () => void;
}

const MOOD_ICONS: Record<Mood, React.ReactNode> = {
  romantic: <Heart size={20} className="text-blush-dark" />,
  happy: <Sun size={20} className="text-amber-500" />,
  'soft-and-sweet': <Feather size={20} className="text-purple-400" />,
  comfort: <Coffee size={20} className="text-stone-500" />,
  'thank-you': <Sparkles size={20} className="text-sky-500" />,
  'i-miss-you': <Compass size={20} className="text-indigo-400" />,
  celebration: <Gift size={20} className="text-rose-500" />,
  'just-because': <Smile size={20} className="text-emerald-500" />,
};

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onContinue }) => {
  const { mood, setMood, setScene, setTimeOfDay, setStep } = useBouquetStore();

  const handleSelectMood = (selectedMood: Mood) => {
    const item = MOODS.find((m) => m.key === selectedMood);
    if (item) {
      setMood(item.key);
      setScene(item.sceneKey, item.timeOfDay);
      setTimeOfDay(item.timeOfDay);
    }
  };

  const handleProceed = () => {
    setStep(1);
    onContinue();
  };

  const handleSkip = () => {
    setMood(null);
    setStep(1);
    onContinue();
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-center">
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest text-blush-dark font-semibold">
          Step 1 of 4
        </span>
        <h2 className="text-3xl font-bold text-text-dark font-sans mt-1">
          Choose a Bouquet Mood
        </h2>
        <p className="text-sm text-text-soft max-w-md mx-auto mt-2">
          What feeling would you like this bouquet to share? You can always skip this and design freely.
        </p>
      </div>

      {/* Mood Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-8">
        {MOODS.map((item) => {
          const isSelected = mood === item.key;
          return (
            <button
              key={item.key}
              onClick={() => handleSelectMood(item.key)}
              className={`p-4 rounded-3xl border text-left flex flex-col justify-between transition-all duration-200 ${
                isSelected
                  ? 'bg-cream border-blush shadow-soft-lg scale-102 ring-2 ring-blush'
                  : 'bg-cream-dark/50 border-blush/20 hover:bg-cream hover:border-blush/50'
              }`}
            >
              <div className="p-2.5 bg-cream rounded-2xl w-fit shadow-xs mb-3">
                {MOOD_ICONS[item.key]}
              </div>
              <div>
                <h4 className="font-semibold text-sm text-text-dark">{item.label}</h4>
                <p className="text-[11px] text-text-muted mt-1 leading-snug">
                  {item.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
        <Button variant="ghost" onClick={handleSkip} size="md">
          Skip and create freely
        </Button>
        <Button
          variant="primary"
          onClick={handleProceed}
          size="lg"
          rightIcon={<ArrowRight size={16} />}
        >
          Continue to Canvas
        </Button>
      </div>
    </div>
  );
};
