import React from 'react';

interface AccessoryProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Sparkle: React.FC<AccessoryProps> = ({
  color = '#FCD34D',
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
      aria-label="Sparkle accessory"
    >
      {/* 4-pointed star: elongated top/bottom, shorter left/right */}
      {/* Using a polygon-style path for the 4-pointed star */}
      <path
        d="
          M 40 8
          C 41.5 24, 42 28, 56 40
          C 42 41.5, 41.5 44, 40 72
          C 38.5 44, 38 41.5, 24 40
          C 38 28, 38.5 24, 40 8
          Z
        "
        fill={color}
        opacity={0.95}
      />

      {/* Inner highlight on top spike */}
      <path
        d="M 40 8 C 40.6 22, 41 26, 44 34 C 42 28, 41 16, 40 8 Z"
        fill="white"
        opacity={0.35}
      />

      {/* Center circle */}
      <circle cx="40" cy="40" r="5" fill={color} />
      <circle cx="40" cy="40" r="5" fill="white" opacity={0.3} />

      {/* Small satellite dots around the sparkle */}
      <circle cx="40" cy="16" r="2" fill={color} opacity={0.6} />
      <circle cx="40" cy="64" r="2" fill={color} opacity={0.6} />
      <circle cx="16" cy="40" r="2" fill={color} opacity={0.6} />
      <circle cx="64" cy="40" r="2" fill={color} opacity={0.6} />

      {/* Tiny diagonal dots */}
      <circle cx="22" cy="22" r="1.5" fill={color} opacity={0.4} />
      <circle cx="58" cy="22" r="1.5" fill={color} opacity={0.4} />
      <circle cx="22" cy="58" r="1.5" fill={color} opacity={0.4} />
      <circle cx="58" cy="58" r="1.5" fill={color} opacity={0.4} />
    </svg>
  );
};
