'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { neighborhoods } from '@/data/neighborhoods';

const sorted = [
  ...neighborhoods.filter((n) => n.isEj),
  ...neighborhoods.filter((n) => !n.isEj),
];

export default function NeighborhoodPicker() {
  const t = useTranslations('home');
  const locale = useLocale();
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = search.trim()
    ? sorted.filter((n) =>
        n.name.toLowerCase().includes(search.toLowerCase()) ||
        n.nameEs.toLowerCase().includes(search.toLowerCase())
      )
    : sorted;

  return (
    <div>
      <input
        type="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="w-full px-4 py-2.5 text-sm rounded-xl border border-gray-300 focus:border-navy focus:outline-none bg-white text-navy placeholder-gray-400 mb-3"
      />
      <ul className="max-h-72 overflow-y-auto rounded-xl border border-gray-200 bg-white divide-y divide-gray-100">
        {filtered.map((hood) => (
          <li key={hood.slug}>
            <button
              onClick={() => router.push(`/${locale}/neighborhood/${hood.slug}`)}
              className="w-full text-left px-4 py-3 hover:bg-almond active:bg-amber/10 transition-colors flex items-center justify-between gap-2"
            >
              <span className="text-sm font-medium text-navy">{hood.name}</span>
              {hood.isEj && (
                <span className="shrink-0 text-xs font-semibold bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">
                  {t('ejLabel')}
                </span>
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
