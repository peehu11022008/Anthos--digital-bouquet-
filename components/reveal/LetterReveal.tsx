'use client';

import React from 'react';
import { motion } from 'framer-motion';
import type { LetterData } from '@/types';

interface LetterRevealProps {
  letter?: LetterData;
  senderName?: string;
}

export const LetterReveal: React.FC<LetterRevealProps> = ({ letter, senderName }) => {
  if (!letter || !letter.text) return null;

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="max-w-xl mx-auto my-8 select-none"
    >
      <div className="bg-[#FFFDF9] rounded-3xl p-8 shadow-soft-lg border border-[#F0E6D8] text-left">
        {letter.cardStyle && letter.cardStyle !== 'blank' && (
          <h4 className="text-xl font-display text-text-dark border-b border-blush/30 pb-2 mb-4">
            {letter.cardStyle === 'for-you' && 'For you'}
            {letter.cardStyle === 'just-because' && 'Just because'}
            {letter.cardStyle === 'little-something' && 'A little something'}
            {letter.cardStyle === 'wanted-you-to-know' && 'I wanted you to know...'}
          </h4>
        )}

        <p
          className={`text-text-dark text-xl leading-relaxed whitespace-pre-wrap ${
            letter.font === 'dancing-script' ? 'font-serif italic' : 'font-handwriting'
          }`}
        >
          {letter.text}
        </p>

        {senderName && (
          <div className="mt-6 pt-4 border-t border-[#F2E8DC] text-right">
            <span className="text-sm font-handwriting text-2xl text-text-soft">
              — {senderName}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
};
