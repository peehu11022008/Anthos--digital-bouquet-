import React from 'react';

interface AccessoryProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Heart: React.FC<AccessoryProps> = ({
  color = '#FB7185',
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
      aria-label="Heart accessory"
    >
      {/* Drop shadow layer */}
      <path
        d="
          M 40 68
          C 20 54, 8 44, 8 30
          C 8 20, 16 12, 26 12
          C 32 12, 37 15, 40 19
          C 43 15, 48 12, 54 12
          C 64 12, 72 20, 72 30
          C 72 44, 60 54, 40 68
          Z
        "
        fill="#000"
        opacity={0.08}
        transform="translate(2, 3)"
      />

      {/* Main heart body */}
      <path
        d="
          M 40 68
          C 20 54, 8 44, 8 30
          C 8 20, 16 12, 26 12
          C 32 12, 37 15, 40 19
          C 43 15, 48 12, 54 12
          C 64 12, 72 20, 72 30
          C 72 44, 60 54, 40 68
          Z
        "
        fill={color}
      />

      {/* Slightly darker stroke for definition — uses color at lower opacity */}
      <path
        d="
          M 40 68
          C 20 54, 8 44, 8 30
          C 8 20, 16 12, 26 12
          C 32 12, 37 15, 40 19
          C 43 15, 48 12, 54 12
          C 64 12, 72 20, 72 30
          C 72 44, 60 54, 40 68
          Z
        "
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity={0.6}
      />

      {/* Upper-left highlight oval — gives slight 3D feel */}
      <ellipse
        cx="28"
        cy="24"
        rx="9"
        ry="6"
        fill="white"
        opacity={0.38}
        transform="rotate(-30 28 24)"
      />

      {/* Smaller secondary highlight */}
      <ellipse
        cx="24"
        cy="20"
        rx="4"
        ry="2.5"
        fill="white"
        opacity={0.5}
        transform="rotate(-30 24 20)"
      />
    </svg>
  );
};
