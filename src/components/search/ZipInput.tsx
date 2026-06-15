'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';

export default function ZipInput() {
  const t = useTranslations('home');
  const errT = useTranslations('errors');
  const locale = useLocale();
  const router = useRouter();
  const [zip, setZip] = useState('');
  const [error, setError] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const clean = zip.trim();
    if (!/^\d{5}$/.test(clean)) {
      setError(errT('invalidZip'));
      return;
    }
    setError('');
    router.push(`/${locale}/zip/${clean}`);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      <div className="flex gap-0">
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          placeholder={t('zipPlaceholder')}
          className="flex-1 px-4 py-3 text-base border-2 border-cobalt/30 focus:border-cobalt focus:outline-none bg-white text-darkblue placeholder-darkblue/30"
          aria-label="ZIP code"
        />
        <button
          type="submit"
          className="bg-cadmium text-navy px-5 py-3 font-semibold text-sm hover:brightness-95 active:scale-95 transition-all uppercase"
          style={{ letterSpacing: '0.08em' }}
        >
          {t('zipSubmit')}
        </button>
      </div>
      {error && <p className="text-fuchsia text-sm font-medium">{error}</p>}
    </form>
  );
}
