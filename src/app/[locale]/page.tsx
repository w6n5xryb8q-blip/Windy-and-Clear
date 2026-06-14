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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">{t('headline')}</h1>
        <p className="text-gray-600 text-base leading-relaxed">{t('subheadline')}</p>
      </div>

      <ZipInput />

      <div className="flex items-center gap-3 my-6">
        <div className="h-px flex-1 bg-gray-300" />
        <span className="text-sm text-gray-500">{t('orChoose')}</span>
        <div className="h-px flex-1 bg-gray-300" />
      </div>

      <NeighborhoodPicker />
    </div>
  );
}
