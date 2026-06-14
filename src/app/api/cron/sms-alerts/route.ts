import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import { fetchAirQuality } from '@/lib/airnow';
import { isAlertLevel } from '@/lib/aqi-utils';
import twilio from 'twilio';

const ALERT_COOLDOWN_HOURS = 4;

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const supabase = getSupabaseServer();

  const { data: subs, error } = await supabase
    .from('sms_subscriptions')
    .select('id, phone_e164, zip_code, language, last_alerted_at')
    .eq('is_active', true);

  if (error || !subs) {
    return NextResponse.json({ error: 'Failed to load subscriptions' }, { status: 500 });
  }

  const zips = [...new Set(subs.map((s) => s.zip_code as string))];
  const aqiByZip: Record<string, string> = {};

  await Promise.all(
    zips.map(async (zip) => {
      const result = await fetchAirQuality(zip);
      aqiByZip[zip] = result.overallCategory;
    })
  );

  const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
  const from = process.env.TWILIO_PHONE_NUMBER!;
  const now = new Date();
  const cutoff = new Date(now.getTime() - ALERT_COOLDOWN_HOURS * 60 * 60 * 1000);

  let sent = 0;

  for (const sub of subs) {
    const category = aqiByZip[sub.zip_code];
    if (!isAlertLevel(category as Parameters<typeof isAlertLevel>[0])) continue;

    const lastAlert = sub.last_alerted_at ? new Date(sub.last_alerted_at) : null;
    if (lastAlert && lastAlert > cutoff) continue;

    const isEs = sub.language === 'es';
    const body = isEs
      ? `⚠️ Alerta Windy & Clear: La calidad del aire en el código postal ${sub.zip_code} no es saludable ahora. Limita el tiempo al aire libre. Responde STOP para cancelar.`
      : `⚠️ Windy & Clear Alert: Air quality in ZIP ${sub.zip_code} is unhealthy right now. Limit time outdoors. Reply STOP to unsubscribe.`;

    try {
      await client.messages.create({ body, from, to: sub.phone_e164 });
      await supabase
        .from('sms_subscriptions')
        .update({ last_alerted_at: now.toISOString() })
        .eq('id', sub.id);
      sent++;
    } catch (err) {
      console.error(`SMS failed for ${sub.id}:`, err);
    }
  }

  return NextResponse.json({ processed: subs.length, sent });
}
