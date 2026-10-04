import React from 'react';
import type { SceneSVGProps } from '@/types';

export const SunsetScene: React.FC<SceneSVGProps> = ({
  timeOfDay = 'sunset',
  className = '',
  width = '100%',
  height = '100%',
}) => {
  const getGradient = () => {
    switch (timeOfDay) {
      case 'morning':
        return {
          c1: '#FDE68A',
          c2: '#FBCFE8',
          c3: '#BAE6FD',
          sun: '#FFFBEB',
          hill1: '#86B67C',
          hill2: '#689C5D',
        };
      case 'night':
        return {
          c1: '#0F172A',
          c2: '#1E1B4B',
          c3: '#312E81',
          sun: '#FEF9C3',
          hill1: '#1E293B',
          hill2: '#0F172A',
        };
      case 'afternoon':
        return {
          c1: '#FFFBEB',
          c2: '#E0F2FE',
          c3: '#BAE6FD',
          sun: '#FEF08A',
          hill1: '#94CF80',
          hill2: '#75B660',
        };
      case 'sunset':
      default:
        return {
          c1: '#F472B6',
          c2: '#FB923C',
          c3: '#FDE047',
          sun: '#FFFBEB',
          hill1: '#8A5D6B',
          hill2: '#5C3848',
        };
    }
  };

  const g = getGradient();

  return (
    <svg
      viewBox="0 0 800 500"
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id={`sunset-grad-${timeOfDay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={g.c1} />
          <stop offset="50%" stopColor={g.c2} />
          <stop offset="100%" stopColor={g.c3} />
        </linearGradient>
      </defs>

      {/* Sky Background */}
      <rect width="800" height="500" fill={`url(#sunset-grad-${timeOfDay})`} />

      {/* Sun / Moon on Horizon */}
      <circle cx="400" cy="280" r="70" fill={g.sun} opacity="0.85" />
      <circle cx="400" cy="280" r="110" fill={g.sun} opacity="0.25" />

      {/* Clouds */}
      <g fill="#FFFFFF" opacity="0.35">
        <path d="M 80 150 Q 110 130 150 140 Q 180 120 220 145 Q 240 160 220 180 L 80 180 Z" />
        <path d="M 540 120 Q 570 100 610 110 Q 640 90 680 115 Q 700 130 680 150 L 540 150 Z" />
      </g>

      {/* Distant Hills Silhouette */}
      <path
        d="M 0 320 Q 200 270 400 310 Q 600 270 800 320 L 800 500 L 0 500 Z"
        fill={g.hill1}
      />

      {/* Foreground Mountain / Ridge */}
      <path
        d="M 0 370 Q 250 330 500 380 Q 680 350 800 390 L 800 500 L 0 500 Z"
        fill={g.hill2}
      />
    </svg>
  );
};
