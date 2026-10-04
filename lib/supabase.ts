import { createClient } from '@supabase/supabase-js';
import type { BouquetData } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

export const supabase =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ─── Save a bouquet for sharing ───────────────────────────────────────────────

export async function saveBouquet(data: BouquetData): Promise<string | null> {
  if (!supabase) {
    console.warn('Supabase not configured. Sharing is unavailable.');
    return null;
  }

  const { data: result, error } = await supabase
    .from('bouquets')
    .insert([
      {
        id: data.id,
        name: data.name,
        flowers: data.flowers,
        accessories: data.accessories,
        scene_key: data.sceneKey,
        time_of_day: data.timeOfDay,
        mood: data.mood,
        letter: data.letter,
        why_message: data.whyMessage,
        bouquet_name: data.bouquetName,
        time_spent_ms: data.timeSpentMs,
        sender_name: data.senderName,
        recipient_name: data.recipientName,
        created_at: data.createdAt,
      },
    ])
    .select('id')
    .single();

  if (error) {
    console.error('Failed to save bouquet:', error.message);
    return null;
  }

  return result?.id ?? null;
}

// ─── Retrieve a shared bouquet ────────────────────────────────────────────────

export async function getBouquet(id: string): Promise<BouquetData | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('bouquets')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    name: data.name ?? '',
    flowers: data.flowers ?? [],
    accessories: data.accessories ?? [],
    sceneKey: data.scene_key ?? 'little-garden',
    timeOfDay: data.time_of_day ?? 'afternoon',
    mood: data.mood ?? null,
    letter: data.letter ?? { text: '', cardStyle: 'blank', font: 'caveat' },
    whyMessage: data.why_message ?? '',
    bouquetName: data.bouquet_name ?? '',
    timeSpentMs: data.time_spent_ms ?? 0,
    senderName: data.sender_name ?? '',
    recipientName: data.recipient_name ?? '',
    createdAt: data.created_at ?? new Date().toISOString(),
  } satisfies BouquetData;
}
