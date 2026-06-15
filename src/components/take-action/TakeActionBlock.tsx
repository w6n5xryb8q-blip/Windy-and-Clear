interface Props {
  actionText: string;
  actionUrl?: string;
  locale: 'en' | 'es';
}

export default function TakeActionBlock({ actionText, actionUrl, locale }: Props) {
  const heading = locale === 'es' ? 'Actúa Ahora' : 'Take Action';
  const cta = locale === 'es' ? 'Ver cómo' : 'See How';
  const callLabel = locale === 'es' ? 'Llamar al 311' : 'Call 311';

  return (
    <div className="bg-navy p-5 border-l-[5px] border-gold">
      {/* Diaspora CFO label chip style */}
      <p className="text-[10px] font-semibold tracking-label uppercase text-champagne mb-3">
        {heading}
      </p>
      <p className="text-[14px] leading-relaxed text-white/70 mb-5">{actionText}</p>
      {actionUrl && (
        <a
          href={actionUrl}
          target={actionUrl.startsWith('http') ? '_blank' : undefined}
          rel={actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-block bg-cadmium text-navy font-semibold text-sm px-5 py-2.5 hover:brightness-110 active:scale-95 transition-all uppercase tracking-wide"
        >
          {actionUrl === 'tel:311' ? callLabel : cta}
        </a>
      )}
    </div>
  );
}
