import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const BabyBreath: React.FC<FlowerProps> = ({
  petalColor = '#FEF3C7',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  // Define branching structure: main stem, then sub-branches, then tiny flowers
  // Branches radiate from various points along the upper half of the stem

  const branches: {
    x1: number; y1: number;
    cx1: number; cy1: number;
    cx2: number; cy2: number;
    x2: number; y2: number;
    flowers: { x: number; y: number }[];
  }[] = [
    // Left main branch from ~y=100
    {
      x1: 60, y1: 100, cx1: 50, cy1: 90, cx2: 36, cy2: 84, x2: 32, y2: 80,
      flowers: [
        { x: 32, y: 80 }, { x: 24, y: 74 }, { x: 38, y: 72 }, { x: 28, y: 64 },
      ],
    },
    // Right main branch from ~y=95
    {
      x1: 60, y1: 96, cx1: 70, cy1: 85, cx2: 84, cy2: 80, x2: 88, y2: 76,
      flowers: [
        { x: 88, y: 76 }, { x: 96, y: 70 }, { x: 82, y: 66 }, { x: 92, y: 60 },
      ],
    },
    // Left mid branch from ~y=80
    {
      x1: 60, y1: 82, cx1: 50, cy1: 72, cx2: 40, cy2: 66, x2: 36, y2: 62,
      flowers: [
        { x: 36, y: 62 }, { x: 28, y: 56 }, { x: 40, y: 54 }, { x: 32, y: 48 },
      ],
    },
    // Right mid branch from ~y=78
    {
      x1: 60, y1: 78, cx1: 70, cy1: 68, cx2: 80, cy2: 62, x2: 84, y2: 58,
      flowers: [
        { x: 84, y: 58 }, { x: 90, y: 52 }, { x: 78, y: 50 }, { x: 86, y: 44 },
      ],
    },
    // Center top branch
    {
      x1: 60, y1: 66, cx1: 56, cy1: 56, cx2: 58, cy2: 48, x2: 60, y2: 40,
      flowers: [
        { x: 60, y: 40 }, { x: 52, y: 34 }, { x: 68, y: 34 }, { x: 60, y: 28 },
      ],
    },
    // Extra left tiny branch
    {
      x1: 36, y1: 62, cx1: 30, cy1: 56, cx2: 24, cy2: 54, x2: 22, y2: 50,
      flowers: [
        { x: 22, y: 50 }, { x: 16, y: 46 }, { x: 24, y: 42 },
      ],
    },
    // Extra right tiny branch
    {
      x1: 84, y1: 58, cx1: 90, cy1: 52, cx2: 96, cy2: 50, x2: 98, y2: 46,
      flowers: [
        { x: 98, y: 46 }, { x: 104, y: 40 }, { x: 96, y: 36 },
      ],
    },
  ];

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Baby's breath flower illustration"
    >
      {/* Main stem */}
      <path
        d="M60 108 C60 125 60 148 60 168"
        stroke={stemColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Main stem up into spray zone */}
      <path
        d="M60 108 C60 95 60 80 60 66"
        stroke={stemColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Branch stems */}
      {branches.map((b, i) => (
        <path
          key={`branch-${i}`}
          d={`M ${b.x1} ${b.y1} C ${b.cx1} ${b.cy1} ${b.cx2} ${b.cy2} ${b.x2} ${b.y2}`}
          stroke={stemColor}
          strokeWidth={i < 5 ? 1.6 : 1.2}
          strokeLinecap="round"
          fill="none"
          opacity="0.75"
        />
      ))}

      {/* Tiny sub-branches from flower clusters */}
      {branches.map((b, bi) =>
        b.flowers.map((f, fi) =>
          fi > 0 ? (
            <line
              key={`sub-${bi}-${fi}`}
              x1={b.flowers[fi - 1].x}
              y1={b.flowers[fi - 1].y}
              x2={f.x}
              y2={f.y}
              stroke={stemColor}
              strokeWidth="1"
              opacity="0.6"
            />
          ) : null
        )
      )}

      {/* Tiny circular flowers */}
      {branches.flatMap((b, bi) =>
        b.flowers.map((f, fi) => (
          <g key={`flower-${bi}-${fi}`}>
            <circle cx={f.x} cy={f.y} r={4.5} fill={petalColor} opacity={0.7 + (fi % 3) * 0.1} />
            <circle cx={f.x} cy={f.y} r={2} fill={petalColor} opacity="0.95" />
            <circle cx={f.x} cy={f.y} r={1} fill="#FCD34D" opacity="0.8" />
          </g>
        ))
      )}
    </svg>
  );
};
