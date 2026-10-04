import type { WhyComposer, WhyComposerInput } from '@/types';
import { FLOWER_REGISTRY } from './flowers';

// ─── AI-swappable interface ───────────────────────────────────────────────────
// To integrate Gemini in Phase 2, implement this interface and swap it in
// at the call sites. Zero other code changes needed.

function deduplicateFlowers(flowers: WhyComposerInput['flowers']): string[] {
  const seen = new Set<string>();
  return flowers.filter((f) => {
    if (seen.has(f.flowerKey)) return false;
    seen.add(f.flowerKey);
    return true;
  }).map((f) => f.flowerKey);
}

function joinNatural(items: string[]): string {
  if (items.length === 0) return '';
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`;
}

// ─── Phase 1: Template-based composer ────────────────────────────────────────

export const templateComposer: WhyComposer = {
  compose({ flowers, flowerRegistry }) {
    const uniqueKeys = deduplicateFlowers(flowers);

    if (uniqueKeys.length === 0) {
      return '';
    }

    const registry = { ...FLOWER_REGISTRY, ...flowerRegistry };

    if (uniqueKeys.length === 1) {
      const flower = registry[uniqueKeys[0]];
      if (!flower) return '';
      const shortMeaning = flower.meaning.split(',')[0].toLowerCase();
      return `You chose ${flower.name} — a flower that speaks of ${shortMeaning}. A simple, sincere choice.`;
    }

    const parts = uniqueKeys
      .slice(0, 3)
      .map((key) => {
        const flower = registry[key];
        if (!flower) return null;
        const shortMeaning = flower.meaning.split(',')[0].toLowerCase();
        return `${flower.name} for ${shortMeaning}`;
      })
      .filter(Boolean) as string[];

    if (parts.length === 0) return '';

    return `You chose ${joinNatural(parts)}. Together, they make a little reminder that you care.`;
  },
};

// ─── Active composer ──────────────────────────────────────────────────────────
// Swap this in Phase 2 to use the Gemini composer

export const activeComposer: WhyComposer = templateComposer;

export function composeWhyMessage(input: WhyComposerInput): string {
  return activeComposer.compose(input);
}
