'use client';

import { useState } from 'react';
import type { AqiCategory } from '@/lib/aqi-utils';
import { getAqiMeta } from '@/lib/aqi-utils';
import { SAFETY_CONTENT } from '@/lib/safety-content';

interface Props {
  category: AqiCategory;
  locale: 'en' | 'es';
}

const HEADING = { en: 'What You Should Do', es: 'Qué Debes Hacer' };
const SHOW_MORE = { en: 'Show all steps', es: 'Ver todos los pasos' };
const SHOW_LESS = { en: 'Show less', es: 'Ver menos' };

const PREVIEW_COUNT = 3;

export default function SafetyPrecautions({ category, locale }: Props) {
  const [expanded, setExpanded] = useState(false);

  const content = SAFETY_CONTENT[category];
  const meta = getAqiMeta(category);
  const actions = content.actions;
  const headline = locale === 'es' ? content.headlineEs : content.headlineEn;
  const visible = expanded ? actions : actions.slice(0, PREVIEW_COUNT);
  const hasMore = actions.length > PREVIEW_COUNT;

  return (
    <div className="bg-white border border-cobalt/20 p-5">
      <h3
        className="text-[10px] font-semibold uppercase text-cobalt mb-3"
        style={{ letterSpacing: '0.15em' }}
      >
        {HEADING[locale]}
      </h3>

      {/* AQI-colored headline */}
      <p
        className="text-[13px] font-medium mb-4 pb-3 border-b border-darkblue/10"
        style={{ color: meta.colorHex }}
      >
        {headline}
      </p>

      <ul className="space-y-3">
        {visible.map((action, i) => (
          <li key={i} className="flex items-start gap-3">
            {/* Cobalt left-bar bullet */}
            <div
              className="w-[3px] self-stretch shrink-0 mt-0.5"
              style={{ backgroundColor: i === 0 ? meta.colorHex : '#0047AB' }}
            />
            <p className="text-[13px] text-darkblue leading-snug">
              {locale === 'es' ? action.es : action.en}
            </p>
          </li>
        ))}
      </ul>

      {hasMore && (
        <button
          onClick={() => setExpanded((v) => !v)}
          className="mt-4 text-[11px] font-semibold text-cobalt uppercase border-b border-cobalt/40 hover:border-cobalt transition-colors"
          style={{ letterSpacing: '0.1em' }}
        >
          {expanded ? SHOW_LESS[locale] : SHOW_MORE[locale]}
        </button>
      )}
    </div>
  );
}
