import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { fetchAirQuality } from '@/lib/airnow';
import { isAlertLevel } from '@/lib/aqi-utils';
import twilio from 'twilio';

const ALERT_COOLDOWN_HOURS = 4;
const SMS_CONCURRENCY = 10;   // parallel Twilio calls per batch
const ZIP_CONCURRENCY = 20;   // parallel AirNow calls per batch
const PAGE_SIZE = 1000;       // rows per Supabase page

async function batchedPromiseAll<T>(
  items: T[],
  concurrency: number,
  fn: (item: T) => Promise<void>
): Promise<void> {
  for (let i = 0; i < items.length; i += concurrency) {
    await Promise.all(items.slice(i, i + concurrency).map(fn));
  }
}

export async function GET(request: NextRequest) {
  // Guard: require CRON_SECRET to be explicitly set — undefined produces "Bearer undefined"
  const secret = process.env.CRON_SECRET;
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServer();

  // Paginate to avoid loading 175k rows into memory at once
  const allSubs: { id: string; phone_e164: string; zip_code: string; language: string; last_alerted_at: string | null }[] = [];
  let from = 0;
  while (true) {
    const { data, error } = await supabase
      .from('sms_subscriptions')
      .select('id, phone_e164, zip_code, language, last_alerted_at')
      .eq('is_active', true)
      .range(from, from + PAGE_SIZE - 1);

    if (error) {
      return NextResponse.json({ error: 'Failed to load subscriptions' }, { status: 500 });
    }
    if (!data || data.length === 0) break;
    allSubs.push(...data);
    if (data.length < PAGE_SIZE) break;
    from += PAGE_SIZE;
  }

  const zips = [...new Set(allSubs.map((s) => s.zip_code))];
  const aqiByZip: Record<string, string> = {};

  // Fetch AQI in batches — avoid bursting AirNow rate limit
  await batchedPromiseAll(zips, ZIP_CONCURRENCY, async (zip) => {
    try {
      const result = await fetchAirQuality(zip);
      aqiByZip[zip] = result.overallCategory;
    } catch {
      aqiByZip[zip] = 'unknown';
    }
  });

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const fromNumber = process.env.TWILIO_PHONE_NUMBER!;
  const now = new Date();
  const cutoff = new Date(now.getTime() - ALERT_COOLDOWN_HOURS * 60 * 60 * 1000);

  const qualifying = allSubs.filter((sub) => {
    const category = aqiByZip[sub.zip_code];
    if (!isAlertLevel(category as Parameters<typeof isAlertLevel>[0])) return false;
    const lastAlert = sub.last_alerted_at ? new Date(sub.last_alerted_at) : null;
    return !lastAlert || lastAlert <= cutoff;
  });

  let sent = 0;

  // Send SMS in parallel batches — avoid sequential serialization
  await batchedPromiseAll(qualifying, SMS_CONCURRENCY, async (sub) => {
    const isEs = sub.language === 'es';
    const body = isEs
      ? `⚠️ Alerta Windy & Clear: La calidad del aire en el código postal ${sub.zip_code} no es saludable ahora. Limita el tiempo al aire libre. Responde STOP para cancelar.`
      : `⚠️ Windy & Clear Alert: Air quality in ZIP ${sub.zip_code} is unhealthy right now. Limit time outdoors. Reply STOP to unsubscribe.`;

    try {
      await client.messages.create({ body, from: fromNumber, to: sub.phone_e164 });
      await supabase
        .from('sms_subscriptions')
        .update({ last_alerted_at: now.toISOString() })
        .eq('id', sub.id);
      sent++;
    } catch (err) {
      console.error(`SMS failed for ${sub.id}:`, err);
    }
  });

  return NextResponse.json({ processed: allSubs.length, qualifying: qualifying.length, sent });
}
