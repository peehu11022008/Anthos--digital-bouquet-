'use client';

import React, { useState } from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { SCENE_COMPONENT_MAP } from '@/components/scenes';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { ACCESSORY_COMPONENT_MAP } from '@/components/accessories';
import { formatTimeMessage } from '@/lib/utils';
import { WhyGenerator } from './WhyGenerator';
import { SharePanel } from './SharePanel';
import { Clock, Flower2 } from 'lucide-react';

export const FinishScreen: React.FC = () => {
  const {
    flowers,
    accessories,
    sceneKey,
    timeOfDay,
    bouquetName,
    setBouquetName,
    getTimeSpentMs,
  } = useBouquetStore();

  const [savedNotice, setSavedNotice] = useState(false);
  const timeMessage = formatTimeMessage(getTimeSpentMs());
  const SceneComponent = SCENE_COMPONENT_MAP[sceneKey];

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 text-center select-none">
      {/* Step Indicator */}
      <span className="text-xs uppercase tracking-widest text-blush-dark font-semibold">
        Step 4 of 4
      </span>
      <h2 className="text-3xl font-bold text-text-dark font-sans mt-1">
        Name & Share Your Bouquet
      </h2>

      {/* Time Spent Ribbon */}
      <div className="inline-flex items-center gap-2 bg-cream px-4 py-1.5 rounded-full border border-blush/30 shadow-xs my-3 text-xs text-text-soft font-medium">
        <Clock size={14} className="text-blush-dark" />
        <span>{timeMessage}</span>
      </div>

      {/* Bouquet Naming Input */}
      <div className="my-5 max-w-md mx-auto">
        <input
          type="text"
          value={bouquetName}
          onChange={(e) => setBouquetName(e.target.value)}
          placeholder="A Little Piece of Spring"
          className="w-full text-center text-xl font-display text-text-dark bg-cream-dark/60 border border-blush/40 rounded-full px-6 py-3 placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-blush"
        />
        <p className="text-[11px] text-text-muted mt-1.5">
          This title will greet the recipient when they open your gift.
        </p>
      </div>

      {/* Mini Visual Preview Card */}
      <div className="relative w-full max-w-md mx-auto h-64 rounded-3xl overflow-hidden shadow-soft-lg border border-blush/30 my-6 bg-cream-dark">
        {/* Background Scene */}
        <div className="absolute inset-0 pointer-events-none">
          {SceneComponent && (
            <SceneComponent timeOfDay={timeOfDay} width="100%" height="100%" />
          )}
        </div>

        {/* Simplified Flower Arrangement Preview */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-40 h-40">
            {flowers.map((f, idx) => {
              const Comp = FLOWER_COMPONENT_MAP[f.flowerKey];
              if (!Comp) return null;
              return (
                <div
                  key={f.id}
                  className="absolute"
                  style={{
                    left: `${40 + (idx % 3) * 15 - 15}%`,
                    top: `${30 + (idx % 2) * 15 - 10}%`,
                    transform: `translate(-50%, -50%) rotate(${f.rotation * 0.5}deg) scale(0.65)`,
                  }}
                >
                  <Comp petalColor={f.petalColor} stemColor={f.stemColor} width={75} height={110} />
                </div>
              );
            })}

            {/* Accessories */}
            {accessories.map((a) => {
              const AccComp = ACCESSORY_COMPONENT_MAP[a.accessoryKey];
              if (!AccComp) return null;
              return (
                <div
                  key={a.id}
                  className="absolute"
                  style={{
                    left: `${50 + (a.x % 40) - 20}%`,
                    top: `${60 + (a.y % 30) - 15}%`,
                    transform: 'translate(-50%, -50%) scale(0.55)',
                  }}
                >
                  <AccComp color={a.color} width={50} height={50} />
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Why These Flowers Box */}
      <div className="max-w-md mx-auto my-6">
        <WhyGenerator />
      </div>

      {/* Share & Recipient Details Panel */}
      <div className="max-w-md mx-auto">
        <SharePanel onSavedToGarden={() => setSavedNotice(true)} />
      </div>
    </div>
  );
};
