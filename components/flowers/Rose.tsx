import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Rose: React.FC<FlowerProps> = ({
  petalColor = '#F87171',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  // Derive a slightly darker stroke color from petalColor
  const petalStroke = petalColor;
  const stemStroke = stemColor;

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Rose flower illustration"
    >
      {/* Stem */}
      <path
        d="M60 130 C58 145 56 158 55 170"
        stroke={stemStroke}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />

      {/* Left leaf */}
      <path
        d="M58 148 C48 140 36 138 34 130 C40 132 50 136 58 148 Z"
        fill={stemColor}
        stroke={stemStroke}
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Left leaf vein */}
      <path
        d="M58 148 C50 140 40 133 34 130"
        stroke={stemStroke}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Right leaf */}
      <path
        d="M60 155 C70 147 82 146 84 138 C78 140 68 144 60 155 Z"
        fill={stemColor}
        stroke={stemStroke}
        strokeWidth="1"
        opacity="0.85"
      />
      {/* Right leaf vein */}
      <path
        d="M60 155 C68 147 78 141 84 138"
        stroke={stemStroke}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Sepal / calyx */}
      <path
        d="M52 120 C50 112 54 108 60 107 C66 108 70 112 68 120 C65 116 61 115 60 115 C59 115 55 116 52 120 Z"
        fill={stemColor}
        opacity="0.8"
      />
      <path
        d="M47 122 C44 114 50 110 55 112"
        stroke={stemColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />
      <path
        d="M73 122 C76 114 70 110 65 112"
        stroke={stemColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.7"
      />

      {/* Outer petals (5) */}
      {/* Outer petal 1 - top left */}
      <path
        d="M60 68 C48 58 34 62 36 76 C38 88 50 90 60 86 C55 80 52 72 60 68 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.8"
        opacity="0.9"
      />
      {/* Outer petal 2 - top right */}
      <path
        d="M60 68 C72 58 86 62 84 76 C82 88 70 90 60 86 C65 80 68 72 60 68 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.8"
        opacity="0.9"
      />
      {/* Outer petal 3 - bottom left */}
      <path
        d="M52 82 C42 88 38 104 50 110 C60 114 66 106 64 96 C60 100 54 96 52 82 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.8"
        opacity="0.9"
      />
      {/* Outer petal 4 - bottom right */}
      <path
        d="M68 82 C78 88 82 104 70 110 C60 114 54 106 56 96 C60 100 66 96 68 82 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.8"
        opacity="0.9"
      />
      {/* Outer petal 5 - bottom center */}
      <path
        d="M60 86 C54 96 56 112 60 114 C64 112 66 96 60 86 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.8"
        opacity="0.85"
      />

      {/* Middle petals (3) - slightly smaller, layered inside */}
      {/* Middle petal 1 - left */}
      <path
        d="M60 74 C50 66 42 70 44 80 C46 90 56 90 60 86 C57 82 54 78 60 74 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.6"
        opacity="0.95"
      />
      {/* Middle petal 2 - right */}
      <path
        d="M60 74 C70 66 78 70 76 80 C74 90 64 90 60 86 C63 82 66 78 60 74 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.6"
        opacity="0.95"
      />
      {/* Middle petal 3 - top */}
      <path
        d="M60 74 C54 64 58 56 60 58 C62 56 66 64 60 74 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.6"
        opacity="0.95"
      />

      {/* Inner petals - tight spiral center */}
      <path
        d="M60 78 C55 72 56 66 60 68 C64 66 65 72 60 78 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.5"
        opacity="1"
      />
      <path
        d="M60 78 C56 74 58 70 60 72 C62 70 64 74 60 78 Z"
        fill={petalColor}
        stroke={petalStroke}
        strokeWidth="0.4"
        opacity="1"
      />

      {/* Tiny center */}
      <circle cx="60" cy="78" r="4" fill={petalColor} stroke={petalStroke} strokeWidth="0.5" opacity="1" />
      <circle cx="60" cy="78" r="2" fill={petalColor} stroke={petalStroke} strokeWidth="0.4" opacity="0.7" />
    </svg>
  );
};
