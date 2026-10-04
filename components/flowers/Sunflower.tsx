import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Sunflower: React.FC<FlowerProps> = ({
  petalColor = '#FCD34D',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  const cx = 60;
  const cy = 68;
  const petalCount = 16;
  const petalLength = 26;
  const petalWidth = 9;
  const centerR = 20;

  // Generate petals radially
  const petals = Array.from({ length: petalCount }, (_, i) => {
    const angle = (i * 360) / petalCount;
    const rad = (angle * Math.PI) / 180;
    const innerR = centerR + 2;
    const outerR = centerR + petalLength;
    const x1 = cx + innerR * Math.cos(rad);
    const y1 = cy + innerR * Math.sin(rad);
    const x2 = cx + outerR * Math.cos(rad);
    const y2 = cy + outerR * Math.sin(rad);
    // Perpendicular for petal width
    const perpX = Math.cos(rad + Math.PI / 2) * petalWidth * 0.5;
    const perpY = Math.sin(rad + Math.PI / 2) * petalWidth * 0.5;
    const midR = innerR + (outerR - innerR) * 0.45;
    const mx = cx + midR * Math.cos(rad);
    const my = cy + midR * Math.sin(rad);
    return { x1, y1, x2, y2, mx, my, perpX, perpY };
  });

  // Seed dots pattern
  const seedDots: { x: number; y: number }[] = [];
  const rings = [3, 7, 11];
  rings.forEach((count, ri) => {
    const r = (ri + 1) * (centerR / (rings.length + 0.5));
    for (let i = 0; i < count; i++) {
      const a = ((i * 360) / count + ri * 20) * (Math.PI / 180);
      seedDots.push({ x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) });
    }
  });
  seedDots.push({ x: cx, y: cy });

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Sunflower illustration"
    >
      {/* Stem - thick */}
      <path
        d="M60 90 C59 108 58 125 57 168"
        stroke={stemColor}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Left heart-shaped leaf */}
      <path
        d="M59 128 C52 116 36 110 30 120 C28 130 36 140 50 138 C55 136 58 132 59 128 Z"
        fill={stemColor}
        stroke={stemColor}
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M59 128 C52 120 38 113 30 120"
        stroke={stemColor}
        strokeWidth="0.7"
        fill="none"
        opacity="0.5"
      />

      {/* Right heart-shaped leaf */}
      <path
        d="M58 148 C65 136 80 130 86 140 C88 150 80 160 66 158 C61 156 58 152 58 148 Z"
        fill={stemColor}
        stroke={stemColor}
        strokeWidth="0.8"
        opacity="0.85"
      />
      <path
        d="M58 148 C65 140 80 133 86 140"
        stroke={stemColor}
        strokeWidth="0.7"
        fill="none"
        opacity="0.5"
      />

      {/* Petals - back row (offset) */}
      {petals.map((p, i) =>
        i % 2 === 0 ? (
          <ellipse
            key={`petal-back-${i}`}
            cx={(p.x1 + p.x2) / 2}
            cy={(p.y1 + p.y2) / 2}
            rx={petalWidth * 0.42}
            ry={petalLength * 0.52}
            transform={`rotate(${(i * 360) / petalCount + 90}, ${(p.x1 + p.x2) / 2}, ${(p.y1 + p.y2) / 2})`}
            fill={petalColor}
            stroke={petalColor}
            strokeWidth="0.6"
            opacity="0.65"
          />
        ) : null
      )}

      {/* Petals - front row */}
      {petals.map((p, i) =>
        i % 2 !== 0 ? (
          <ellipse
            key={`petal-front-${i}`}
            cx={(p.x1 + p.x2) / 2}
            cy={(p.y1 + p.y2) / 2}
            rx={petalWidth * 0.45}
            ry={petalLength * 0.55}
            transform={`rotate(${(i * 360) / petalCount + 90}, ${(p.x1 + p.x2) / 2}, ${(p.y1 + p.y2) / 2})`}
            fill={petalColor}
            stroke={petalColor}
            strokeWidth="0.6"
            opacity="0.9"
          />
        ) : null
      )}

      {/* Center circle */}
      <circle cx={cx} cy={cy} r={centerR + 1} fill="#92400E" opacity="0.95" />
      <circle cx={cx} cy={cy} r={centerR} fill="#7B5C2A" />

      {/* Seed dots */}
      {seedDots.map((d, i) => (
        <circle key={`seed-${i}`} cx={d.x} cy={d.y} r={1.4} fill="#5C3D11" opacity="0.75" />
      ))}
    </svg>
  );
};
