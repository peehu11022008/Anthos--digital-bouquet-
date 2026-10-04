import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Lavender: React.FC<FlowerProps> = ({
  petalColor = '#A78BFA',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  // Florets: 12 tiny ovals arranged in a spire from cy=100 upward
  // Each pair offset left/right alternately
  const florets: { x: number; y: number; rotate: number }[] = [];
  const spireTop = 28;
  const spireBottom = 100;
  const spireHeight = spireBottom - spireTop;
  const floretCount = 12;

  for (let i = 0; i < floretCount; i++) {
    const t = i / (floretCount - 1);
    const y = spireBottom - t * spireHeight;
    // Taper: wider at bottom, narrow at top
    const spread = 10 * (1 - t * 0.7);
    const side = i % 2 === 0 ? 1 : -1;
    florets.push({ x: 60 + side * spread, y, rotate: side * 20 });
    // Add opposite side floret at similar height but slightly offset
    if (i < floretCount - 2) {
      florets.push({ x: 60 - side * spread * 0.7, y: y - 4, rotate: -side * 15 });
    }
  }

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lavender flower illustration"
    >
      {/* Main stem */}
      <path
        d="M60 105 C60 125 60 148 60 168"
        stroke={stemColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Spire stem (thinner, going up into floret zone) */}
      <path
        d="M60 105 C60 88 60 65 60 28"
        stroke={stemColor}
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Left narrow leaf low on stem */}
      <path
        d="M60 130 C54 120 46 118 44 124 C46 130 54 132 60 130 Z"
        fill={stemColor}
        opacity="0.8"
      />
      <path
        d="M60 130 C53 122 46 119 44 124"
        stroke={stemColor}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Right narrow leaf low on stem */}
      <path
        d="M60 142 C66 132 74 130 76 136 C74 142 66 144 60 142 Z"
        fill={stemColor}
        opacity="0.8"
      />
      <path
        d="M60 142 C66 134 74 131 76 136"
        stroke={stemColor}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Florets */}
      {florets.map((f, i) => (
        <ellipse
          key={i}
          cx={f.x}
          cy={f.y}
          rx={4.5}
          ry={6.5}
          transform={`rotate(${f.rotate}, ${f.x}, ${f.y})`}
          fill={petalColor}
          stroke={petalColor}
          strokeWidth="0.5"
          opacity={0.75 + (i % 3) * 0.08}
        />
      ))}

      {/* Tiny tip floret at top */}
      <ellipse
        cx={60}
        cy={spireTop - 2}
        rx={3}
        ry={5}
        fill={petalColor}
        stroke={petalColor}
        strokeWidth="0.4"
        opacity="0.9"
      />
    </svg>
  );
};
