'use client';

import { useRouter } from 'next/navigation';
import type { Locale } from '@/config';

export default function LangToggle({ currentLocale }: { currentLocale: Locale }) {
  const router = useRouter();

  function switchLocale() {
    const nextLocale: Locale = currentLocale === 'en' ? 'es' : 'en';
    const newPath = window.location.pathname.replace(`/${currentLocale}`, `/${nextLocale}`);
    router.push(newPath);
  }

  return (
    <button
      onClick={switchLocale}
      className="text-xs font-semibold tracking-label border border-champagne/40 text-champagne px-3 py-1 hover:bg-white/10 transition-colors uppercase"
      aria-label={currentLocale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
    >
      {currentLocale === 'en' ? 'Español' : 'English'}
    </button>
  );
}
