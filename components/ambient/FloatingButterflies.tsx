'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const FloatingButterflies: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Butterfly 1 (Blush pink/lavender) */}
      <motion.div
        className="absolute w-8 h-8"
        initial={{ x: '-5vw', y: '35vh' }}
        animate={{
          x: ['-5vw', '30vw', '65vw', '105vw'],
          y: ['35vh', '25vh', '40vh', '30vh'],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.svg
          viewBox="0 0 40 40"
          width="28"
          height="28"
          animate={{ scaleX: [1, 0.5, 1], rotate: [5, -5, 5] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
        >
          {/* Upper Wings */}
          <path d="M 20 20 C 12 8, 4 14, 8 24 Z" fill="#DDD6FE" opacity="0.8" />
          <path d="M 20 20 C 28 8, 36 14, 32 24 Z" fill="#DDD6FE" opacity="0.8" />
          {/* Lower Wings */}
          <path d="M 20 20 C 14 26, 8 28, 12 34 Z" fill="#FBCFE8" opacity="0.85" />
          <path d="M 20 20 C 26 26, 32 28, 28 34 Z" fill="#FBCFE8" opacity="0.85" />
          {/* Body */}
          <ellipse cx="20" cy="22" rx="1.5" ry="7" fill="#7A6060" opacity="0.6" />
        </motion.svg>
      </motion.div>

      {/* Butterfly 2 (Butter yellow) */}
      <motion.div
        className="absolute w-8 h-8"
        initial={{ x: '105vw', y: '60vh' }}
        animate={{
          x: ['105vw', '70vw', '35vw', '-5vw'],
          y: ['60vh', '50vh', '65vh', '55vh'],
        }}
        transition={{
          duration: 38,
          delay: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      >
        <motion.svg
          viewBox="0 0 40 40"
          width="24"
          height="24"
          animate={{ scaleX: [1, 0.4, 1], rotate: [-8, 8, -8] }}
          transition={{ duration: 0.55, repeat: Infinity, ease: 'easeInOut' }}
        >
          <path d="M 20 20 C 12 8, 4 14, 8 24 Z" fill="#FDE68A" opacity="0.85" />
          <path d="M 20 20 C 28 8, 36 14, 32 24 Z" fill="#FDE68A" opacity="0.85" />
          <path d="M 20 20 C 14 26, 8 28, 12 34 Z" fill="#FED7AA" opacity="0.85" />
          <path d="M 20 20 C 26 26, 32 28, 28 34 Z" fill="#FED7AA" opacity="0.85" />
          <ellipse cx="20" cy="22" rx="1.5" ry="6" fill="#7A6060" opacity="0.6" />
        </motion.svg>
      </motion.div>
    </div>
  );
};
