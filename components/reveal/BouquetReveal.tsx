'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { SCENE_COMPONENT_MAP } from '@/components/scenes';
import { FLOWER_COMPONENT_MAP } from '@/components/flowers';
import { ACCESSORY_COMPONENT_MAP } from '@/components/accessories';
import type { BouquetData } from '@/types';

interface BouquetRevealProps {
  bouquet: BouquetData;
}

export const BouquetReveal: React.FC<BouquetRevealProps> = ({ bouquet }) => {
  const SceneComponent = SCENE_COMPONENT_MAP[bouquet.sceneKey] || SCENE_COMPONENT_MAP['little-garden'];

  return (
    <div className="relative w-full max-w-2xl mx-auto h-[440px] sm:h-[500px] rounded-4xl overflow-hidden shadow-soft-xl border border-blush/30 bg-cream-dark select-none">
      {/* Background Scene */}
      <div className="absolute inset-0 pointer-events-none">
        {SceneComponent && (
          <SceneComponent timeOfDay={bouquet.timeOfDay} width="100%" height="100%" />
        )}
      </div>

      {/* Flower Elements with Blooming Entrance */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-full max-w-lg max-h-[460px]">
          {bouquet.flowers.map((f, i) => {
            const Comp = FLOWER_COMPONENT_MAP[f.flowerKey];
            if (!Comp) return null;

            return (
              <motion.div
                key={f.id}
                className="absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: f.scaleX || 1, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.2 + i * 0.12,
                  ease: [0.34, 1.56, 0.64, 1], // gentle spring bounce
                }}
                style={{
                  left: `${f.x || 300}px`,
                  top: `${f.y || 250}px`,
                  transform: `translate(-50%, -50%) rotate(${f.rotation || 0}deg)`,
                  zIndex: f.zIndex,
                }}
              >
                <Comp
                  petalColor={f.petalColor}
                  stemColor={f.stemColor}
                  width={110}
                  height={165}
                />
              </motion.div>
            );
          })}

          {/* Accessories */}
          {bouquet.accessories.map((a, i) => {
            const AccComp = ACCESSORY_COMPONENT_MAP[a.accessoryKey];
            if (!AccComp) return null;

            return (
              <motion.div
                key={a.id}
                className="absolute"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: a.scaleX || 1, opacity: 1 }}
                transition={{
                  duration: 0.6,
                  delay: 0.6 + i * 0.1,
                  ease: 'easeOut',
                }}
                style={{
                  left: `${a.x || 300}px`,
                  top: `${a.y || 250}px`,
                  transform: `translate(-50%, -50%) rotate(${a.rotation || 0}deg)`,
                  zIndex: a.zIndex,
                }}
              >
                <AccComp color={a.color} width={75} height={75} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
