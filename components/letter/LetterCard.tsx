'use client';

import React from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { CardStylePicker } from './CardStylePicker';
import type { CardStyle } from '@/types';

const CARD_HEADINGS: Record<CardStyle, string> = {
  'for-you': 'For you',
  'just-because': 'Just because',
  'little-something': 'A little something',
  'wanted-you-to-know': 'I wanted you to know...',
  blank: '',
};

export const LetterCard: React.FC = () => {
  const { letter, setLetter } = useBouquetStore();
  const maxChars = 500;

  const currentHeading = CARD_HEADINGS[letter.cardStyle];

  return (
    <div className="max-w-xl mx-auto py-6 px-4">
      {/* Stationery Selector */}
      <div className="mb-4">
        <label className="block text-xs font-semibold uppercase tracking-wider text-text-muted mb-2 text-center">
          Choose Stationery Note Style
        </label>
        <CardStylePicker
          selected={letter.cardStyle}
          onSelect={(style) => setLetter({ cardStyle: style })}
        />
      </div>

      {/* Font Family Options */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-xs text-text-soft font-medium">Handwriting Style:</span>
        <button
          onClick={() => setLetter({ font: 'caveat' })}
          className={`px-3 py-1 rounded-full text-xs transition-colors ${
            letter.font === 'caveat'
              ? 'bg-blush text-text-dark font-semibold shadow-xs'
              : 'bg-cream-dark text-text-muted hover:text-text-dark'
          }`}
        >
          Casual Script
        </button>
        <button
          onClick={() => setLetter({ font: 'dancing-script' })}
          className={`px-3 py-1 rounded-full text-xs transition-colors ${
            letter.font === 'dancing-script'
              ? 'bg-blush text-text-dark font-semibold shadow-xs'
              : 'bg-cream-dark text-text-muted hover:text-text-dark'
          }`}
        >
          Gentle Cursive
        </button>
      </div>

      {/* The Stationery Paper */}
      <div className="relative bg-[#FFFDF9] rounded-3xl p-8 shadow-soft-lg border border-[#F0E6D8] min-h-[340px] flex flex-col justify-between">
        {/* Soft paper lines background */}
        <div className="space-y-4">
          {currentHeading && (
            <h3 className="text-2xl font-display text-text-dark opacity-90 border-b border-blush/30 pb-2 select-none">
              {currentHeading}
            </h3>
          )}

          <textarea
            value={letter.text}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setLetter({ text: e.target.value });
              }
            }}
            placeholder="Write something heartfelt, warm, or silly here..."
            rows={8}
            className={`w-full bg-transparent resize-none border-none outline-none text-text-dark placeholder-text-muted/60 text-xl leading-loose ${
              letter.font === 'dancing-script' ? 'font-serif italic' : 'font-handwriting'
            }`}
          />
        </div>

        {/* Footer info: character count & gentle hint */}
        <div className="pt-4 border-t border-[#F2E8DC] flex items-center justify-between text-xs text-text-muted select-none">
          <span className="italic">Every word adds fragrance to your gift.</span>
          <span>
            {letter.text.length} / {maxChars}
          </span>
        </div>
      </div>
    </div>
  );
};
