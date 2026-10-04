import React from 'react';

interface AccessoryProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Bow: React.FC<AccessoryProps> = ({
  color = '#F472B6',
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
      aria-label="Bow accessory"
    >
      {/* Left loop of bow — puffy rounded teardrop */}
      <path
        d="M 38 40 C 34 30, 14 22, 12 32 C 10 42, 28 46, 38 40 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Left loop inner shadow */}
      <path
        d="M 36 40 C 32 33, 18 26, 16 33 C 14 40, 28 44, 36 40 Z"
        fill="white"
        opacity={0.18}
      />
      {/* Left loop highlight */}
      <ellipse cx="22" cy="30" rx="6" ry="4" fill="white" opacity={0.3} transform="rotate(-20 22 30)" />

      {/* Right loop of bow — puffy rounded teardrop (mirrored) */}
      <path
        d="M 42 40 C 46 30, 66 22, 68 32 C 70 42, 52 46, 42 40 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Right loop inner shadow */}
      <path
        d="M 44 40 C 48 33, 62 26, 64 33 C 66 40, 52 44, 44 40 Z"
        fill="white"
        opacity={0.18}
      />
      {/* Right loop highlight */}
      <ellipse cx="58" cy="30" rx="6" ry="4" fill="white" opacity={0.3} transform="rotate(20 58 30)" />

      {/* Left tail — small drooping shape */}
      <path
        d="M 37 43 C 30 48, 26 58, 28 62 C 30 65, 34 60, 38 52 Z"
        fill={color}
        opacity={0.85}
      />
      {/* Right tail */}
      <path
        d="M 43 43 C 50 48, 54 58, 52 62 C 50 65, 46 60, 42 52 Z"
        fill={color}
        opacity={0.85}
      />

      {/* Center knot — oval */}
      <ellipse cx="40" cy="40" rx="6" ry="5" fill={color} />
      {/* Knot border subtle */}
      <ellipse cx="40" cy="40" rx="6" ry="5" fill="none" stroke="white" strokeWidth="1.2" opacity={0.35} />
      {/* Knot highlight */}
      <ellipse cx="38.5" cy="38" rx="2.5" ry="1.6" fill="white" opacity={0.5} />
    </svg>
  );
};
