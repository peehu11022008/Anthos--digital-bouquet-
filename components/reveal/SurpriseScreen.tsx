'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { Gift, ArrowRight } from 'lucide-react';

interface SurpriseScreenProps {
  bouquetName?: string;
  senderName?: string;
  onOpen: () => void;
}

export const SurpriseScreen: React.FC<SurpriseScreenProps> = ({
  bouquetName,
  senderName,
  onOpen,
}) => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 select-none">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="max-w-md w-full bg-cream rounded-4xl p-8 shadow-soft-xl border border-blush/30"
      >
        {/* Soft Gift Icon in Circle */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-blush-light flex items-center justify-center border border-blush shadow-petal">
          <Gift size={32} className="text-blush-dark animate-pulse" />
        </div>

        <span className="text-xs uppercase tracking-widest text-text-muted font-semibold">
          A Peaceful Delivery
        </span>

        <h1 className="text-3xl font-display text-text-dark mt-2 mb-3">
          Someone left a little surprise for you
        </h1>

        {senderName && (
          <p className="text-sm text-text-soft font-medium mb-1">
            Sent with love from <span className="text-text-dark font-semibold">{senderName}</span>
          </p>
        )}

        {bouquetName && (
          <p className="text-xs text-text-muted italic mb-6">
            &ldquo;{bouquetName}&rdquo;
          </p>
        )}

        <Button
          onClick={onOpen}
          variant="primary"
          size="lg"
          className="w-full py-4 text-base"
          rightIcon={<ArrowRight size={18} />}
        >
          Open your bouquet
        </Button>
      </motion.div>
    </div>
  );
};
