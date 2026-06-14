interface Props {
  actionText: string;
  actionUrl?: string;
  locale: 'en' | 'es';
}

export default function TakeActionBlock({ actionText, actionUrl, locale }: Props) {
  const heading = locale === 'es' ? 'Actúa Ahora' : 'Take Action';
  const cta = locale === 'es' ? 'Ver cómo' : 'See How';

  return (
    <div className="bg-navy text-white rounded-2xl p-5">
      <h3 className="text-xs font-bold tracking-widest uppercase text-gold mb-3">{heading}</h3>
      <p className="text-sm leading-relaxed text-gray-300 mb-4">{actionText}</p>
      {actionUrl && (
        <a
          href={actionUrl}
          target={actionUrl.startsWith('http') ? '_blank' : undefined}
          rel={actionUrl.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-block bg-cadmium text-navy font-bold text-sm px-5 py-2.5 rounded-full hover:brightness-110 active:scale-95 transition-all"
        >
          {actionUrl.startsWith('tel') ? (actionUrl === 'tel:311' ? '📞 Call 311' : cta) : cta}
        </a>
      )}
    </div>
  );
}
