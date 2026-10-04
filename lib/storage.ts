import type { BouquetData, GardenFlower, GardenStats } from '@/types';

const GARDEN_KEY = 'anthos_garden';
const ARCHIVE_KEY = 'anthos_archive';
const IN_PROGRESS_KEY = 'anthos_in_progress';
const STATS_KEY = 'anthos_stats';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function safeRead<T>(key: string, fallback: T): T {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function safeWrite(key: string, value: unknown): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage quota exceeded or SSR — silently ignore
  }
}

// ─── Garden ───────────────────────────────────────────────────────────────────

export function loadGarden(): GardenFlower[] {
  return safeRead<GardenFlower[]>(GARDEN_KEY, []);
}

export function saveFlowerToGarden(flower: GardenFlower): void {
  const garden = loadGarden();
  garden.push(flower);
  safeWrite(GARDEN_KEY, garden);
}

// ─── Bouquet Archive ─────────────────────────────────────────────────────────

export function loadBouquetArchive(): BouquetData[] {
  return safeRead<BouquetData[]>(ARCHIVE_KEY, []);
}

export function saveBouquetToArchive(bouquet: BouquetData): void {
  const archive = loadBouquetArchive();
  // Avoid duplicates by id
  const filtered = archive.filter((b) => b.id !== bouquet.id);
  safeWrite(ARCHIVE_KEY, [bouquet, ...filtered]);
}

export function getBouquetFromArchive(id: string): BouquetData | null {
  const archive = loadBouquetArchive();
  return archive.find((b) => b.id === id) ?? null;
}

// ─── In-progress (auto-save) ─────────────────────────────────────────────────

export function saveInProgress(partial: Partial<BouquetData>): void {
  safeWrite(IN_PROGRESS_KEY, partial);
}

export function loadInProgress(): Partial<BouquetData> | null {
  return safeRead<Partial<BouquetData> | null>(IN_PROGRESS_KEY, null);
}

export function clearInProgress(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(IN_PROGRESS_KEY);
  }
}

// ─── Stats ────────────────────────────────────────────────────────────────────

export function loadStats(): GardenStats {
  return safeRead<GardenStats>(STATS_KEY, {
    flowersPlanted: 0,
    bouquetsCreated: 0,
    giftsSent: 0,
  });
}

export function incrementStat(key: keyof GardenStats, by = 1): void {
  const stats = loadStats();
  stats[key] += by;
  safeWrite(STATS_KEY, stats);
}
