'use client';

import React from 'react';
import type { BouquetData } from '@/types';
import { formatDate, formatTimeSpent } from '@/lib/utils';
import { FLOWER_REGISTRY } from '@/lib/flowers';
import Link from 'next/link';
import { Calendar, Clock, User, ExternalLink } from 'lucide-react';

interface BouquetArchiveProps {
  bouquets: BouquetData[];
}

export const BouquetArchive: React.FC<BouquetArchiveProps> = ({ bouquets }) => {
  if (bouquets.length === 0) return null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 select-none">
      <div className="text-left mb-6">
        <h3 className="text-2xl font-bold text-text-dark font-sans">
          Bouquet Memories
        </h3>
        <p className="text-xs text-text-muted mt-1">
          A keepsake of every arrangement and letter you have sent.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {bouquets.map((b) => {
          return (
            <div
              key={b.id}
              className="bg-cream rounded-3xl p-5 border border-blush/30 shadow-soft flex flex-col justify-between hover:shadow-soft-lg transition-all"
            >
              <div>
                {/* Header: Title and link */}
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-bold text-base text-text-dark font-sans line-clamp-1">
                    {b.bouquetName || b.name || 'Gentle Bouquet'}
                  </h4>
                  <Link
                    href={`/bouquet/${b.id}`}
                    className="p-1 rounded-full text-text-muted hover:text-text-dark hover:bg-blush-light transition-colors"
                    title="View Bouquet"
                  >
                    <ExternalLink size={14} />
                  </Link>
                </div>

                {/* Metadata */}
                <div className="space-y-1 text-xs text-text-muted mb-4">
                  <div className="flex items-center gap-1.5">
                    <Calendar size={13} className="text-blush-dark" />
                    <span>{formatDate(b.createdAt)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock size={13} className="text-blush-dark" />
                    <span>Crafted with {formatTimeSpent(b.timeSpentMs)}</span>
                  </div>
                  {b.recipientName && (
                    <div className="flex items-center gap-1.5">
                      <User size={13} className="text-blush-dark" />
                      <span>For {b.recipientName}</span>
                    </div>
                  )}
                </div>

                {/* Letter Snippet */}
                {b.letter?.text && (
                  <div className="bg-cream-dark/60 rounded-2xl p-3 mb-4 border border-blush/20">
                    <p className="text-xs font-handwriting text-base text-text-soft line-clamp-2 italic">
                      &ldquo;{b.letter.text}&rdquo;
                    </p>
                  </div>
                )}
              </div>

              {/* Flowers summary chips */}
              <div className="flex flex-wrap gap-1 pt-3 border-t border-blush/20">
                {b.flowers.slice(0, 3).map((f) => {
                  const data = FLOWER_REGISTRY[f.flowerKey];
                  return (
                    <span
                      key={f.id}
                      className="text-[10px] bg-cream-dark px-2 py-0.5 rounded-full text-text-soft"
                    >
                      {data?.name || f.flowerKey}
                    </span>
                  );
                })}
                {b.flowers.length > 3 && (
                  <span className="text-[10px] bg-cream-dark px-2 py-0.5 rounded-full text-text-muted">
                    +{b.flowers.length - 3} more
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
