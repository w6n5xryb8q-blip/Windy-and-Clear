import type { AirQualityResult } from '@/lib/airnow';
import { getAqiMeta, type AqiCategory } from '@/lib/aqi-utils';

interface Props {
  airData: AirQualityResult;
  neighborhoodName: string;
  locale: 'en' | 'es';
}

const STATUS_LABELS: Record<AqiCategory, { en: string; es: string }> = {
  good:         { en: 'Good',           es: 'Bueno' },
  moderate:     { en: 'Moderate',       es: 'Moderado' },
  usg:          { en: 'Caution',        es: 'Precaución' },
  unhealthy:    { en: 'Unhealthy',      es: 'No saludable' },
  veryUnhealthy:{ en: 'Very Unhealthy', es: 'Muy no saludable' },
  hazardous:    { en: 'Hazardous',      es: 'Peligroso' },
  unknown:      { en: 'No Data',        es: 'Sin datos' },
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

  const borderColorMap: Record<AqiCategory, string> = {
    good:          'border-l-green-500',
    moderate:      'border-l-yellow-500',
    usg:           'border-l-orange-500',
    unhealthy:     'border-l-red-500',
    veryUnhealthy: 'border-l-purple-500',
    hazardous:     'border-l-red-900',
    unknown:       'border-l-gray-400',
  };

  const tagBgMap: Record<AqiCategory, string> = {
    good:          'bg-green-100 text-green-800',
    moderate:      'bg-yellow-100 text-yellow-800',
    usg:           'bg-orange-100 text-orange-800',
    unhealthy:     'bg-red-100 text-red-800',
    veryUnhealthy: 'bg-purple-100 text-purple-800',
    hazardous:     'bg-red-950 text-red-100',
    unknown:       'bg-gray-100 text-gray-600',
  };

  const formattedTime = airData.observedAt
    ? new Date(airData.observedAt).toLocaleTimeString(locale === 'es' ? 'es-US' : 'en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      })
    : null;

  return (
    <div
      className={`bg-white rounded-2xl shadow-sm border-l-4 ${borderColorMap[category]} p-5`}
      role="region"
      aria-label="Air quality status"
    >
      <div className="flex items-center justify-between mb-3">
        <span className={`text-xs font-bold tracking-widest uppercase px-2 py-1 rounded ${tagBgMap[category]}`}>
          {label}
        </span>
        {formattedTime && (
          <span className="text-xs text-gray-400">
            {locale === 'es' ? `Act. ${formattedTime}` : `Updated ${formattedTime}`}
          </span>
        )}
      </div>

      <h2 className="text-lg font-semibold text-navy leading-snug">
        {neighborhoodName}
      </h2>
      <p className="mt-1 text-gray-700 text-base leading-relaxed">{headline}</p>

      {airData.overallAqi > 0 && (
        <div className="mt-3 flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: meta.colorHex }} />
          <span className="text-sm text-gray-500">
            {locale === 'es' ? 'Índice AQI' : 'AQI'}: <strong className="text-navy">{airData.overallAqi}</strong>
          </span>
        </div>
      )}
    </div>
  );
}
