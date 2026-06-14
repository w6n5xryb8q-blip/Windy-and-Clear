import { subDays, format } from 'date-fns';

const CHICAGO_ODP_PERMITS = 'https://data.cityofchicago.org/resource/ydr8-5enu.json';

const APP_TOKEN = process.env.CHICAGO_ODP_APP_TOKEN ?? '';

export interface PermitEntry {
  id: string;
  issuedDate: string;
  workDescription: string;
  address: string;
  permitType: string;
  estimatedCost: number | null;
}

export interface PermitsResult {
  permits: PermitEntry[];
  windowDays: number;
  totalFound: number;
  dataAvailable: boolean;
}

const INDUSTRIAL_WORK_TYPES = [
  'INSTALL INDUSTRIAL EQUIPMENT',
  'NEW CONSTRUCTION',
  'RENOVATION/ALTERATION',
  'PAVING',
  'DEMOLITION',
];

export async function fetchPermits(communityAreaNumber: number): Promise<PermitsResult> {
  const thirtyDaysAgo = format(subDays(new Date(), 30), 'yyyy-MM-dd');

  const url = new URL(CHICAGO_ODP_PERMITS);
  url.searchParams.set(
    '$where',
    `issue_date >= '${thirtyDaysAgo}T00:00:00.000' AND community_area = '${communityAreaNumber}'`
  );
  url.searchParams.set('$limit', '10');
  url.searchParams.set(
    '$select',
    'permit_,issue_date,work_description,street_number,street_direction,street_name,suffix,permit_type,reported_cost'
  );
  url.searchParams.set('$order', 'issue_date DESC');
  if (APP_TOKEN) {
    url.searchParams.set('$$app_token', APP_TOKEN);
  }

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 86400 },
    });

    if (!res.ok) {
      return { permits: [], windowDays: 30, totalFound: 0, dataAvailable: false };
    }

    const raw: Record<string, string>[] = await res.json();

    const permits: PermitEntry[] = raw
      .filter((p) => {
        const workDesc = (p.work_description ?? '').toUpperCase();
        return INDUSTRIAL_WORK_TYPES.some((t) => workDesc.includes(t));
      })
      .map((p) => ({
        id: p.permit_ ?? '',
        issuedDate: p.issue_date ?? '',
        workDescription: truncate(p.work_description ?? 'Permit activity', 150),
        address: [p.street_number, p.street_direction, p.street_name, p.suffix]
          .filter(Boolean)
          .join(' '),
        permitType: p.permit_type ?? '',
        estimatedCost: p.reported_cost ? parseFloat(p.reported_cost) : null,
      }));

    return {
      permits,
      windowDays: 30,
      totalFound: permits.length,
      dataAvailable: true,
    };
  } catch {
    return { permits: [], windowDays: 30, totalFound: 0, dataAvailable: false };
  }
}

function truncate(str: string, maxLen: number): string {
  if (str.length <= maxLen) return str;
  return str.slice(0, maxLen - 3) + '...';
}
