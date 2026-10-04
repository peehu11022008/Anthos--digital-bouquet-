import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const CherryBlossom: React.FC<FlowerProps> = ({
  petalColor = '#FBCFE8',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  // Branch is always brown regardless of stemColor
  const branchColor = '#92400E';
  const cx = 62;
  const cy = 68;

  // 5 notched/heart-tipped petals
  const petalAngles = [270, 342, 54, 126, 198];

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Cherry blossom flower illustration"
    >
      {/* Main branch */}
      <path
        d="M62 92 C60 112 55 135 50 168"
        stroke={branchColor}
        strokeWidth="5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sub branch left - to a bud */}
      <path
        d="M58 110 C48 100 36 95 30 98"
        stroke={branchColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Sub branch right - to a bud */}
      <path
        d="M55 128 C65 118 78 115 84 118"
        stroke={branchColor}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Bud left */}
      <ellipse cx="28" cy="98" rx="7" ry="9" fill={petalColor} stroke={branchColor} strokeWidth="0.8" opacity="0.85" />
      <path
        d="M24 102 C26 96 30 94 28 89"
        stroke={branchColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* Bud right */}
      <ellipse cx="86" cy="119" rx="7" ry="9" fill={petalColor} stroke={branchColor} strokeWidth="0.8" opacity="0.85" />
      <path
        d="M82 123 C84 117 88 115 86 110"
        stroke={branchColor}
        strokeWidth="1.2"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />

      {/* Petals: heart-notched, each is two lobes with a notch at tip */}
      {petalAngles.map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const dist = 24;
        // Petal center tip
        const tipX = cx + dist * Math.cos(rad);
        const tipY = cy + dist * Math.sin(rad);
        // Half-angle offsets for lobes
        const lRad = rad - 0.28;
        const rRad = rad + 0.28;
        const lx = cx + (dist - 4) * Math.cos(lRad);
        const ly = cy + (dist - 4) * Math.sin(lRad);
        const rx2 = cx + (dist - 4) * Math.cos(rRad);
        const ry2 = cy + (dist - 4) * Math.sin(rRad);
        // Base of petal near center
        const baseSpread = 10;
        const bLx = cx + baseSpread * Math.cos(rad - 0.55);
        const bLy = cy + baseSpread * Math.sin(rad - 0.55);
        const bRx = cx + baseSpread * Math.cos(rad + 0.55);
        const bRy = cy + baseSpread * Math.sin(rad + 0.55);

        return (
          <path
            key={i}
            d={`M ${bLx} ${bLy}
               C ${lx} ${ly} ${tipX - 2 * Math.cos(rad - 0.15)} ${tipY - 2 * Math.sin(rad - 0.15)}
                 ${tipX} ${tipY}
               C ${tipX + 2 * Math.cos(rad + 0.15)} ${tipY + 2 * Math.sin(rad + 0.15)}
                 ${rx2} ${ry2} ${bRx} ${bRy}
               C ${cx + 5 * Math.cos(rad + 0.9)} ${cy + 5 * Math.sin(rad + 0.9)}
                 ${cx + 5 * Math.cos(rad - 0.9)} ${cy + 5 * Math.sin(rad - 0.9)}
                 ${bLx} ${bLy} Z`}
            fill={petalColor}
            stroke={petalColor}
            strokeWidth="0.7"
            opacity={0.88}
          />
        );
      })}

      {/* Stamens cluster */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const len = i % 2 === 0 ? 10 : 8;
        return (
          <g key={`stamen-${i}`}>
            <line
              x1={cx}
              y1={cy}
              x2={cx + len * Math.cos(rad)}
              y2={cy + len * Math.sin(rad)}
              stroke="#F9A8D4"
              strokeWidth="0.9"
              opacity="0.9"
            />
            <circle
              cx={cx + len * Math.cos(rad)}
              cy={cy + len * Math.sin(rad)}
              r={1.5}
              fill="#F472B6"
              opacity="0.9"
            />
          </g>
        );
      })}

      {/* Center */}
      <circle cx={cx} cy={cy} r={3} fill="#FDE68A" opacity="0.9" />
    </svg>
  );
};
