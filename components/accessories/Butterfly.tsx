import React from 'react';

interface AccessoryProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Butterfly: React.FC<AccessoryProps> = ({
  color = '#A78BFA',
  width = 80,
  height = 80,
  className,
}) => {
  // Slightly darker body color derived via opacity layering
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 80 80"
      width={width}
      height={height}
      className={className}
      aria-label="Butterfly accessory"
    >
      {/* Upper-left wing — larger organic rounded shape */}
      <path
        d="M 38 38 C 34 28, 16 18, 10 26 C 4 34, 18 48, 38 42 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Upper-left wing inner oval detail */}
      <ellipse cx="22" cy="33" rx="7" ry="5" fill="white" opacity={0.28} transform="rotate(-10 22 33)" />

      {/* Upper-right wing — mirrored */}
      <path
        d="M 42 38 C 46 28, 64 18, 70 26 C 76 34, 62 48, 42 42 Z"
        fill={color}
        opacity={0.9}
      />
      {/* Upper-right wing inner oval detail */}
      <ellipse cx="58" cy="33" rx="7" ry="5" fill="white" opacity={0.28} transform="rotate(10 58 33)" />

      {/* Lower-left wing — smaller, rounder */}
      <path
        d="M 38 42 C 32 46, 18 52, 16 60 C 14 66, 26 66, 36 56 Q 39 50 40 46 Z"
        fill={color}
        opacity={0.8}
      />
      {/* Lower-left wing inner oval detail */}
      <ellipse cx="26" cy="56" rx="5" ry="3.5" fill="white" opacity={0.22} transform="rotate(15 26 56)" />

      {/* Lower-right wing — mirrored */}
      <path
        d="M 42 42 C 48 46, 62 52, 64 60 C 66 66, 54 66, 44 56 Q 41 50 40 46 Z"
        fill={color}
        opacity={0.8}
      />
      {/* Lower-right wing inner oval detail */}
      <ellipse cx="54" cy="56" rx="5" ry="3.5" fill="white" opacity={0.22} transform="rotate(-15 54 56)" />

      {/* Upper wing highlights */}
      <path
        d="M 36 36 C 32 28, 20 21, 14 27 C 16 25, 28 20, 36 34 Z"
        fill="white"
        opacity={0.3}
      />
      <path
        d="M 44 36 C 48 28, 60 21, 66 27 C 64 25, 52 20, 44 34 Z"
        fill="white"
        opacity={0.3}
      />

      {/* Body — central oval, slightly darker */}
      <ellipse cx="40" cy="42" rx="3" ry="8" fill={color} />
      <ellipse cx="40" cy="42" rx="3" ry="8" fill="#000" opacity={0.2} />
      {/* Body highlight */}
      <ellipse cx="39" cy="39" rx="1" ry="2.5" fill="white" opacity={0.4} />

      {/* Left antenna */}
      <path
        d="M 38 34 Q 32 24 30 18"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle cx="30" cy="18" r="2" fill={color} opacity={0.9} />

      {/* Right antenna */}
      <path
        d="M 42 34 Q 48 24 50 18"
        stroke={color}
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        opacity={0.9}
      />
      <circle cx="50" cy="18" r="2" fill={color} opacity={0.9} />
    </svg>
  );
};
