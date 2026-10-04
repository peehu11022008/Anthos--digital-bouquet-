'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { SCENES } from '@/lib/scenes';
import { SCENE_COMPONENT_MAP } from '@/components/scenes';
import { Sunrise, Sun, Sunset, Moon } from 'lucide-react';
import type { TimeOfDay } from '@/types';

const TIME_OPTIONS: Array<{ key: TimeOfDay; label: string; icon: React.ReactNode }> = [
  { key: 'morning', label: 'Morning', icon: <Sunrise size={16} /> },
  { key: 'afternoon', label: 'Afternoon', icon: <Sun size={16} /> },
  { key: 'sunset', label: 'Sunset', icon: <Sunset size={16} /> },
  { key: 'night', label: 'Night', icon: <Moon size={16} /> },
];

export const SceneSelector: React.FC = () => {
  const { sceneKey, timeOfDay, setScene, setTimeOfDay } = useBouquetStore();

  return (
    <div className="max-w-2xl mx-auto py-6 px-4">
      {/* Time of Day Control */}
      <div className="mb-8 text-center">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
          Atmosphere & Time of Day
        </label>
        <div className="inline-flex p-1.5 bg-cream-dark/80 rounded-full border border-blush/20 gap-1.5">
          {TIME_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setTimeOfDay(opt.key)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium transition-all ${
                timeOfDay === opt.key
                  ? 'bg-cream text-text-dark font-semibold shadow-soft'
                  : 'text-text-soft hover:text-text-dark hover:bg-cream/50'
              }`}
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Scenes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {SCENES.map((scene) => {
          const SceneComponent = SCENE_COMPONENT_MAP[scene.key];
          const isSelected = sceneKey === scene.key;

          return (
            <div
              key={scene.key}
              onClick={() => setScene(scene.key)}
              className={`group cursor-pointer rounded-3xl overflow-hidden border transition-all duration-300 ${
                isSelected
                  ? 'border-blush ring-2 ring-blush shadow-soft-lg scale-[1.02]'
                  : 'border-blush/20 hover:border-blush/50 hover:shadow-soft'
              }`}
            >
              {/* Scene Visual Preview */}
              <div className="h-44 w-full bg-cream-dark relative overflow-hidden pointer-events-none">
                {SceneComponent && (
                  <SceneComponent timeOfDay={timeOfDay} width="100%" height="100%" />
                )}
              </div>

              {/* Scene Details */}
              <div className="p-4 bg-cream">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-sm text-text-dark">{scene.name}</h4>
                  {isSelected && (
                    <span className="text-[11px] font-semibold text-blush-dark bg-blush-light px-2.5 py-0.5 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-muted mt-1">{scene.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
