import React from 'react';

interface AccessoryProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Ribbon: React.FC<AccessoryProps> = ({
  color = '#E879A0',
  width = 80,
  height = 80,
  className,
}) => {
  // Derive a slightly darker shade for strokes/shadows
  const toHsl = (hex: string, lightenBy = 0) => hex; // passthrough, we use opacity
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width={width}
      height={height}
      className={className}
      aria-label="Ribbon accessory"
    >
      {/* Left ribbon tail — curved diagonal flowing down-left */}
      <path
        d="M 38 42 Q 26 54 18 70 Q 16 75 20 74 Q 24 73 28 62 Q 34 50 40 44 Z"
        fill={color}
        opacity={0.85}
      />
      {/* Left tail inner highlight */}
      <path
        d="M 36 44 Q 26 55 20 68 Q 22 66 28 56 Q 33 48 38 43 Z"
        fill="white"
        opacity={0.25}
      />

      {/* Right ribbon tail — curved diagonal flowing down-right */}
      <path
        d="M 42 42 Q 54 54 62 70 Q 64 75 60 74 Q 56 73 52 62 Q 46 50 40 44 Z"
        fill={color}
        opacity={0.85}
      />
      {/* Right tail inner highlight */}
      <path
        d="M 44 44 Q 54 55 60 68 Q 58 66 52 56 Q 47 48 42 43 Z"
        fill="white"
        opacity={0.25}
      />

      {/* Left upper ribbon arc — sweeping up-left from knot */}
      <path
        d="M 38 38 Q 22 24 14 16 Q 10 12 14 10 Q 18 8 24 18 Q 32 30 40 38 Z"
        fill={color}
        opacity={0.9}
      />
      <path
        d="M 37 37 Q 22 26 16 17 Q 18 16 23 20 Q 31 31 39 38 Z"
        fill="white"
        opacity={0.22}
      />

      {/* Right upper ribbon arc — sweeping up-right from knot */}
      <path
        d="M 42 38 Q 58 24 66 16 Q 70 12 66 10 Q 62 8 56 18 Q 48 30 40 38 Z"
        fill={color}
        opacity={0.9}
      />
      <path
        d="M 43 37 Q 58 26 64 17 Q 62 16 57 20 Q 49 31 41 38 Z"
        fill="white"
        opacity={0.22}
      />

      {/* Central knot — small filled circle */}
      <circle cx="40" cy="40" r="6" fill={color} />
      <circle cx="40" cy="40" r="6" fill="none" stroke="white" strokeWidth="1" opacity={0.4} />
      {/* Knot highlight */}
      <ellipse cx="38" cy="38" rx="2.5" ry="1.5" fill="white" opacity={0.45} />
    </svg>
  );
};
