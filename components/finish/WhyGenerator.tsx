'use client';

import React, { useState, useEffect } from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { composeWhyMessage } from '@/lib/why';
import { FLOWER_REGISTRY } from '@/lib/flowers';
import { Sparkles, Edit3 } from 'lucide-react';

export const WhyGenerator: React.FC = () => {
  const { flowers, whyMessage, setWhyMessage } = useBouquetStore();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Generate initial why message if none exists
    if (!whyMessage && flowers.length > 0) {
      const generated = composeWhyMessage({
        flowers,
        flowerRegistry: FLOWER_REGISTRY,
      });
      setWhyMessage(generated);
    }
  }, [flowers, whyMessage, setWhyMessage]);

  if (flowers.length === 0) return null;

  return (
    <div className="bg-cream-dark/60 border border-blush/30 rounded-3xl p-5 text-left">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-blush-dark" />
          <h4 className="text-sm font-semibold text-text-dark font-sans">
            Why These Flowers?
          </h4>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-text-soft hover:text-text-dark flex items-center gap-1 transition-colors"
        >
          <Edit3 size={13} />
          <span>{isEditing ? 'Done' : 'Edit Interpretation'}</span>
        </button>
      </div>

      {isEditing ? (
        <textarea
          value={whyMessage}
          onChange={(e) => setWhyMessage(e.target.value)}
          rows={3}
          className="w-full text-xs text-text-dark bg-cream rounded-2xl p-3 border border-blush/30 focus:outline-none focus:ring-1 focus:ring-blush"
        />
      ) : (
        <p className="text-xs text-text-soft leading-relaxed italic">
          &ldquo;{whyMessage || 'A heartfelt arrangement crafted with care.'}&rdquo;
        </p>
      )}
    </div>
  );
};
