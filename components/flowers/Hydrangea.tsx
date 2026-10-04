import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Hydrangea: React.FC<FlowerProps> = ({
  petalColor = '#93C5FD',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  // Place ~18 tiny florets in a dome/circle arrangement
  const domeR = 28;
  const cx = 60;
  const cy = 65;

  // Floret positions: fill a circle dome with random-ish but structured grid
  const florets: { x: number; y: number }[] = [];
  // Ring 0: center
  florets.push({ x: cx, y: cy });
  // Ring 1: 6 florets
  for (let i = 0; i < 6; i++) {
    const a = (i * 60 * Math.PI) / 180;
    florets.push({ x: cx + 12 * Math.cos(a), y: cy + 11 * Math.sin(a) });
  }
  // Ring 2: 12 florets
  for (let i = 0; i < 12; i++) {
    const a = (i * 30 * Math.PI) / 180;
    florets.push({ x: cx + 22 * Math.cos(a), y: cy + 20 * Math.sin(a) });
  }

  // Each floret is 4 tiny oval petals around a tiny circle center
  const floretPetalAngles = [0, 90, 180, 270];

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Hydrangea flower illustration"
    >
      {/* Short stem */}
      <path
        d="M60 92 C60 108 60 128 60 168"
        stroke={stemColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Large left oval leaf */}
      <path
        d="M59 118 C48 106 30 102 26 114 C24 126 38 136 54 130 C58 128 60 124 59 118 Z"
        fill={stemColor}
        opacity="0.82"
      />
      <path
        d="M59 118 C48 108 32 103 26 114"
        stroke={stemColor}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />

      {/* Large right oval leaf */}
      <path
        d="M61 138 C72 126 90 122 94 134 C96 146 82 156 66 150 C62 148 60 144 61 138 Z"
        fill={stemColor}
        opacity="0.82"
      />
      <path
        d="M61 138 C72 128 88 123 94 134"
        stroke={stemColor}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />

      {/* Soft dome backing circle */}
      <circle cx={cx} cy={cy} r={domeR + 4} fill={petalColor} opacity="0.18" />

      {/* Florets */}
      {florets.map((f, fi) =>
        floretPetalAngles.map((angle, pi) => {
          const rad = (angle * Math.PI) / 180;
          const px = f.x + 5.5 * Math.cos(rad);
          const py = f.y + 5.5 * Math.sin(rad);
          return (
            <ellipse
              key={`${fi}-${pi}`}
              cx={px}
              cy={py}
              rx={3.5}
              ry={4}
              transform={`rotate(${angle}, ${px}, ${py})`}
              fill={petalColor}
              stroke={petalColor}
              strokeWidth="0.4"
              opacity={0.78 + (fi % 4) * 0.055}
            />
          );
        })
      )}

      {/* Floret centers */}
      {florets.map((f, fi) => (
        <circle key={`center-${fi}`} cx={f.x} cy={f.y} r={2.2} fill="#FDE68A" opacity="0.85" />
      ))}
    </svg>
  );
};
