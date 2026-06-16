import type { PollutantReading } from '@/lib/airnow';
import { getAqiMeta } from '@/lib/aqi-utils';
import { POLLUTANT_DESCRIPTIONS } from '@/lib/pollutant-descriptions';

interface Props {
  pollutants: PollutantReading[];
  locale: 'en' | 'es';
}

const SECTION_LABEL = { en: "What's In Your Air", es: 'Qué hay en tu aire' };
const WHO_NOTE = {
  en: 'Health context: WHO Global Air Quality Guidelines (2021)',
  es: 'Contexto de salud: Directrices de Calidad del Aire de la OMS (2021)',
};

export default function PollutantList({ pollutants, locale }: Props) {
  const top = pollutants.slice(0, 3);

  return (
    <div className="bg-white border border-cobalt/20 p-5">
      <h3
        className="text-[10px] font-semibold uppercase text-cobalt mb-4"
        style={{ letterSpacing: '0.15em' }}
      >
        {SECTION_LABEL[locale]}
      </h3>
      <ul className="space-y-5">
        {top.map((p) => {
          const meta = getAqiMeta(p.category);
          const desc = POLLUTANT_DESCRIPTIONS[p.parameterName];
          const name        = desc ? (locale === 'es' ? desc.nameEs : desc.nameEn) : p.parameterName;
          const description = desc ? (locale === 'es' ? desc.descEs : desc.descEn) : '';
          const whoContext  = desc ? (locale === 'es' ? desc.whoContextEs : desc.whoContextEn) : '';

          return (
            <li key={p.parameterName} className="flex items-start gap-3">
              <div
                className="w-2.5 h-2.5 mt-1.5 shrink-0"
                style={{ backgroundColor: meta.colorHex }}
                aria-hidden
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="text-sm font-medium text-darkblue">{name}</p>
                  <span className="text-[11px] font-semibold text-darkblue/40">
                    AQI {p.aqi}
                  </span>
                </div>
                {description && (
                  <p className="text-[13px] text-darkblue/60 leading-snug mb-1">{description}</p>
                )}
                {whoContext && (
                  <p className="text-[11px] text-darkblue/40 leading-snug border-l-2 border-cobalt/20 pl-2">
                    {whoContext}
                  </p>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-4 pt-3 border-t border-cobalt/10 text-[10px] text-darkblue/30">
        {WHO_NOTE[locale]}
      </p>
    </div>
  );
}
