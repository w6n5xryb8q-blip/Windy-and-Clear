import Link from 'next/link';
import type { Locale } from '@/config';
import LangToggle from './LangToggle';

export default function NavBar({ locale }: { locale: Locale }) {
  return (
    <nav className="bg-navy text-white px-4 py-3 flex items-center justify-between sticky top-0 z-50">
      <Link href={`/${locale}`} className="flex items-baseline gap-0.5">
        <span className="text-lg font-semibold tracking-tight">Windy</span>
        <span className="text-lg font-bold text-gold mx-0.5">&amp;</span>
        <span className="text-lg font-semibold tracking-tight">Clear</span>
      </Link>
      <LangToggle currentLocale={locale} />
    </nav>
  );
}
