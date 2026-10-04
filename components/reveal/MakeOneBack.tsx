'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Flower2 } from 'lucide-react';

export const MakeOneBack: React.FC = () => {
  return (
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1.1 }}
      className="max-w-md mx-auto my-12 text-center p-8 bg-cream rounded-4xl border border-blush/40 shadow-soft-lg select-none"
    >
      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-blush-light flex items-center justify-center text-blush-dark">
        <Flower2 size={24} />
      </div>

      <h3 className="text-xl font-bold text-text-dark font-sans">
        They made this for you
      </h3>
      <p className="text-xs text-text-soft mt-1 mb-6">
        Want to return the kindness and make a bouquet back for them?
      </p>

      <Link href="/create">
        <Button
          variant="primary"
          size="lg"
          className="w-full"
          rightIcon={<ArrowRight size={16} />}
        >
          Create a Bouquet in Return
        </Button>
      </Link>
    </motion.div>
  );
};
