'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ColorSwatchProps {
  color: string;
  isSelected?: boolean;
  onClick?: (color: string) => void;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-10 h-10',
};

export const ColorSwatch: React.FC<ColorSwatchProps> = ({
  color,
  isSelected = false,
  onClick,
  size = 'md',
  label,
}) => {
  return (
    <button
      onClick={() => onClick?.(color)}
      title={label ?? color}
      aria-label={label ?? `Select color ${color}`}
      aria-pressed={isSelected}
      className={cn(
        'rounded-full border-2 transition-all duration-150 flex-shrink-0',
        'hover:scale-110 active:scale-95',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lavender focus-visible:ring-offset-2',
        sizeMap[size],
        isSelected
          ? 'border-text-dark scale-110 shadow-soft'
          : 'border-white/60 hover:border-text-muted/40'
      )}
      style={{ backgroundColor: color }}
    />
  );
};

// ─── Color picker grid ────────────────────────────────────────────────────────

interface ColorGridProps {
  colors: string[];
  selected?: string;
  onSelect: (color: string) => void;
  showCustom?: boolean;
  onCustom?: (color: string) => void;
  label?: string;
}

export const PASTEL_PALETTE = [
  '#FFFFFF', '#FEF3C7', '#FDE68A', '#FCD34D',
  '#FED7AA', '#FDBA74', '#FFCBA4', '#FCA5A5',
  '#FBCFE8', '#F9A8D4', '#F4A7B9', '#FDA4AF',
  '#DDD6FE', '#C4B5FD', '#A78BFA', '#93C5FD',
  '#BAE6FD', '#7DD3FC', '#6EE7B7', '#86EFAC',
  '#BBF7D0', '#D9F99D', '#BEF264', '#FECDD3',
];

export const ColorGrid: React.FC<ColorGridProps> = ({
  colors,
  selected,
  onSelect,
  showCustom = true,
  onCustom,
  label,
}) => {
  const customInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div>
      {label && (
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-2">{label}</p>
      )}
      <div className="flex flex-wrap gap-1.5">
        {colors.map((color) => (
          <ColorSwatch
            key={color}
            color={color}
            isSelected={selected === color}
            onClick={onSelect}
            size="md"
          />
        ))}
        {showCustom && (
          <>
            <button
              onClick={() => customInputRef.current?.click()}
              className="w-8 h-8 rounded-full border-2 border-dashed border-text-muted/40 hover:border-text-soft transition-colors flex items-center justify-center text-text-muted hover:text-text-soft text-xs font-bold"
              title="Custom color"
              aria-label="Choose custom color"
            >
              +
            </button>
            <input
              ref={customInputRef}
              type="color"
              className="sr-only"
              value={selected ?? '#FFFFFF'}
              onChange={(e) => onCustom?.(e.target.value)}
              aria-label="Custom color picker"
            />
          </>
        )}
      </div>
    </div>
  );
};
