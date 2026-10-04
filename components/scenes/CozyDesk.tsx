import React from 'react';
import type { SceneSVGProps } from '@/types';

export const CozyDesk: React.FC<SceneSVGProps> = ({
  timeOfDay = 'afternoon',
  className = '',
  width = '100%',
  height = '100%',
}) => {
  const getWindowColors = () => {
    switch (timeOfDay) {
      case 'morning':
        return { sky: '#E0F2FE', wall: '#FEF9EF', desk: '#EADBC8', shadow: '#D6C0A9' };
      case 'sunset':
        return { sky: '#FBCFE8', wall: '#FDF2E9', desk: '#DEBCA0', shadow: '#C29878' };
      case 'night':
        return { sky: '#1E1B4B', wall: '#2D283E', desk: '#52433D', shadow: '#3B2E28' };
      case 'afternoon':
      default:
        return { sky: '#BAE6FD', wall: '#FFFDF9', desk: '#E8D5C0', shadow: '#CEB69E' };
    }
  };

  const colors = getWindowColors();

  return (
    <svg
      viewBox="0 0 800 500"
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cozy Room Wall */}
      <rect width="800" height="500" fill={colors.wall} />

      {/* Window Frame Background (Outdoor View) */}
      <rect x="220" y="40" width="360" height="250" rx="16" fill={colors.sky} />

      {/* Outside Details (Clouds or Stars) */}
      {timeOfDay === 'night' ? (
        <g opacity="0.85">
          <circle cx="500" cy="90" r="22" fill="#FEF9C3" />
          <circle cx="508" cy="85" r="20" fill={colors.sky} />
          <circle cx="280" cy="80" r="2" fill="#FFFFFF" />
          <circle cx="340" cy="120" r="1.5" fill="#FFFFFF" />
          <circle cx="440" cy="70" r="2.5" fill="#FFFFFF" />
          <circle cx="410" cy="150" r="2" fill="#FFFFFF" />
        </g>
      ) : (
        <g opacity="0.75" fill="#FFFFFF">
          <circle cx="330" cy="90" r="26" />
          <circle cx="360" cy="90" r="20" />
          <circle cx="310" cy="100" r="18" />
        </g>
      )}

      {/* Window Pane Grid */}
      <rect
        x="220"
        y="40"
        width="360"
        height="250"
        rx="16"
        fill="none"
        stroke={timeOfDay === 'night' ? '#4A3E56' : '#FFFFFF'}
        strokeWidth="14"
      />
      <line
        x1="400"
        y1="40"
        x2="400"
        y2="290"
        stroke={timeOfDay === 'night' ? '#4A3E56' : '#FFFFFF'}
        strokeWidth="10"
      />
      <line
        x1="220"
        y1="165"
        x2="580"
        y2="165"
        stroke={timeOfDay === 'night' ? '#4A3E56' : '#FFFFFF'}
        strokeWidth="10"
      />

      {/* Gentle Fabric Curtains */}
      <path
        d="M 190 30 Q 230 110 200 280 L 170 280 L 170 30 Z"
        fill={timeOfDay === 'night' ? '#5E5274' : '#FCE7F3'}
        opacity="0.85"
      />
      <path
        d="M 610 30 Q 570 110 600 280 L 630 280 L 630 30 Z"
        fill={timeOfDay === 'night' ? '#5E5274' : '#FCE7F3'}
        opacity="0.85"
      />

      {/* Curtain Rod */}
      <rect x="160" y="24" width="480" height="8" rx="4" fill="#C4A482" />
      <circle cx="160" cy="28" r="7" fill="#A07855" />
      <circle cx="640" cy="28" r="7" fill="#A07855" />

      {/* Desk Surface (Wooden Tabletop) */}
      <path
        d="M 0 320 L 800 320 L 800 500 L 0 500 Z"
        fill={colors.desk}
      />
      {/* Desk Edge Highlight & Shadow */}
      <rect x="0" y="320" width="800" height="12" fill={colors.shadow} opacity="0.5" />
      <line x1="0" y1="320" x2="800" y2="320" stroke="#FFFFFF" strokeWidth="2" opacity="0.4" />

      {/* Soft Sunlight Beam onto Table */}
      {timeOfDay !== 'night' && (
        <polygon
          points="260,290 540,290 680,500 120,500"
          fill="#FFFBEB"
          opacity="0.18"
        />
      )}
    </svg>
  );
};
