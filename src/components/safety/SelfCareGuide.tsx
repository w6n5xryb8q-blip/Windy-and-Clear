'use client';

import { useState } from 'react';
import type { AqiCategory } from '@/lib/aqi-utils';
import type { AqhiCategory } from '@/lib/aqhi';
import { BREATHING_EXERCISES, SELF_CARE_RESOURCES } from '@/lib/self-care-content';

interface Props {
  category: AqiCategory;
  aqhiCategory?: AqhiCategory | null;
  locale: 'en' | 'es';
}

const EPA_ALERT: AqiCategory[]   = ['usg', 'unhealthy', 'veryUnhealthy', 'hazardous'];
const AQHI_ALERT: AqhiCategory[] = ['high', 'veryHigh'];

const STRINGS = {
  en: {
    heading: 'Take Care of Yourself',
    breathingHeading: 'Breathing Exercises',
    breathingIntro: 'When air quality is poor, stress and anxiety can rise too. These techniques help calm your body and mind — do them indoors with windows closed.',
    resourcesHeading: 'Support & Resources',
    resourcesIntro: 'You don\'t have to manage this alone.',
    steps: 'Steps',
    collapse: 'Close',
    expand: 'See steps',
  },
  es: {
    heading: 'Cuídate',
    breathingHeading: 'Ejercicios de Respiración',
    breathingIntro: 'Cuando la calidad del aire es mala, el estrés y la ansiedad también pueden aumentar. Estas técnicas ayudan a calmar tu cuerpo y mente — practícalas en interiores con las ventanas cerradas.',
    resourcesHeading: 'Apoyo y Recursos',
    resourcesIntro: 'No tienes que enfrentar esto solo/a.',
    steps: 'Pasos',
    collapse: 'Cerrar',
    expand: 'Ver pasos',
  },
};

function BreathingCard({ exercise, locale }: { exercise: typeof BREATHING_EXERCISES[0]; locale: 'en' | 'es' }) {
  const [open, setOpen] = useState(false);
  const s = STRINGS[locale];
  const name = locale === 'es' ? exercise.nameEs : exercise.nameEn;
  const purpose = locale === 'es' ? exercise.purposeEs : exercise.purposeEn;
  const steps = locale === 'es' ? exercise.stepsEs : exercise.stepsEn;

  return (
    <div className="border border-cobalt/15">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-almond transition-colors"
      >
        <div>
          <p className="text-sm font-medium text-darkblue">{name}</p>
          <p className="text-[12px] text-darkblue/50 mt-0.5 leading-snug">{purpose}</p>
        </div>
        <span
          className="shrink-0 text-[10px] font-semibold text-cobalt uppercase mt-0.5"
          style={{ letterSpacing: '0.1em' }}
        >
          {open ? s.collapse : s.expand}
        </span>
      </button>

      {open && (
        <ol className="px-4 pb-4 space-y-2 border-t border-cobalt/10">
          {steps.map((step, i) => (
            <li key={i} className="flex items-start gap-3 pt-2">
              <span className="shrink-0 w-5 h-5 flex items-center justify-center bg-cobalt text-almond text-[10px] font-bold mt-0.5">
                {i + 1}
              </span>
              <p className="text-[13px] text-darkblue leading-snug">{step}</p>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default function SelfCareGuide({ category, aqhiCategory, locale }: Props) {
  const showByEpa  = EPA_ALERT.includes(category);
  const showByAqhi = aqhiCategory != null && AQHI_ALERT.includes(aqhiCategory);
  if (!showByEpa && !showByAqhi) return null;

  const s = STRINGS[locale];

  return (
    <div className="bg-white border border-cobalt/20 p-5 space-y-5">
      <h3
        className="text-[10px] font-semibold uppercase text-cobalt"
        style={{ letterSpacing: '0.15em' }}
      >
        {s.heading}
      </h3>

      {/* Breathing exercises */}
      <div>
        <p className="text-sm font-medium text-darkblue mb-1">{s.breathingHeading}</p>
        <p className="text-[12px] text-darkblue/55 leading-relaxed mb-3">{s.breathingIntro}</p>
        <div className="space-y-px">
          {BREATHING_EXERCISES.map((ex) => (
            <BreathingCard key={ex.nameEn} exercise={ex} locale={locale} />
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-cobalt/10" />

      {/* Resources */}
      <div>
        <p className="text-sm font-medium text-darkblue mb-1">{s.resourcesHeading}</p>
        <p className="text-[12px] text-darkblue/55 leading-relaxed mb-3">{s.resourcesIntro}</p>
        <ul className="space-y-2">
          {SELF_CARE_RESOURCES.map((r) => (
            <li key={r.nameEn}>
              <a
                href={r.href}
                className="flex items-start justify-between gap-3 px-4 py-3 border border-cobalt/15 hover:bg-almond transition-colors group"
              >
                <div>
                  <p className="text-sm font-medium text-darkblue group-hover:text-cobalt transition-colors">
                    {locale === 'es' ? r.nameEs : r.nameEn}
                  </p>
                  <p className="text-[12px] text-darkblue/50 mt-0.5">{r.detail}</p>
                </div>
                <span className="shrink-0 text-cobalt/40 text-lg mt-0.5">→</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
