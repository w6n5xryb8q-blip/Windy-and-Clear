import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';
import twilio from 'twilio';

const TWIML_OK = '<?xml version="1.0" encoding="UTF-8"?><Response></Response>';

export async function POST(request: NextRequest) {
  // Validate the request came from Twilio, not a spoofed POST
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (authToken) {
    const signature = request.headers.get('x-twilio-signature') ?? '';
    const url = process.env.NEXT_PUBLIC_APP_URL
      ? `${process.env.NEXT_PUBLIC_APP_URL}/api/subscribe/opt-out`
      : '';
    const rawBody = await request.text();
    const params = Object.fromEntries(new URLSearchParams(rawBody));

    if (url) {
      const valid = twilio.validateRequest(authToken, signature, url, params);
      if (!valid) {
        return new NextResponse('Forbidden', { status: 403 });
      }
    }

    const { From } = params;
    if (!From) return new NextResponse(TWIML_OK, { headers: { 'Content-Type': 'text/xml' } });

    try {
      const supabase = getSupabaseServer();
      await supabase
        .from('sms_subscriptions')
        .update({ is_active: false })
        .eq('phone_e164', From);
    } catch (err) {
      console.error('Opt-out error:', err);
    }
  } else {
    // TWILIO_AUTH_TOKEN not configured — log and accept (graceful degradation)
    console.warn('TWILIO_AUTH_TOKEN not set; skipping signature validation on opt-out webhook');
    const rawBody = await request.text();
    const { From } = Object.fromEntries(new URLSearchParams(rawBody));
    if (From) {
      try {
        const supabase = getSupabaseServer();
        await supabase
          .from('sms_subscriptions')
          .update({ is_active: false })
          .eq('phone_e164', From);
      } catch (err) {
        console.error('Opt-out error:', err);
      }
    }
  }

  return new NextResponse(TWIML_OK, { headers: { 'Content-Type': 'text/xml' } });
}
