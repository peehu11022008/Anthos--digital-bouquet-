'use client';

import React, { useState, useEffect } from 'react';
import { FallingPetals } from './FallingPetals';
import { FloatingButterflies } from './FloatingButterflies';
import { GentleSparkles } from './GentleSparkles';

interface AmbientLayerProps {
  ambientMode?: boolean;
}

export const AmbientLayer: React.FC<AmbientLayerProps> = ({ ambientMode = false }) => {
  const [reducedMotion, setReducedMotion] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  if (!mounted || reducedMotion) {
    return null;
  }

  return (
    <>
      <FallingPetals count={ambientMode ? 24 : 10} />
      <FloatingButterflies />
      <GentleSparkles />
    </>
  );
};
