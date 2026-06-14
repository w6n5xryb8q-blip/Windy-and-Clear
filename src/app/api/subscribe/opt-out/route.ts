import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  let body: Record<string, string>;
  try {
    const text = await request.text();
    body = Object.fromEntries(new URLSearchParams(text));
  } catch {
    return NextResponse.json({ error: 'Invalid body' }, { status: 400 });
  }

  const { From } = body;
  if (!From) return new NextResponse('OK', { status: 200 });

  try {
    const supabase = getSupabaseServer();
    await supabase
      .from('sms_subscriptions')
      .update({ is_active: false })
      .eq('phone_e164', From);
  } catch (err) {
    console.error('Opt-out error:', err);
  }

  return new NextResponse('<?xml version="1.0" encoding="UTF-8"?><Response></Response>', {
    headers: { 'Content-Type': 'text/xml' },
  });
}
