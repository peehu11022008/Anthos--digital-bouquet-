import { NextResponse } from 'next/server';
import { saveBouquet } from '@/lib/supabase';
import type { BouquetData } from '@/types';

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as BouquetData;

    if (!data || !data.id) {
      return NextResponse.json(
        { error: 'Invalid bouquet data. An id is required.' },
        { status: 400 }
      );
    }

    const savedId = await saveBouquet(data);

    return NextResponse.json({
      success: true,
      id: savedId || data.id,
    });
  } catch (error) {
    console.error('API Error saving bouquet:', error);
    return NextResponse.json(
      { error: 'Failed to process bouquet saving.' },
      { status: 500 }
    );
  }
}
