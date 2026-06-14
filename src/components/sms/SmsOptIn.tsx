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
      <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
        <p className="text-green-800 text-sm font-medium">✓ {s.success}</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="text-xs font-bold tracking-widest uppercase text-navy mb-2">{s.heading}</h3>
      <p className="text-sm text-gray-500 mb-4">{s.body}</p>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder={s.placeholder}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-navy focus:outline-none text-navy text-base"
          disabled={status === 'loading'}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className="bg-navy text-white font-semibold py-3 rounded-xl hover:bg-navy/90 disabled:opacity-60 transition-colors"
        >
          {status === 'loading' ? s.submitting : s.submit}
        </button>
        {status === 'error' && <p className="text-red-600 text-sm">{s.error}</p>}
        <p className="text-xs text-gray-400">{s.consent}</p>
      </form>
    </div>
  );
}
