import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchAirQuality } from '@/lib/airnow';

const QuerySchema = z.object({
  zip: z.string().regex(/^\d{5}$/, 'ZIP must be 5 digits'),
});

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parse = QuerySchema.safeParse({ zip: searchParams.get('zip') });

  if (!parse.success) {
    return NextResponse.json(
      { error: 'Invalid ZIP code', details: parse.error.flatten() },
      { status: 400 }
    );
  }

  try {
    const result = await fetchAirQuality(parse.data.zip);
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=3300, stale-while-revalidate=300',
      },
    });
  } catch (err) {
    console.error('AirQuality fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch air quality data' }, { status: 500 });
  }
}
