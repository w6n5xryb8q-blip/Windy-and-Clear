import type { AirQualityResult } from '@/lib/airnow';
import { getAqiMeta } from '@/lib/aqi-utils';
import { AQHI_META, type AqhiCategory, type AqhiResult } from '@/lib/aqhi';

interface Props {
  airData: AirQualityResult;
  aqhi: AqhiResult | null;
  neighborhoodName: string;
  locale: 'en' | 'es';
}

const NO_DATA_HEADLINE = {
  en: 'No air quality reading available for this area right now.',
  es: 'No hay lectura de calidad del aire disponible para esta área ahora mismo.',
};

const AQI_LABEL = { en: 'EPA AQI', es: 'ICA EPA' };
const WHO_LABEL = {
  en: 'Health risk score based on WHO-endorsed methodology',
  es: 'Puntuación de riesgo basada en metodología avalada por la OMS',
};
const POLLUTANTS_LABEL = { en: 'From', es: 'De' };
const UPDATED_LABEL = { en: 'Updated', es: 'Act.' };
const HEALTH_RISK_LABEL = { en: 'Health Risk', es: 'Riesgo de Salud' };

export default function AirStatusCard({ airData, aqhi, neighborhoodName, locale }: Props) {
  const { overallAqi, overallCategory, observedAt, dataAvailable } = airData;

  // Determine display mode
  const hasAqhi = aqhi !== null && dataAvailable;
  const aqhiMeta = hasAqhi ? AQHI_META[aqhi.category as AqhiCategory] : null;
  const epaMeta  = getAqiMeta(overallCategory);

  const borderColor  = aqhiMeta?.colorHex ?? epaMeta.colorHex;
  const headline     = hasAqhi
    ? AQHI_META[aqhi.category][locale === 'es' ? 'headlineEs' : 'headlineEn']
    : NO_DATA_HEADLINE[locale];
  const riskLabel    = hasAqhi
    ? AQHI_META[aqhi.category][locale === 'es' ? 'labelEs' : 'labelEn']
    : (locale === 'es' ? 'Sin datos' : 'No Data');

  const formattedTime = observedAt
    ? new Date(observedAt).toLocaleTimeString(locale === 'es' ? 'es-US' : 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : null;

  return (
    <div
      className="bg-white border-l-[5px] p-5"
      style={{ borderLeftColor: borderColor }}
      role="region"
      aria-label="Air quality status"
    >
      {/* Top row: risk chip + timestamp */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-semibold uppercase px-2 py-1 bg-cobalt text-champagne"
          style={{ letterSpacing: '0.15em' }}
        >
          {riskLabel}
        </span>
        {formattedTime && (
          <span className="text-[11px] text-darkblue/40 uppercase tracking-wide font-medium">
            {UPDATED_LABEL[locale]} {formattedTime}
          </span>
        )}
      </div>

      {/* Neighborhood name */}
      <h2 className="text-xl font-light text-darkblue leading-tight tracking-tight mb-3">
        {neighborhoodName}
      </h2>

      {/* AQHI score block */}
      {hasAqhi && aqhi && (
        <div className="flex items-end gap-4 mb-3">
          <div>
            <p
              className="text-[10px] font-semibold uppercase text-darkblue/40 mb-0.5"
              style={{ letterSpacing: '0.12em' }}
            >
              {HEALTH_RISK_LABEL[locale]}
            </p>
            <div className="flex items-baseline gap-1">
              <span
                className="text-5xl font-light leading-none"
                style={{ color: aqhiMeta?.colorHex }}
              >
                {aqhi.display}
              </span>
              <span className="text-xl font-light text-darkblue/30">/10</span>
            </div>
          </div>

          {/* EPA AQI — secondary */}
          {overallAqi > 0 && (
            <div className="pb-0.5 border-l border-darkblue/10 pl-4">
              <p
                className="text-[10px] font-semibold uppercase text-darkblue/40 mb-0.5"
                style={{ letterSpacing: '0.12em' }}
              >
                {AQI_LABEL[locale]}
              </p>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 shrink-0" style={{ backgroundColor: epaMeta.colorHex }} />
                <span className="text-lg font-light text-darkblue">{overallAqi}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Headline */}
      <p className="text-darkblue/70 text-[15px] leading-relaxed">{headline}</p>

      {/* WHO attribution + pollutants used */}
      {hasAqhi && aqhi && (
        <div className="mt-3 pt-3 border-t border-darkblue/10 flex flex-col gap-0.5">
          <p className="text-[10px] text-darkblue/40 leading-snug">
            {WHO_LABEL[locale]}
          </p>
          {aqhi.pollutantsUsed.length > 0 && (
            <p className="text-[10px] text-darkblue/35">
              {POLLUTANTS_LABEL[locale]}: {aqhi.pollutantsUsed.join(', ')}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
