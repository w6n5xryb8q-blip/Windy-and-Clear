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
      <div className="flex gap-2">
        <input
          type="tel"
          inputMode="numeric"
          pattern="[0-9]{5}"
          maxLength={5}
          value={zip}
          onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))}
          placeholder={t('zipPlaceholder')}
          className="flex-1 px-4 py-3 text-base rounded-xl border-2 border-gray-300 focus:border-navy focus:outline-none bg-white text-navy placeholder-gray-400"
          aria-label="ZIP code"
        />
        <button
          type="submit"
          className="bg-navy text-white px-5 py-3 rounded-xl font-semibold text-base hover:bg-navy/90 active:scale-95 transition-all"
        >
          {t('zipSubmit')}
        </button>
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
