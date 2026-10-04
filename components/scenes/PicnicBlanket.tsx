import React from 'react';
import type { SceneSVGProps } from '@/types';

export const PicnicBlanket: React.FC<SceneSVGProps> = ({
  timeOfDay = 'afternoon',
  className = '',
  width = '100%',
  height = '100%',
}) => {
  const getTheme = () => {
    switch (timeOfDay) {
      case 'morning':
        return { sky: '#E0F2FE', grass: '#A7DCA5', blanket1: '#FDE2E4', blanket2: '#FFF1F2' };
      case 'sunset':
        return { sky: '#FED7AA', grass: '#9FBF8F', blanket1: '#FBCFE8', blanket2: '#FFF1F2' };
      case 'night':
        return { sky: '#1E1B4B', grass: '#1E3A2F', blanket1: '#475569', blanket2: '#334155' };
      case 'afternoon':
      default:
        return { sky: '#BAE6FD', grass: '#A3E699', blanket1: '#FCA5A5', blanket2: '#FEF2F2' };
    }
  };

  const theme = getTheme();

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
        <pattern id={`picnic-check-${timeOfDay}`} width="40" height="40" patternUnits="userSpaceOnUse">
          <rect width="40" height="40" fill={theme.blanket2} />
          <rect width="20" height="20" fill={theme.blanket1} opacity="0.6" />
          <rect x="20" y="20" width="20" height="20" fill={theme.blanket1} opacity="0.6" />
        </pattern>
      </defs>

      {/* Sky */}
      <rect width="800" height="220" fill={theme.sky} />

      {/* Meadow Grass Field */}
      <path
        d="M 0 180 Q 200 150 400 170 Q 600 190 800 160 L 800 500 L 0 500 Z"
        fill={theme.grass}
      />

      {/* Scattered background daisies in grass */}
      <g fill="#FFFFFF" opacity="0.7">
        <circle cx="120" cy="220" r="4" />
        <circle cx="120" cy="220" r="1.5" fill="#FCD34D" />
        <circle cx="210" cy="250" r="4" />
        <circle cx="210" cy="250" r="1.5" fill="#FCD34D" />
        <circle cx="680" cy="230" r="4" />
        <circle cx="680" cy="230" r="1.5" fill="#FCD34D" />
        <circle cx="740" cy="260" r="4" />
        <circle cx="740" cy="260" r="1.5" fill="#FCD34D" />
      </g>

      {/* Picnic Blanket (Isometric/Perspective Rhombus) */}
      <g transform="translate(100, 200)">
        <polygon
          points="300,40 560,140 260,280 20,160"
          fill={`url(#picnic-check-${timeOfDay})`}
          stroke="#FFFFFF"
          strokeWidth="6"
          strokeLinejoin="round"
        />
        {/* Soft edge fringe/shadow */}
        <polygon
          points="300,40 560,140 260,280 20,160"
          fill="none"
          stroke={theme.blanket1}
          strokeWidth="2"
          strokeDasharray="4 4"
        />
      </g>
    </svg>
  );
};
