import type { AirQualityResult } from '@/lib/airnow';
import { getAqiMeta, type AqiCategory } from '@/lib/aqi-utils';

interface Props {
  airData: AirQualityResult;
  neighborhoodName: string;
  locale: 'en' | 'es';
}

const STATUS_LABELS: Record<AqiCategory, { en: string; es: string }> = {
  good:          { en: 'Good',           es: 'Bueno' },
  moderate:      { en: 'Moderate',       es: 'Moderado' },
  usg:           { en: 'Caution',        es: 'Precaución' },
  unhealthy:     { en: 'Unhealthy',      es: 'No saludable' },
  veryUnhealthy: { en: 'Very Unhealthy', es: 'Muy no saludable' },
  hazardous:     { en: 'Hazardous',      es: 'Peligroso' },
  unknown:       { en: 'No Data',        es: 'Sin datos' },
};

const HEADLINES: Record<AqiCategory, { en: string; es: string }> = {
  good:          { en: 'The air is clean today.', es: 'El aire está limpio hoy.' },
  moderate:      { en: 'Air quality is acceptable — sensitive groups should take care.', es: 'La calidad del aire es aceptable — los grupos sensibles deben tomar precauciones.' },
  usg:           { en: 'Sensitive groups may experience health effects. Limit time outdoors.', es: 'Los grupos sensibles pueden sentir efectos en su salud. Limita el tiempo al aire libre.' },
  unhealthy:     { en: 'Everyone may experience health effects. Avoid prolonged outdoor activity.', es: 'Todos pueden experimentar efectos en la salud. Evita actividades prolongadas al aire libre.' },
  veryUnhealthy: { en: 'Health alert: everyone should avoid outdoor activity.', es: 'Alerta de salud: todos deben evitar actividades al aire libre.' },
  hazardous:     { en: 'Health emergency. Stay indoors and keep windows closed.', es: 'Emergencia de salud. Quédate en casa y mantén las ventanas cerradas.' },
  unknown:       { en: 'No air quality reading available for this area right now.', es: 'No hay lectura de calidad del aire disponible para esta área ahora mismo.' },
};

export default function AirStatusCard({ airData, neighborhoodName, locale }: Props) {
  const category = airData.overallCategory;
  const meta = getAqiMeta(category);
  const label = STATUS_LABELS[category][locale];
  const headline = HEADLINES[category][locale];

  const formattedTime = airData.observedAt
    ? new Date(airData.observedAt).toLocaleTimeString(locale === 'es' ? 'es-US' : 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : null;

  return (
    <div
      className="bg-white border-l-[5px] p-5"
      style={{ borderLeftColor: meta.colorHex }}
      role="region"
      aria-label="Air quality status"
    >
      {/* Section label — Diaspora CFO chip style */}
      <div className="flex items-center justify-between mb-3">
        <span
          className="text-[10px] font-semibold tracking-label uppercase px-2 py-1 bg-cobalt text-champagne"
          style={{ letterSpacing: '0.15em' }}
        >
          {label}
        </span>
        {formattedTime && (
          <span className="text-[11px] text-darkblue/40 uppercase tracking-wide font-medium">
            {locale === 'es' ? `Act. ${formattedTime}` : `Updated ${formattedTime}`}
          </span>
        )}
      </div>

      <h2 className="text-xl font-light text-darkblue leading-tight tracking-tight">
        {neighborhoodName}
      </h2>
      <p className="mt-2 text-darkblue/70 text-[15px] leading-relaxed">{headline}</p>

      {airData.overallAqi > 0 && (
        <div className="mt-4 flex items-center gap-2 border-t border-darkblue/10 pt-3">
          <div className="w-2.5 h-2.5" style={{ backgroundColor: meta.colorHex }} />
          <span className="text-xs text-darkblue/50 uppercase tracking-wide font-medium">
            {locale === 'es' ? 'Índice AQI' : 'AQI Index'}
          </span>
          <strong className="text-sm font-semibold text-darkblue ml-1">{airData.overallAqi}</strong>
        </div>
      )}
    </div>
  );
}
