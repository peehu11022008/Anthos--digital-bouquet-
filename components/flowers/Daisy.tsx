import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Daisy: React.FC<FlowerProps> = ({
  petalColor = '#FAFAFA',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  const petals = [
    { angle: 0 },
    { angle: 25.7 },
    { angle: 51.4 },
    { angle: 77.1 },
    { angle: 102.8 },
    { angle: 128.5 },
    { angle: 154.2 },
    { angle: 180 },
    { angle: 205.7 },
    { angle: 231.4 },
    { angle: 257.1 },
    { angle: 282.8 },
    { angle: 308.5 },
    { angle: 334.2 },
  ];

  const cx = 60;
  const cy = 58;
  const centerR = 14;
  const petalLength = 26;
  const petalW = 8;

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Daisy flower illustration"
    >
      {/* Stem */}
      <path
        d="M60 72 C59 105 57 140 55 172"
        stroke={stemColor}
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.95"
      />

      {/* Left small jagged leaf */}
      <path
        d="M59 122 C53 115 43 112 38 117 C42 122 52 125 59 122 Z"
        fill={stemColor}
        opacity="0.85"
      />
      <path
        d="M60 122 C54 116 45 113 40 118"
        stroke={stemColor}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Right small jagged leaf */}
      <path
        d="M60 138 C66 130 76 128 80 134 C78 140 70 142 60 138 Z"
        fill={stemColor}
        opacity="0.85"
      />
      <path
        d="M60 138 C66 132 75 129 80 134"
        stroke={stemColor}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Petals - thin elongated */}
      {petals.map((p, i) => {
        const rad = (p.angle * Math.PI) / 180;
        const x1 = cx + (centerR + 1) * Math.cos(rad);
        const y1 = cy + (centerR + 1) * Math.sin(rad);
        const x2 = cx + (centerR + petalLength) * Math.cos(rad);
        const y2 = cy + (centerR + petalLength) * Math.sin(rad);
        const mx = Math.round(((x1 + x2) / 2) * 10) / 10;
        const my = Math.round(((y1 + y2) / 2) * 10) / 10;
        return (
          <ellipse
            key={i}
            cx={mx}
            cy={my}
            rx={petalW * 0.38}
            ry={petalLength * 0.5}
            transform={`rotate(${p.angle + 90}, ${mx}, ${my})`}
            fill={petalColor}
            stroke={petalColor === '#FAFAFA' ? '#D1D5DB' : petalColor}
            strokeWidth="0.6"
            opacity="0.95"
          />
        );
      })}

      {/* Yellow center button */}
      <circle cx={cx} cy={cy} r={centerR + 1} fill="#F59E0B" opacity="0.4" />
      <circle cx={cx} cy={cy} r={centerR} fill="#FCD34D" />
      <circle cx={cx} cy={cy} r={centerR - 2} fill="#FDE68A" opacity="0.5" />
      {/* Center dots with rounded coordinates */}
      {[0, 60, 120, 180, 240, 300].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        const dotX = Math.round((cx + 4 * Math.cos(rad)) * 10) / 10;
        const dotY = Math.round((cy + 4 * Math.sin(rad)) * 10) / 10;
        return (
          <circle
            key={i}
            cx={dotX}
            cy={dotY}
            r={1}
            fill="#D97706"
            opacity="0.7"
          />
        );
      })}
      <circle cx={cx} cy={cy} r={1.5} fill="#D97706" opacity="0.8" />
    </svg>
  );
};
