import React from 'react';

interface AccessoryProps {
  color?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const WrapPaper: React.FC<AccessoryProps> = ({
  color = '#86EFAC',
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
      aria-label="Wrapping paper cone accessory"
    >
      <defs>
        {/* Slightly lighter version of color for stripes — we use white at low opacity */}
        <clipPath id="cone-clip">
          <path d="M 18 28 L 40 72 L 62 28 Z" />
        </clipPath>
      </defs>

      {/* Cone body */}
      <path
        d="M 18 28 L 40 72 L 62 28 Z"
        fill={color}
        opacity={0.9}
      />

      {/* Diagonal stripes on cone — clipped inside cone shape */}
      <g clipPath="url(#cone-clip)" opacity={0.25}>
        <line x1="10" y1="20" x2="50" y2="80" stroke="white" strokeWidth="5" />
        <line x1="22" y1="20" x2="62" y2="80" stroke="white" strokeWidth="5" />
        <line x1="34" y1="20" x2="74" y2="80" stroke="white" strokeWidth="5" />
        <line x1="-2" y1="20" x2="38" y2="80" stroke="white" strokeWidth="5" />
      </g>

      {/* Cone left edge highlight */}
      <path
        d="M 18 28 L 36 72 L 40 72 L 22 28 Z"
        fill="white"
        opacity={0.18}
      />

      {/* Ruffled / wavy top edge of cone */}
      <path
        d="
          M 14 28
          Q 18 22, 22 28
          Q 26 22, 30 28
          Q 34 22, 38 28
          Q 42 22, 46 28
          Q 50 22, 54 28
          Q 58 22, 62 28
          L 66 28
          L 62 30
          Q 58 24, 54 30
          Q 50 24, 46 30
          Q 42 24, 38 30
          Q 34 24, 30 30
          Q 26 24, 22 30
          Q 18 24, 14 30
          Z
        "
        fill={color}
        opacity={0.95}
      />
      {/* Ruffle top highlight */}
      <path
        d="
          M 14 28
          Q 18 22, 22 28
          Q 26 22, 30 28
          Q 34 22, 38 28
          Q 42 22, 46 28
          Q 50 22, 54 28
          Q 58 22, 62 28
        "
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        opacity={0.45}
        strokeLinecap="round"
      />
    </svg>
  );
};
