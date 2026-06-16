'use client';

import { useState } from 'react';
import type { AqiCategory } from '@/lib/aqi-utils';
import { SYMPTOM_TIERS, GROUNDING_TECHNIQUES, ROUTINE_GROUPS } from '@/lib/self-regulation-content';

interface Props {
  category: AqiCategory;
  locale: 'en' | 'es';
}

const ALERT_CATEGORIES: AqiCategory[] = ['usg', 'unhealthy', 'veryUnhealthy', 'hazardous'];

const STRINGS = {
  en: {
    heading: 'Self-Regulation Guide',
    symptomsHeading: 'Know Your Symptoms',
    symptomsIntro: 'Smoke and poor air affect people differently. Use this guide to understand your body and act quickly.',
    groundingHeading: 'Calm Your Mind',
    groundingIntro: 'Air emergencies can trigger anxiety, panic, or helplessness. These techniques interrupt the stress response — do them anywhere.',
    routineHeading: 'Protect Yourself Today',
    routineIntro: 'Adjust your routine based on your health situation.',
    steps: 'Steps',
    collapse: 'Close',
    expand: 'See steps',
    tips: 'Tips',
    symptoms: 'Symptoms',
    guidance: 'What to do',
  },
  es: {
    heading: 'Guía de Autorregulación',
    symptomsHeading: 'Conoce Tus Síntomas',
    symptomsIntro: 'El humo y el aire contaminado afectan a las personas de manera diferente. Usa esta guía para entender tu cuerpo y actuar rápidamente.',
    groundingHeading: 'Calma Tu Mente',
    groundingIntro: 'Las emergencias de aire pueden desencadenar ansiedad, pánico o impotencia. Estas técnicas interrumpen la respuesta al estrés — practícalas en cualquier lugar.',
    routineHeading: 'Protégete Hoy',
    routineIntro: 'Ajusta tu rutina según tu situación de salud.',
    steps: 'Pasos',
    collapse: 'Cerrar',
    expand: 'Ver pasos',
    tips: 'Consejos',
    symptoms: 'Síntomas',
    guidance: 'Qué hacer',
  },
};

