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
      className="text-xs font-semibold border border-white/30 px-3 py-1 rounded-full hover:bg-white/10 transition-colors"
      aria-label={currentLocale === 'en' ? 'Switch to Spanish' : 'Cambiar a inglés'}
    >
      {currentLocale === 'en' ? 'Español' : 'English'}
    </button>
  );
}
