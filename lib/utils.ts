import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ─── Tailwind class merging ───────────────────────────────────────────────────

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── UUID generation ──────────────────────────────────────────────────────────

export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  // Fallback for environments without crypto.randomUUID
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}

// ─── Time formatting ──────────────────────────────────────────────────────────

export function formatTimeSpent(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  if (minutes === 0) {
    return seconds <= 30 ? 'a few moments' : `${seconds} seconds`;
  }
  if (minutes === 1) {
    return '1 minute';
  }
  return `${minutes} minutes`;
}

export function formatTimeMessage(ms: number): string {
  const time = formatTimeSpent(ms);
  if (time === 'a few moments') {
    return 'Made with care and a few quiet moments.';
  }
  return `Made with ${time} of love.`;
}

// ─── Date formatting ──────────────────────────────────────────────────────────

export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ─── SVG to data URL ──────────────────────────────────────────────────────────

export function svgToDataUrl(svgString: string): string {
  const encoded = encodeURIComponent(svgString);
  return `data:image/svg+xml;charset=utf-8,${encoded}`;
}

// ─── Canvas helpers ───────────────────────────────────────────────────────────

export function randomOffset(range = 30): number {
  return (Math.random() - 0.5) * range * 2;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

// ─── Share URL ────────────────────────────────────────────────────────────────

export function getBouquetShareUrl(id: string): string {
  if (typeof window === 'undefined') return `/bouquet/${id}`;
  return `${window.location.origin}/bouquet/${id}`;
}

// ─── Copy to clipboard ────────────────────────────────────────────────────────

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}
