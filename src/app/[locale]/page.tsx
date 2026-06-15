import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import ZipInput from '@/components/search/ZipInput';
import NeighborhoodPicker from '@/components/search/NeighborhoodPicker';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'home' });
  return { title: `Windy & Clear — ${t('headline')}` };
}

export default function HomePage() {
  return <HomeContent />;
}

function HomeContent() {
  const t = useTranslations('home');

  return (
    <div className="pt-8 pb-4">
      {/* DS display heading: light weight, tight tracking, dark blue */}
      <div className="mb-8 border-l-[5px] border-cobalt pl-4">
        <h1 className="text-3xl font-light text-darkblue tracking-tight leading-tight mb-2">
          {t('headline')}
        </h1>
        <p className="text-[14px] text-darkblue/60 leading-relaxed">{t('subheadline')}</p>
      </div>

      <ZipInput />

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-cobalt/15" />
        <span
          className="text-[10px] font-semibold text-darkblue/40 uppercase"
          style={{ letterSpacing: '0.15em' }}
        >
          {t('orChoose')}
        </span>
        <div className="h-px flex-1 bg-cobalt/15" />
      </div>

      <NeighborhoodPicker />
    </div>
  );
}
