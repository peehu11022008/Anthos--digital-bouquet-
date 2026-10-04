import React from 'react';

interface AccessoryProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

// Helper: compute a 5-pointed star path with rounded points feel
// We use a pre-computed smooth star path for softness
const STAR_PATH =
  'M 40 10 C 41.5 22, 48 26, 60 27 C 50 33, 52 40, 56 54 C 48 46, 40 48, 32 54 C 36 40, 30 33, 20 27 C 32 26, 38.5 22, 40 10 Z';

export const Star: React.FC<AccessoryProps> = ({
  color = '#FBBF24',
  width = 80,
  height = 80,
  className,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width={width}
      height={height}
      className={className}
      aria-label="Star accessory"
    >
      {/* Subtle drop shadow */}
      <path
        d={STAR_PATH}
        fill="#000"
        opacity={0.08}
        transform="translate(2, 3)"
      />

      {/* Main star body */}
      <path d={STAR_PATH} fill={color} />

      {/* Stroke for soft border definition */}
      <path
        d={STAR_PATH}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        opacity={0.55}
      />

      {/* Upper highlight — soft shine on upper portion */}
      <ellipse
        cx="36"
        cy="22"
        rx="9"
        ry="5"
        fill="white"
        opacity={0.35}
        transform="rotate(-15 36 22)"
      />
      {/* Smaller secondary highlight */}
      <ellipse
        cx="34"
        cy="18"
        rx="4"
        ry="2.5"
        fill="white"
        opacity={0.45}
        transform="rotate(-15 34 18)"
      />
    </svg>
  );
};
