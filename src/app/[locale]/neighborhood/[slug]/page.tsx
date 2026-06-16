import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import type { Metadata } from 'next';
import { getNeighborhoodBySlug, neighborhoods } from '@/data/neighborhoods';
import { fetchAirQuality } from '@/lib/airnow';
import { fetchPermits } from '@/lib/permits';
import { fetchConcentrationsForAqhi } from '@/lib/fetch-concentrations';
import AirStatusCard from '@/components/air-status/AirStatusCard';
import SafetyPrecautions from '@/components/safety/SafetyPrecautions';
import SelfCareGuide from '@/components/safety/SelfCareGuide';
import SelfRegulationGuide from '@/components/safety/SelfRegulationGuide';
import PollutantList from '@/components/pollutants/PollutantList';
import PermitFeed from '@/components/permits/PermitFeed';
import TakeActionBlock from '@/components/take-action/TakeActionBlock';
import SmsOptIn from '@/components/sms/SmsOptIn';
import CommunityReportForm from '@/components/report/CommunityReportForm';

interface Props {
  params: { locale: string; slug: string };
}

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const hood = getNeighborhoodBySlug(params.slug);
  if (!hood) return {};
  return {
    title: `${hood.name} Air Quality — Windy & Clear`,
    description: `Real-time air quality for ${hood.name}, Chicago.`,
  };
}

export const revalidate = 300;

export default async function NeighborhoodPage({ params }: Props) {
  const hood = getNeighborhoodBySlug(params.slug);
  if (!hood) notFound();

  const t = await getTranslations({ locale: params.locale });

  const [airData, permitsData, concData] = await Promise.all([
    fetchAirQuality(hood.primaryZip),           // EPA AQI — independent
    fetchPermits(hood.communityAreaNumber),
    fetchConcentrationsForAqhi(),               // AQHI — independent
  ]);

  const locale = params.locale as 'en' | 'es';
  const hoodName = locale === 'es' ? hood.nameEs : hood.name;
  const takeActionText = locale === 'es' ? hood.takeActionEs : hood.takeActionEn;
  const takeActionUrl = hood.takeActionUrl;

  return (
    <div className="pt-6 space-y-5">
      <div className="flex items-center gap-3 mb-2">
        <span className="text-sm font-light text-darkblue/60">{hoodName}</span>
        {hood.isEj && (
          <span
            className="text-[9px] font-semibold border border-fuchsia text-fuchsia px-2 py-0.5 uppercase"
            style={{ letterSpacing: '0.12em' }}
          >
            {t('home.ejLabel')}
          </span>
        )}
      </div>

      <AirStatusCard
        airData={airData}
        aqhi={concData.aqhi}
        neighborhoodName={hoodName}
        locale={locale}
      />

      <SafetyPrecautions category={airData.overallCategory} locale={locale} />

      <SelfCareGuide category={airData.overallCategory} locale={locale} />

      <SelfRegulationGuide category={airData.overallCategory} locale={locale} />

      {airData.dataAvailable && airData.pollutants.length > 0 && (
        <PollutantList pollutants={airData.pollutants} locale={locale} />
      )}

      <PermitFeed permitsData={permitsData} locale={locale} />

      <TakeActionBlock
        actionText={takeActionText}
        actionUrl={takeActionUrl}
        locale={locale}
      />

      <SmsOptIn zip={hood.primaryZip} locale={locale} />

      <CommunityReportForm
        neighborhoodSlug={hood.slug}
        locale={locale}
      />

      <footer className="pt-6 pb-2 text-center text-xs text-gray-400">
        {t('footer.dataSource')}
      </footer>
    </div>
  );
}
