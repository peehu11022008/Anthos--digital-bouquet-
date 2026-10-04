'use client';

import React from 'react';

const SPARKLE_POSITIONS = [
  { top: '15%', left: '12%', delay: '0s', size: 16 },
  { top: '25%', left: '85%', delay: '1.8s', size: 20 },
  { top: '65%', left: '8%', delay: '3.2s', size: 14 },
  { top: '75%', left: '90%', delay: '0.9s', size: 18 },
  { top: '45%', left: '94%', delay: '2.5s', size: 16 },
  { top: '82%', left: '25%', delay: '4s', size: 12 },
];

export const GentleSparkles: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {SPARKLE_POSITIONS.map((s, idx) => (
        <div
          key={idx}
          className="absolute animate-sparkle-fade"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: s.delay,
            animationDuration: '5s',
          }}
        >
          <svg width={s.size} height={s.size} viewBox="0 0 24 24" fill="#FCD34D" opacity="0.65">
            <path d="M 12 0 C 12 7, 17 12, 24 12 C 17 12, 12 17, 12 24 C 12 17, 7 12, 0 12 C 7 12, 12 7, 12 0 Z" />
          </svg>
        </div>
      ))}
    </div>
  );
};
