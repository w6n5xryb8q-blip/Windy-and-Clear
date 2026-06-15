import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getReportsRatelimit } from '@/lib/ratelimit';
import { neighborhoods } from '@/data/neighborhoods';
import crypto from 'crypto';

const validSlugs = neighborhoods.map((n) => n.slug);

const BodySchema = z.object({
  neighborhood: z.string().refine((s) => validSlugs.includes(s), 'Unknown neighborhood'),
  reportText: z.string().min(10).max(1000),
  language: z.enum(['en', 'es']).default('en'),
  zipCode: z.string().regex(/^\d{5}$/).optional(),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (process.env.UPSTASH_REDIS_REST_URL) {
    const limiter = getReportsRatelimit();
    const { success } = await limiter.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many reports. Try again later.' }, { status: 429 });
    }
  } else {
    console.warn('UPSTASH_REDIS_REST_URL not set — rate limiting is disabled for /api/reports');
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parse = BodySchema.safeParse(body);
  if (!parse.success) {
    return NextResponse.json({ error: 'Validation failed', details: parse.error.flatten() }, { status: 400 });
  }

  const { neighborhood, reportText, language, zipCode } = parse.data;
  const ipHash = crypto.createHash('sha256').update(ip).digest('hex').slice(0, 16);

  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from('community_reports')
      .insert({
        neighborhood,
        report_text: reportText,
        language,
        zip_code: zipCode ?? null,
        ip_hash: ipHash,
        is_moderated: false,   // pending review
        is_visible: false,     // hidden until moderated
      })
      .select('id, created_at')
      .single();

    if (error) throw error;

    return NextResponse.json({ success: true, id: data.id, createdAt: data.created_at });
  } catch (err) {
    console.error('Report insert error:', err);
    return NextResponse.json({ error: 'Failed to save report' }, { status: 500 });
  }
}
