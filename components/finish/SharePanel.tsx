'use client';

import React, { useState } from 'react';
import { useBouquetStore } from '@/store/bouquetStore';
import { Button } from '@/components/ui/Button';
import { saveBouquet } from '@/lib/supabase';
import { saveBouquetToArchive, saveFlowerToGarden, incrementStat } from '@/lib/storage';
import { generateId, copyToClipboard } from '@/lib/utils';
import { Share2, Copy, Check, ExternalLink, Flower2, Heart } from 'lucide-react';
import type { BouquetData, GardenFlower } from '@/types';
import Link from 'next/link';

interface SharePanelProps {
  onSavedToGarden: () => void;
}

export const SharePanel: React.FC<SharePanelProps> = ({ onSavedToGarden }) => {
  const {
    flowers,
    accessories,
    sceneKey,
    timeOfDay,
    mood,
    letter,
    whyMessage,
    bouquetName,
    getTimeSpentMs,
  } = useBouquetStore();

  const [senderName, setSenderName] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [shareUrl, setShareUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleCreateShareLink = async () => {
    setIsGenerating(true);

    const bouquetId = generateId();
    const finalBouquet: BouquetData = {
      id: bouquetId,
      name: bouquetName.trim() || 'A Gentle Bouquet',
      flowers,
      accessories,
      sceneKey,
      timeOfDay,
      mood,
      letter,
      whyMessage,
      bouquetName: bouquetName.trim() || 'A Gentle Bouquet',
      timeSpentMs: getTimeSpentMs(),
      senderName: senderName.trim(),
      recipientName: recipientName.trim(),
      createdAt: new Date().toISOString(),
    };

    // 1. Always save to local archive & garden
    saveBouquetToArchive(finalBouquet);
    incrementStat('bouquetsCreated');
    incrementStat('giftsSent');

    if (flowers.length > 0) {
      // Plant the first flower in the user's personal garden
      const leadFlower = flowers[0];
      const gardenFlower: GardenFlower = {
        id: generateId(),
        flowerKey: leadFlower.flowerKey,
        petalColor: leadFlower.petalColor,
        stemColor: leadFlower.stemColor,
        bouquetId: finalBouquet.id,
        bouquetName: finalBouquet.bouquetName,
        plantedAt: new Date().toISOString(),
        x: 15 + Math.random() * 70,
        y: 20 + Math.random() * 60,
      };
      saveFlowerToGarden(gardenFlower);
      incrementStat('flowersPlanted');
    }

    setIsSaved(true);
    onSavedToGarden();

    // 2. Try saving to Supabase for online sharing
    try {
      await saveBouquet(finalBouquet);
    } catch (err) {
      console.warn('Online sync optional, saved locally:', err);
    }

    // 3. Set shareable link
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    setShareUrl(`${origin}/bouquet/${bouquetId}`);
    setIsGenerating(false);
  };

  const handleCopy = async () => {
    if (!shareUrl) return;
    const success = await copyToClipboard(shareUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="space-y-5 text-left">
      {/* Sender & Recipient Names */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-semibold text-text-soft mb-1">
            From (Your Name)
          </label>
          <input
            type="text"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            placeholder="Someone who cares"
            className="w-full text-xs text-text-dark bg-cream-dark/80 rounded-2xl px-4 py-2.5 border border-blush/30 focus:outline-none focus:ring-1 focus:ring-blush"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-text-soft mb-1">
            To (Recipient Name)
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            placeholder="A special person"
            className="w-full text-xs text-text-dark bg-cream-dark/80 rounded-2xl px-4 py-2.5 border border-blush/30 focus:outline-none focus:ring-1 focus:ring-blush"
          />
        </div>
      </div>

      {/* Generate / Share Button */}
      {!shareUrl ? (
        <Button
          onClick={handleCreateShareLink}
          isLoading={isGenerating}
          variant="primary"
          size="lg"
          className="w-full"
          leftIcon={<Share2 size={18} />}
        >
          Generate Gift Link & Plant Flower
        </Button>
      ) : (
        <div className="space-y-3 p-4 bg-cream rounded-3xl border border-blush/40 shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-text-dark">
              Your Gift Link is Ready
            </span>
            <span className="text-[11px] font-medium text-sage-dark bg-sage-light px-2.5 py-0.5 rounded-full">
              Planted in Garden
            </span>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="text"
              readOnly
              value={shareUrl}
              className="flex-1 text-xs text-text-soft bg-cream-dark px-3 py-2 rounded-xl border border-blush/20 truncate"
            />
            <Button
              onClick={handleCopy}
              variant={copied ? 'secondary' : 'primary'}
              size="sm"
              leftIcon={copied ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
            >
              {copied ? 'Copied' : 'Copy'}
            </Button>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-blush/20 text-xs">
            <Link
              href={shareUrl}
              target="_blank"
              className="inline-flex items-center gap-1 text-text-soft hover:text-text-dark font-medium underline"
            >
              <span>Preview Recipient Experience</span>
              <ExternalLink size={13} />
            </Link>

            <Link
              href="/garden"
              className="inline-flex items-center gap-1 text-blush-dark hover:text-text-dark font-semibold"
            >
              <span>Visit Garden</span>
              <Flower2 size={13} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
