import { NextResponse } from 'next/server';
import { getBouquet } from '@/lib/supabase';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(_request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;

    if (!id) {
      return NextResponse.json(
        { error: 'Bouquet id is required' },
        { status: 400 }
      );
    }

    const bouquet = await getBouquet(id);

    if (!bouquet) {
      return NextResponse.json(
        { error: 'Bouquet not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, bouquet });
  } catch (error) {
    console.error('API Error retrieving bouquet:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve bouquet.' },
      { status: 500 }
    );
  }
}
