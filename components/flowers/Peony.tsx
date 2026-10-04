import React from 'react';

interface FlowerProps {
  petalColor?: string;
  stemColor?: string;
  width?: number;
  height?: number;
  className?: string;
}

export const Peony: React.FC<FlowerProps> = ({
  petalColor = '#FDA4AF',
  stemColor = '#4ADE80',
  width = 120,
  height = 180,
  className,
}) => {
  const cx = 60;
  const cy = 66;

  // Outer ring: 6 large petals
  const outerPetals = Array.from({ length: 6 }, (_, i) => ({
    angle: i * 60,
    rx: 14,
    ry: 20,
    dist: 24,
    opacity: 0.82,
  }));

  // Middle ring: 6 medium petals, offset by 30deg
  const middlePetals = Array.from({ length: 6 }, (_, i) => ({
    angle: i * 60 + 30,
    rx: 11,
    ry: 16,
    dist: 15,
    opacity: 0.9,
  }));

  // Inner cluster: small curved petals, 7 of them
  const innerPetals = Array.from({ length: 7 }, (_, i) => ({
    angle: i * (360 / 7),
    rx: 7,
    ry: 11,
    dist: 8,
    opacity: 0.95,
  }));

  const renderPetalRing = (
    petals: { angle: number; rx: number; ry: number; dist: number; opacity: number }[],
    keyPrefix: string
  ) =>
    petals.map((p, i) => {
      const rad = (p.angle * Math.PI) / 180;
      const ex = cx + p.dist * Math.cos(rad);
      const ey = cy + p.dist * Math.sin(rad);
      return (
        <ellipse
          key={`${keyPrefix}-${i}`}
          cx={ex}
          cy={ey}
          rx={p.rx}
          ry={p.ry}
          transform={`rotate(${p.angle + 90}, ${ex}, ${ey})`}
          fill={petalColor}
          stroke={petalColor}
          strokeWidth="0.6"
          opacity={p.opacity}
        />
      );
    });

  return (
    <svg
      viewBox="0 0 120 180"
      width={width}
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Peony flower illustration"
    >
      {/* Full round stem */}
      <path
        d="M60 98 C59 116 58 136 57 168"
        stroke={stemColor}
        strokeWidth="4.5"
        strokeLinecap="round"
        fill="none"
      />

      {/* Large left lobed leaf */}
      <path
        d="M59 122 C52 110 36 104 28 112 C24 122 32 136 48 136 C55 136 59 130 59 122 Z"
        fill={stemColor}
        opacity="0.82"
      />
      {/* Lobed indent left leaf */}
      <path
        d="M40 134 C34 124 30 116 28 112"
        stroke={stemColor}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M59 122 C50 114 36 106 28 112"
        stroke={stemColor}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />

      {/* Large right lobed leaf */}
      <path
        d="M58 144 C65 132 80 126 90 134 C94 144 86 158 70 158 C63 158 58 152 58 144 Z"
        fill={stemColor}
        opacity="0.82"
      />
      <path
        d="M78 156 C86 146 90 138 90 134"
        stroke={stemColor}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
        opacity="0.45"
      />
      <path
        d="M58 144 C65 134 80 128 90 134"
        stroke={stemColor}
        strokeWidth="0.8"
        fill="none"
        opacity="0.5"
      />

      {/* Outer ring petals */}
      {renderPetalRing(outerPetals, 'outer')}

      {/* Calyx / sepal hints */}
      {[0, 72, 144, 216, 288].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <path
            key={`sepal-${i}`}
            d={`M ${cx} ${cy + 5}
               C ${cx + 6 * Math.cos(rad)} ${cy + 6 * Math.sin(rad)}
                 ${cx + 14 * Math.cos(rad)} ${cy + 10 + 14 * Math.sin(rad)}
                 ${cx + 18 * Math.cos(rad)} ${cy + 14 + 18 * Math.sin(rad)}`}
            stroke={stemColor}
            strokeWidth="1.2"
            fill="none"
            opacity="0.3"
          />
        );
      })}

      {/* Middle ring petals */}
      {renderPetalRing(middlePetals, 'mid')}

      {/* Inner cluster petals */}
      {renderPetalRing(innerPetals, 'inner')}

      {/* Tiny center tufts */}
      {[0, 90, 180, 270].map((a, i) => {
        const rad = (a * Math.PI) / 180;
        return (
          <ellipse
            key={`tuft-${i}`}
            cx={cx + 3 * Math.cos(rad)}
            cy={cy + 3 * Math.sin(rad)}
            rx={3}
            ry={4.5}
            transform={`rotate(${a + 90}, ${cx + 3 * Math.cos(rad)}, ${cy + 3 * Math.sin(rad)})`}
            fill={petalColor}
            opacity="1"
          />
        );
      })}

      {/* Center accent */}
      <circle cx={cx} cy={cy} r={4} fill="#FDE68A" opacity="0.7" />
      <circle cx={cx} cy={cy} r={2} fill="#FCD34D" opacity="0.9" />
    </svg>
  );
};
