import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

// Helper to darken a hex color slightly for stamens
function darkenColor(hex: string, amount = 40): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return hex;
  const r = Math.max(0, parseInt(result[1], 16) - amount);
  const g = Math.max(0, parseInt(result[2], 16) - amount);
  const b = Math.max(0, parseInt(result[3], 16) - amount);
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

export const Lily: React.FC<FlowerProps> = ({
  petalColor = '#FB923C',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  const cx = 60;
  const cy = 70;
  const stamenColor = darkenColor(petalColor, 35);

  // 6 petals: backward-curving, each starts near center and sweeps out + back
  const petalAngles = [0, 60, 120, 180, 240, 300];

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Lily flower illustration"
    >
      {/* Long straight stem */}
      <path
        d="M60 100 C60 120 60 144 60 168"
        stroke={stemColor}
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />

      {/* Narrow leaf 1 along stem */}
      <path
        d="M60 118 C54 108 44 104 40 110 C44 118 54 120 60 118 Z"
        fill={stemColor}
        opacity="0.85"
      />
      <path
        d="M60 118 C53 110 44 105 40 110"
        stroke={stemColor}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Narrow leaf 2 along stem */}
      <path
        d="M60 138 C66 128 76 124 80 130 C76 138 66 140 60 138 Z"
        fill={stemColor}
        opacity="0.85"
      />
      <path
        d="M60 138 C66 130 76 125 80 130"
        stroke={stemColor}
        strokeWidth="0.6"
        fill="none"
        opacity="0.5"
      />

      {/* Narrow leaf 3 higher on stem */}
      <path
        d="M60 108 C54 98 44 95 42 101 C46 108 54 110 60 108 Z"
        fill={stemColor}
        opacity="0.7"
      />

      {/* Petals - backward curving */}
      {petalAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        // Petal tip - far out
        const tipX = cx + 34 * Math.cos(rad);
        const tipY = cy + 34 * Math.sin(rad);
        // Control points for the backward curve sweep
        const c1x = cx + 10 * Math.cos(rad) + 18 * Math.cos(rad + Math.PI / 3);
        const c1y = cy + 10 * Math.sin(rad) + 18 * Math.sin(rad + Math.PI / 3);
        const c2x = tipX + 14 * Math.cos(rad + Math.PI / 2.5);
        const c2y = tipY + 14 * Math.sin(rad + Math.PI / 2.5);
        // Return path - other side
        const c3x = tipX + 14 * Math.cos(rad - Math.PI / 2.5);
        const c3y = tipY + 14 * Math.sin(rad - Math.PI / 2.5);
        const c4x = cx + 10 * Math.cos(rad) - 18 * Math.cos(rad + Math.PI / 3);
        const c4y = cy + 10 * Math.sin(rad) - 18 * Math.sin(rad + Math.PI / 3);

        return (
          <path
            key={i}
            d={`M ${cx} ${cy}
               C ${c1x} ${c1y} ${c2x} ${c2y} ${tipX} ${tipY}
               C ${c3x} ${c3y} ${c4x} ${c4y} ${cx} ${cy} Z`}
            fill={petalColor}
            stroke={petalColor}
            strokeWidth="0.7"
            opacity={i % 2 === 0 ? 0.92 : 0.78}
          />
        );
      })}

      {/* Freckle dots on petals */}
      {petalAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dx = cx + 18 * Math.cos(rad);
        const dy = cy + 18 * Math.sin(rad);
        return (
          <circle key={`freckle-${i}`} cx={dx} cy={dy} r={1.8} fill={stamenColor} opacity="0.5" />
        );
      })}

      {/* Stamens */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = ((angle + 30) * Math.PI) / 180;
        const x2 = cx + 16 * Math.cos(rad);
        const y2 = cy + 16 * Math.sin(rad);
        return (
          <g key={`stamen-${i}`}>
            <line x1={cx} y1={cy} x2={x2} y2={y2} stroke={stamenColor} strokeWidth="1" opacity="0.8" />
            <circle cx={x2} cy={y2} r={2} fill={stamenColor} opacity="0.9" />
          </g>
        );
      })}

      {/* Center pistil */}
      <circle cx={cx} cy={cy} r={3.5} fill={stamenColor} opacity="0.9" />
      <circle cx={cx} cy={cy} r={2} fill="#FDE68A" opacity="0.7" />
    </svg>
  );
};
