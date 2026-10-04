import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Tulip: React.FC<FlowerProps> = ({
  petalColor = '#F472B6',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Tulip flower illustration"
    >
      {/* Stem */}
      <path
        d="M60 118 C60 135 60 152 60 168"
        stroke={stemColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left strap leaf - curves outward */}
      <path
        d="M59 140 C52 130 38 124 32 132 C36 140 50 144 59 140 Z"
        fill={stemColor}
        stroke={stemColor}
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M59 140 C50 133 38 126 32 132"
        stroke={stemColor}
        strokeWidth="0.7"
        fill="none"
        opacity="0.55"
      />

      {/* Right strap leaf - curves outward */}
      <path
        d="M61 150 C68 140 82 134 88 142 C84 150 70 154 61 150 Z"
        fill={stemColor}
        stroke={stemColor}
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M61 150 C70 143 82 136 88 142"
        stroke={stemColor}
        strokeWidth="0.7"
        fill="none"
        opacity="0.55"
      />

      {/* Outer left petal */}
      <path
        d="M44 100 C38 78 46 52 60 48 C50 60 46 82 50 110 C47 108 44 104 44 100 Z"
        fill={petalColor}
        stroke={petalColor}
        strokeWidth="0.8"
        opacity="0.85"
      />

      {/* Outer right petal */}
      <path
        d="M76 100 C82 78 74 52 60 48 C70 60 74 82 70 110 C73 108 76 104 76 100 Z"
        fill={petalColor}
        stroke={petalColor}
        strokeWidth="0.8"
        opacity="0.85"
      />

      {/* Center main petal - tallest */}
      <path
        d="M60 118 C50 110 44 92 48 68 C50 54 56 44 60 42 C64 44 70 54 72 68 C76 92 70 110 60 118 Z"
        fill={petalColor}
        stroke={petalColor}
        strokeWidth="0.8"
        opacity="0.95"
      />

      {/* Inner left petal (visible inside the cup) */}
      <path
        d="M52 112 C48 98 50 78 56 64 C58 72 58 94 58 118 C55 116 52 114 52 112 Z"
        fill={petalColor}
        stroke={petalColor}
        strokeWidth="0.5"
        opacity="0.7"
      />

      {/* Inner right petal (visible inside the cup) */}
      <path
        d="M68 112 C72 98 70 78 64 64 C62 72 62 94 62 118 C65 116 68 114 68 112 Z"
        fill={petalColor}
        stroke={petalColor}
        strokeWidth="0.5"
        opacity="0.7"
      />

      {/* Subtle petal highlight lines */}
      <path
        d="M60 118 C60 90 60 65 60 42"
        stroke={petalColor}
        strokeWidth="0.6"
        fill="none"
        opacity="0.35"
      />
    </svg>
  );
};
