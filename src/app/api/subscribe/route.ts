import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { parsePhoneNumber, isValidPhoneNumber } from 'libphonenumber-js';
import { getSupabaseServer } from '@/lib/supabase-server';
import { getSubscribeRatelimit } from '@/lib/ratelimit';
import { getNeighborhoodByZip } from '@/data/neighborhoods';

const CONSENT_TEXT =
  'By subscribing, you agree to receive air quality alerts for your ZIP code. Msg & data rates may apply. Reply STOP to cancel.';

const BodySchema = z.object({
  phone: z.string().min(10).max(20),
  zip: z.string().regex(/^\d{5}$/, 'Must be a 5-digit ZIP'),
  language: z.enum(['en', 'es']).default('en'),
});

export async function POST(request: NextRequest) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown';

  if (process.env.UPSTASH_REDIS_REST_URL) {
    const limiter = getSubscribeRatelimit();
    const { success } = await limiter.limit(ip);
    if (!success) {
      return NextResponse.json({ error: 'Too many requests. Try again later.' }, { status: 429 });
    }
  } else {
    console.warn('UPSTASH_REDIS_REST_URL not set — rate limiting is disabled for /api/subscribe');
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

  const { phone, zip, language } = parse.data;

  if (!isValidPhoneNumber(phone, 'US')) {
    return NextResponse.json({ error: 'Invalid US phone number' }, { status: 400 });
  }

  const phoneE164 = parsePhoneNumber(phone, 'US').format('E.164');
  const neighborhood = getNeighborhoodByZip(zip);

  try {
    const supabase = getSupabaseServer();
    const { error } = await supabase.from('sms_subscriptions').upsert(
      {
        phone_e164: phoneE164,
        zip_code: zip,
        neighborhood: neighborhood?.slug ?? null,
        language,
        is_active: true,
        consent_text: CONSENT_TEXT,
        consented_at: new Date().toISOString(),
      },
      { onConflict: 'phone_e164,zip_code' }
    );

    if (error) throw error;

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Subscribe error:', err);
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 });
  }
}
