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
    <div className="bg-white rounded-2xl shadow-sm p-5">
      <h3 className="text-xs font-bold tracking-widest uppercase text-navy mb-4">{heading}</h3>

      {!permitsData.dataAvailable || permitsData.permits.length === 0 ? (
        <p className="text-sm text-gray-400 italic">{noActivity}</p>
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
              <li key={permit.id} className="border-l-2 border-amber pl-3">
                <p className="text-sm font-medium text-navy leading-snug">
                  {permit.workDescription}
                </p>
                {permit.address && (
                  <p className="text-xs text-gray-500 mt-0.5">{permit.address}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">{timeAgo}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
