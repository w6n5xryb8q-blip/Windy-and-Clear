import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { fetchPermits } from '@/lib/permits';

const QuerySchema = z.object({
  area: z.coerce.number().int().min(1).max(77),
});

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const parse = QuerySchema.safeParse({ area: searchParams.get('area') });

  if (!parse.success) {
    return NextResponse.json({ error: 'Invalid area number' }, { status: 400 });
  }

  try {
    const result = await fetchPermits(parse.data.area);
    return NextResponse.json(result, {
      headers: {
        'Cache-Control': 's-maxage=86400, stale-while-revalidate=3600',
      },
    });
  } catch (err) {
    console.error('Permits fetch error:', err);
    return NextResponse.json({ error: 'Failed to fetch permit data' }, { status: 500 });
  }
}
