import React from 'react';
import type { SceneSVGProps } from '@/types';

export const LittleGarden: React.FC<SceneSVGProps> = ({
  timeOfDay = 'afternoon',
  className = '',
  width = '100%',
  height = '100%',
}) => {
  const getSkyGradients = () => {
    switch (timeOfDay) {
      case 'morning':
        return { start: '#E0F2FE', end: '#FEF3C7', hill1: '#A7D79C', hill2: '#86C577' };
      case 'sunset':
        return { start: '#FBCFE8', end: '#FED7AA', hill1: '#B9936C', hill2: '#967049' };
      case 'night':
        return { start: '#1E1B4B', end: '#312E81', hill1: '#1F3F3B', hill2: '#142E2A' };
      case 'afternoon':
      default:
        return { start: '#BAE6FD', end: '#FFFBEB', hill1: '#B2E0A4', hill2: '#91CF82' };
    }
  };

  const colors = getSkyGradients();

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
        <linearGradient id={`garden-sky-${timeOfDay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={colors.start} />
          <stop offset="100%" stopColor={colors.end} />
        </linearGradient>
        <linearGradient id={`garden-sun-${timeOfDay}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFFBEB" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FDE68A" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect width="800" height="500" fill={`url(#garden-sky-${timeOfDay})`} />

      {/* Sun / Moon or Stars */}
      {timeOfDay === 'night' ? (
        <g opacity="0.8">
          <circle cx="680" cy="90" r="30" fill="#FEF9C3" />
          <circle cx="690" cy="85" r="28" fill="#1E1B4B" />
          {/* Stars */}
          <circle cx="120" cy="70" r="2.5" fill="#FFFFFF" opacity="0.7" />
          <circle cx="240" cy="110" r="2" fill="#FFFFFF" opacity="0.8" />
          <circle cx="380" cy="60" r="2.5" fill="#FFFFFF" opacity="0.6" />
          <circle cx="520" cy="95" r="3" fill="#FFFFFF" opacity="0.9" />
          <circle cx="600" cy="40" r="2" fill="#FFFFFF" opacity="0.7" />
          <circle cx="180" cy="160" r="1.5" fill="#FFFFFF" opacity="0.5" />
        </g>
      ) : (
        <circle cx="660" cy="110" r="45" fill={`url(#garden-sun-${timeOfDay})`} />
      )}

      {/* Soft Clouds (daytime/sunset) */}
      {timeOfDay !== 'night' && (
        <g fill="#FFFFFF" opacity="0.65">
          <path d="M 120 120 Q 135 100 160 105 Q 185 95 205 115 Q 220 125 210 140 Q 160 145 120 140 Z" />
          <path d="M 440 90 Q 455 75 480 80 Q 500 70 520 85 Q 535 95 525 110 Q 480 115 440 105 Z" />
          <path d="M 300 160 Q 315 145 335 150 Q 350 140 365 155 Q 375 165 370 175 Q 330 180 300 175 Z" opacity="0.45" />
        </g>
      )}

      {/* Distant Hills */}
      <path
        d="M 0 350 Q 180 270 380 320 Q 580 370 800 300 L 800 500 L 0 500 Z"
        fill={colors.hill1}
        opacity="0.85"
      />

      {/* Midground Hills */}
      <path
        d="M 0 380 Q 250 320 500 360 Q 680 390 800 350 L 800 500 L 0 500 Z"
        fill={colors.hill2}
      />

      {/* Foreground Meadow */}
      <path
        d="M 0 420 Q 200 380 400 400 Q 600 420 800 390 L 800 500 L 0 500 Z"
        fill={timeOfDay === 'night' ? '#122622' : '#7CBF6B'}
      />

      {/* Tiny decorative wild grass and blossom silhouettes */}
      <g stroke={timeOfDay === 'night' ? '#1B3833' : '#6AA85B'} strokeWidth="2.5" strokeLinecap="round">
        <path d="M 60 450 Q 65 430 70 420" />
        <path d="M 67 450 Q 75 435 85 430" />
        <path d="M 160 470 Q 165 445 160 435" />
        <path d="M 168 470 Q 175 450 185 445" />
        <path d="M 640 460 Q 645 440 655 430" />
        <path d="M 650 460 Q 660 445 670 440" />
        <path d="M 720 480 Q 725 455 720 440" />
      </g>
    </svg>
  );
};
