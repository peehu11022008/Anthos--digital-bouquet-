'use client';

import React, { useState, useEffect, useMemo } from 'react';

interface PetalItem {
  id: number;
  left: string;
  delay: string;
  duration: string;
  size: number;
  rotation: number;
  color: string;
}

const PETAL_COLORS = ['#F9C6CC', '#FDE2E4', '#F4A7B9', '#FED7AA', '#E9D5FF'];

export const FallingPetals: React.FC<{ count?: number }> = ({ count = 12 }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const petals = useMemo<PetalItem[]>(() => {
    if (!mounted) return [];
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${(i / count) * 96 + (Math.random() * 4)}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${10 + Math.random() * 10}s`,
      size: 14 + Math.random() * 12,
      rotation: Math.random() * 360,
      color: PETAL_COLORS[i % PETAL_COLORS.length],
    }));
  }, [count, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {petals.map((petal) => (
        <div
          key={petal.id}
          className="absolute -top-8 animate-petal-fall"
          style={{
            left: petal.left,
            animationDelay: petal.delay,
            animationDuration: petal.duration,
          }}
        >
          <svg
            width={petal.size}
            height={petal.size * 1.3}
            viewBox="0 0 20 26"
            style={{
              transform: `rotate(${petal.rotation}deg)`,
              filter: 'drop-shadow(0 2px 4px rgba(244, 167, 185, 0.2))',
            }}
          >
            {/* Soft organic curved flower petal */}
            <path
              d="M 10 0 C 18 6, 20 18, 10 26 C 0 18, 2 6, 10 0 Z"
              fill={petal.color}
              opacity="0.75"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};
