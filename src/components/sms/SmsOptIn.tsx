'use client';

import { useState } from 'react';

interface Props {
  zip: string;
  locale: 'en' | 'es';
}

const STRINGS = {
  en: {
    heading: 'Get Alerts',
    body: "We'll text you when air quality turns unhealthy — one message, no spam.",
    placeholder: 'Your phone number',
    submit: 'Subscribe',
    submitting: 'Subscribing...',
    success: "You're subscribed. Reply STOP anytime to cancel.",
    error: 'Something went wrong. Please try again.',
    consent: 'By subscribing, you agree to receive air quality alerts. Msg & data rates may apply. Reply STOP to cancel.',
  },
  es: {
    heading: 'Recibe Alertas',
    body: 'Te enviamos un mensaje cuando la calidad del aire sea peligrosa — un mensaje, sin spam.',
    placeholder: 'Tu número de teléfono',
    submit: 'Suscribirme',
    submitting: 'Suscribiendo...',
    success: 'Estás suscrito/a. Responde STOP en cualquier momento para cancelar.',
    error: 'Algo salió mal. Por favor intenta de nuevo.',
    consent: 'Al suscribirte, aceptas recibir alertas de calidad del aire. Pueden aplicar tarifas. Responde STOP para cancelar.',
  },
};

export default function SmsOptIn({ zip, locale }: Props) {
  const s = STRINGS[locale];
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: phone.trim(), zip, language: locale }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border-l-[5px] border-cobalt bg-white p-5">
        <p className="text-sm font-medium text-cobalt">{s.success}</p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-cobalt/20 p-5">
      <h3 className="text-[10px] font-semibold uppercase text-cobalt mb-2" style={{ letterSpacing: '0.15em' }}>
        {s.heading}
      </h3>
      <p className="text-[13px] text-darkblue/60 mb-4">{s.body}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={s.placeholder}
          className="w-full px-4 py-3 border border-cobalt/30 focus:border-cobalt focus:outline-none text-darkblue text-base bg-almond placeholder-darkblue/30"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-cobalt text-almond font-semibold py-3 px-5 hover:bg-darkblue disabled:opacity-60 transition-colors uppercase text-sm"
          style={{ letterSpacing: '0.08em' }}
        >
          {status === 'loading' ? s.submitting : s.submit}
        </button>
        {status === 'error' && (
          <p className="text-fuchsia text-sm font-medium">{s.error}</p>
        )}
        <p className="text-[11px] text-darkblue/40 leading-relaxed">{s.consent}</p>
      </form>
    </div>
  );
}
