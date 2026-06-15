import type { PermitsResult } from '@/lib/permits';
import { formatDistanceToNow } from 'date-fns';
import { es } from 'date-fns/locale';

interface Props {
  permitsData: PermitsResult;
  locale: 'en' | 'es';
}

export default function PermitFeed({ permitsData, locale }: Props) {
  const heading = locale === 'es' ? 'Cerca de ti — Actividad reciente' : 'Near You — Recent Activity';
  const noActivity = locale === 'es'
    ? 'No hay solicitudes de permisos en los últimos 30 días.'
    : 'No industrial permit applications in the last 30 days.';

  return (
    <div className="bg-white border border-cobalt/20 p-5">
      <h3 className="text-[10px] font-semibold tracking-label uppercase text-cobalt mb-4">
        {heading}
      </h3>

      {!permitsData.dataAvailable || permitsData.permits.length === 0 ? (
        <p className="text-[13px] text-darkblue/40 italic">{noActivity}</p>
      ) : (
        <ul className="space-y-4">
          {permitsData.permits.map((permit) => {
            let timeAgo = '';
            try {
              timeAgo = formatDistanceToNow(new Date(permit.issuedDate), {
                addSuffix: true,
                locale: locale === 'es' ? es : undefined,
              });
            } catch {
              timeAgo = permit.issuedDate;
            }

            return (
              <li key={permit.id} className="border-l-[3px] border-cobalt pl-3">
                <p className="text-sm font-medium text-darkblue leading-snug">
                  {permit.workDescription}
                </p>
                {permit.address && (
                  <p className="text-[12px] text-darkblue/50 mt-0.5">{permit.address}</p>
                )}
                <p className="text-[11px] text-darkblue/40 mt-1 uppercase tracking-wide font-medium">
                  {timeAgo}
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