function SymptomTierCard({ tier, locale }: { tier: typeof SYMPTOM_TIERS[0]; locale: 'en' | 'es' }) {
  const [open, setOpen] = useState(false);
  const s = STRINGS[locale];
  const level = locale === 'es' ? tier.levelEs : tier.levelEn;
  const guidance = locale === 'es' ? tier.guidanceEs : tier.guidanceEn;
  const cta = locale === 'es' ? tier.ctaEs : tier.ctaEn;
  const symptoms = tier.symptoms.map((sym) => (locale === 'es' ? sym.es : sym.en));

  return (
    <div className={`border-l-4 ${tier.borderColor} border border-cobalt/10`}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-almond transition-colors"
      >
        <div className="flex items-center gap-2">
          <span className={`text-xs font-semibold uppercase ${tier.color}`} style={{ letterSpacing: '0.1em' }}>
            {level}
          </span>
        </div>
        <span
          className="shrink-0 text-[10px] font-semibold text-cobalt uppercase mt-0.5"
          style={{ letterSpacing: '0.1em' }}
        >
          {open ? s.collapse : s.symptoms}
        </span>
      </button>

      {open && (
        <div className="px-4 pb-4 border-t border-cobalt/10 bg-almond/30">
          <ul className="space-y-1.5 pt-3 mb-3">
            {symptoms.map((sym, i) => (
              <li key={i} className="flex items-start gap-2 text-[12px] text-darkblue leading-snug">
                <span className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${tier.borderColor.replace('border-', 'bg-')}`} />
                {sym}
              </li>
            ))}
          </ul>
          <div className="border-t border-cobalt/10 pt-3">
            <p className="text-[11px] text-darkblue/60 uppercase font-semibold mb-1" style={{ letterSpacing: '0.08em' }}>
              {s.guidance}
            </p>
            <p className="text-[13px] text-darkblue font-medium leading-snug mb-2">{guidance}</p>
            {tier.ctaHref ? (
              <a
                href={tier.ctaHref}
                className={`inline-block text-[12px] font-semibold px-3 py-1.5 border ${tier.borderColor} ${tier.color} hover:bg-almond transition-colors`}
              >
                {cta} →
              </a>
            ) : (
              <p className={`text-[12px] font-semibold ${tier.color}`}>{cta}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function GroundingCard({ technique, locale }: { technique: typeof GROUNDING_TECHNIQUES[0]; locale: 'en' | 'es' }) {
  const [open, setOpen] = useState(false);
  const s = STRINGS[locale];
  const name = locale === 'es' ? technique.nameEs : technique.nameEn;
  const desc = locale === 'es' ? technique.descEs : technique.descEn;
  const steps = locale === 'es' ? technique.stepsEs : technique.stepsEn;

  return (
    <div className="border border-cobalt/15">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-almond transition-colors"
      >
        <div>
          <p className="text-sm font-medium text-darkblue">{name}</p>
          <p className="text-[12px] text-darkblue/50 mt-0.5 leading-snug">{desc}</p>
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

function RoutineCard({ group, locale }: { group: typeof ROUTINE_GROUPS[0]; locale: 'en' | 'es' }) {
  const [open, setOpen] = useState(false);
  const s = STRINGS[locale];
  const groupName = locale === 'es' ? group.groupEs : group.groupEn;
  const tips = locale === 'es' ? group.tipsEs : group.tipsEn;

  return (
    <div className="border border-cobalt/15">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start justify-between gap-3 px-4 py-3 text-left hover:bg-almond transition-colors"
      >
        <p className="text-sm font-medium text-darkblue">{groupName}</p>
        <span
          className="shrink-0 text-[10px] font-semibold text-cobalt uppercase mt-0.5"
          style={{ letterSpacing: '0.1em' }}
        >
          {open ? s.collapse : s.tips}
        </span>
      </button>

      {open && (
        <ul className="px-4 pb-4 space-y-2 border-t border-cobalt/10">
          {tips.map((tip, i) => (
            <li key={i} className="flex items-start gap-3 pt-2">
              <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-cobalt mt-2" />
              <p className="text-[13px] text-darkblue leading-snug">{tip}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SelfRegulationGuide({ category, locale }: Props) {
  if (!ALERT_CATEGORIES.includes(category)) return null;

  const s = STRINGS[locale];

  return (
    <div className="bg-white border border-cobalt/20 p-5 space-y-5">
      <h3
        className="text-[10px] font-semibold uppercase text-cobalt"
        style={{ letterSpacing: '0.15em' }}
      >
        {s.heading}
      </h3>

      {/* Symptom tiers */}
      <div>
        <p className="text-sm font-medium text-darkblue mb-1">{s.symptomsHeading}</p>
        <p className="text-[12px] text-darkblue/55 leading-relaxed mb-3">{s.symptomsIntro}</p>
        <div className="space-y-px">
          {SYMPTOM_TIERS.map((tier) => (
            <SymptomTierCard key={tier.levelEn} tier={tier} locale={locale} />
          ))}
        </div>
      </div>

      <div className="border-t border-cobalt/10" />

      {/* Grounding techniques */}
      <div>
        <p className="text-sm font-medium text-darkblue mb-1">{s.groundingHeading}</p>
        <p className="text-[12px] text-darkblue/55 leading-relaxed mb-3">{s.groundingIntro}</p>
        <div className="space-y-px">
          {GROUNDING_TECHNIQUES.map((tech) => (
            <GroundingCard key={tech.nameEn} technique={tech} locale={locale} />
          ))}
        </div>
      </div>

      <div className="border-t border-cobalt/10" />

      {/* Routine groups */}
      <div>
        <p className="text-sm font-medium text-darkblue mb-1">{s.routineHeading}</p>
        <p className="text-[12px] text-darkblue/55 leading-relaxed mb-3">{s.routineIntro}</p>
        <div className="space-y-px">
          {ROUTINE_GROUPS.map((group) => (
            <RoutineCard key={group.groupEn} group={group} locale={locale} />
          ))}
        </div>
      </div>
    </div>
  );
}
