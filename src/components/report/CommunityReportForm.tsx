'use client';

import { useState } from 'react';

interface Props {
  neighborhoodSlug: string;
  locale: 'en' | 'es';
}

const STRINGS = {
  en: {
    heading: 'Report Something',
    placeholder: 'Describe what you see or smell — a dust cloud, strong odor, truck activity near a school...',
    submit: 'Send Report',
    submitting: 'Sending...',
    success: 'Report received. Thank you — your observation helps your community.',
    error: 'Could not send report. Please try again.',
    charCount: (n: number) => `${n}/1000`,
  },
  es: {
    heading: 'Reporta Algo',
    placeholder: 'Describe lo que ves o hueles — una nube de polvo, olor fuerte, actividad de camiones cerca de una escuela...',
    submit: 'Enviar Reporte',
    submitting: 'Enviando...',
    success: 'Reporte recibido. Gracias — tu observación ayuda a tu comunidad.',
    error: 'No se pudo enviar el reporte. Por favor intenta de nuevo.',
    charCount: (n: number) => `${n}/1000`,
  },
};

export default function CommunityReportForm({ neighborhoodSlug, locale }: Props) {
  const s = STRINGS[locale];
  const [text, setText] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (text.trim().length < 10) return;
    setStatus('loading');
    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          neighborhood: neighborhoodSlug,
          reportText: text.trim(),
          language: locale,
        }),
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
    <div className="border border-gray-200 rounded-2xl p-5 bg-white/60">
      <h3 className="text-xs font-bold tracking-widest uppercase text-gray-500 mb-3">{s.heading}</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 1000))}
          placeholder={s.placeholder}
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-navy focus:outline-none text-navy text-sm resize-none"
          disabled={status === 'loading'}
        />
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">{s.charCount(text.length)}</span>
          <button
            type="submit"
            disabled={status === 'loading' || text.trim().length < 10}
            className="bg-navy text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-navy/90 disabled:opacity-40 transition-colors"
          >
            {status === 'loading' ? s.submitting : s.submit}
          </button>
        </div>
        {status === 'error' && <p className="text-red-600 text-sm">{s.error}</p>}
      </form>
    </div>
  );
}
