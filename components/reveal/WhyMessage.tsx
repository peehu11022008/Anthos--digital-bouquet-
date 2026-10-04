'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface WhyMessageProps {
  whyMessage?: string;
}

export const WhyMessage: React.FC<WhyMessageProps> = ({ whyMessage }) => {
  if (!whyMessage) return null;

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.9 }}
      className="max-w-xl mx-auto my-6 select-none"
    >
      <div className="bg-cream-dark/60 rounded-3xl p-6 border border-blush/30 text-center">
        <div className="inline-flex items-center gap-1.5 text-blush-dark mb-2">
          <Sparkles size={16} />
          <span className="text-xs uppercase tracking-widest font-semibold">
            The Meaning of These Flowers
          </span>
        </div>
        <p className="text-sm text-text-soft leading-relaxed italic">
          &ldquo;{whyMessage}&rdquo;
        </p>
      </div>
    </motion.div>
  );
};
