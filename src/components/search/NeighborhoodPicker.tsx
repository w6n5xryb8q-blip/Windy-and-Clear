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
        className="w-full px-4 py-2.5 text-sm border border-cobalt/30 focus:border-cobalt focus:outline-none bg-white text-darkblue placeholder-darkblue/30 mb-0"
      />
      <ul className="max-h-72 overflow-y-auto border border-t-0 border-cobalt/20 bg-white divide-y divide-cobalt/10">
        {filtered.map((hood) => (
          <li key={hood.slug}>
            <button
              onClick={() => router.push(`/${locale}/neighborhood/${hood.slug}`)}
              className="w-full text-left px-4 py-3 hover:bg-almond transition-colors flex items-center justify-between gap-2"
            >
              <span className="text-sm font-medium text-darkblue">{hood.name}</span>
              {hood.isEj && (
                <span
                  className="shrink-0 text-[9px] font-semibold border border-fuchsia text-fuchsia px-2 py-0.5 uppercase"
                  style={{ letterSpacing: '0.12em' }}
                >
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
