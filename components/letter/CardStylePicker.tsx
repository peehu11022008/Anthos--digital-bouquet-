'use client';

import React from 'react';
import type { CardStyle } from '@/types';

interface CardStylePickerProps {
  selected: CardStyle;
  onSelect: (style: CardStyle) => void;
}

const STYLES: Array<{ key: CardStyle; title: string; colorClass: string }> = [
  { key: 'for-you', title: 'For you', colorClass: 'bg-blush-light border-blush' },
  { key: 'just-because', title: 'Just because', colorClass: 'bg-butter-light border-butter-dark' },
  { key: 'little-something', title: 'A little something', colorClass: 'bg-lavender-light border-lavender' },
  { key: 'wanted-you-to-know', title: 'I wanted you to know...', colorClass: 'bg-sage-light border-sage-dark' },
  { key: 'blank', title: 'Simple Blank', colorClass: 'bg-cream border-blush/30' },
];

export const CardStylePicker: React.FC<CardStylePickerProps> = ({
  selected,
  onSelect,
}) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
      {STYLES.map((st) => (
        <button
          key={st.key}
          onClick={() => onSelect(st.key)}
          className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap border transition-all duration-200 ${
            st.colorClass
          } ${
            selected === st.key
              ? 'ring-2 ring-text-dark scale-102 shadow-soft'
              : 'opacity-70 hover:opacity-100'
          }`}
        >
          {st.title}
        </button>
      ))}
    </div>
  );
};
