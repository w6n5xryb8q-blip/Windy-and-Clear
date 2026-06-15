import Link from 'next/link';
import type { Locale } from '@/config';
import LangToggle from './LangToggle';

export default function NavBar({ locale }: { locale: Locale }) {
  return (
    <nav className="bg-navy sticky top-0 z-50">
      {/* Gold top rule — Diaspora CFO design system motif */}
      <div className="h-[4px] w-full bg-gold" />
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={`/${locale}`} className="flex items-baseline gap-0.5">
          <span className="text-lg font-light tracking-tight text-white">Windy</span>
          <span className="text-lg font-semibold text-gold mx-0.5">&amp;</span>
          <span className="text-lg font-light tracking-tight text-white">Clear</span>
        </Link>
        <LangToggle currentLocale={locale} />
      </div>
    </nav>
  );
}
