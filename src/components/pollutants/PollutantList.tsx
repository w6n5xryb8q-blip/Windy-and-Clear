import type { PollutantReading } from '@/lib/airnow';
import { getAqiMeta } from '@/lib/aqi-utils';

interface Props {
  pollutants: PollutantReading[];
  locale: 'en' | 'es';
}

const DESCRIPTIONS: Record<string, { nameEn: string; nameEs: string; descEn: string; descEs: string }> = {
  'PM2.5': {
    nameEn: 'Fine Particles (PM2.5)',
    nameEs: 'Partículas finas (PM2.5)',
    descEn: 'Tiny particles from vehicles, industry, and fires. Can reach deep into your lungs and worsen asthma.',
    descEs: 'Partículas diminutas de vehículos, industria e incendios. Pueden llegar profundo a los pulmones y empeorar el asma.',
  },
  'Ozone': {
    nameEn: 'Ground-Level Ozone',
    nameEs: 'Ozono a nivel del suelo',
    descEn: 'Forms when sunlight reacts with vehicle and factory exhaust. Makes breathing harder — especially for children.',
    descEs: 'Se forma cuando la luz solar reacciona con el escape de autos y fábricas. Dificulta la respiración — especialmente para niños.',
  },
  'PM10': {
    nameEn: 'Coarse Particles (PM10)',
    nameEs: 'Partículas gruesas (PM10)',
    descEn: 'Larger dust particles from construction and roads that irritate your nose, throat, and lungs.',
    descEs: 'Partículas de polvo más grandes de la construcción y carreteras que irritan la nariz, garganta y pulmones.',
  },
  'NO2': {
    nameEn: 'Nitrogen Dioxide (NO2)',
    nameEs: 'Dióxido de nitrógeno (NO2)',
    descEn: 'From vehicle exhaust and power plants. Irritates airways and increases risk of respiratory infections.',
    descEs: 'Del escape de vehículos y plantas de energía. Irrita las vías respiratorias y aumenta el riesgo de infecciones.',
  },
  'CO': {
    nameEn: 'Carbon Monoxide (CO)',
    nameEs: 'Monóxido de carbono (CO)',
    descEn: 'Produced by burning fuel. At high levels, limits oxygen in your blood.',
    descEs: 'Producido al quemar combustible. En niveles altos, limita el oxígeno en la sangre.',
  },
};

export default function PollutantList({ pollutants, locale }: Props) {
  const top = pollutants.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="text-xs font-bold tracking-widest uppercase text-navy mb-4">
        {locale === 'es' ? 'Qué hay en tu aire' : "What's In Your Air"}
      </h3>
      <ul className="space-y-4">
        {top.map((p) => {
          const meta = getAqiMeta(p.category);
          const desc = DESCRIPTIONS[p.parameterName];
          const name = desc ? (locale === 'es' ? desc.nameEs : desc.nameEn) : p.parameterName;
          const description = desc ? (locale === 'es' ? desc.descEs : desc.descEn) : '';

          return (
            <li key={p.parameterName} className="flex items-start gap-3">
              <div
                className="w-3 h-3 rounded-full mt-1 shrink-0"
                style={{ backgroundColor: meta.colorHex }}
                aria-hidden
              />
              <div>
                <p className="text-sm font-semibold text-navy">{name}</p>
                {description && <p className="text-sm text-gray-500 mt-0.5 leading-snug">{description}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
