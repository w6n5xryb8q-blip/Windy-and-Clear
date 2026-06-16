/**
 * OpenAQ v2 — raw pollutant concentration data for Chicago.
 * No API key required. Used as a secondary source for AQHI calculation.
 * https://docs.openaq.org/
 */

const OPENAQ_BASE = 'https://api.openaq.org/v2';

// Chicago city center — OpenAQ radius search covers the full metro
const CHICAGO_LAT = 41.8781;
const CHICAGO_LNG = -87.6298;
const RADIUS_METERS = 30000;

export interface OpenAQConcentrations {
  pm25: number | null; // µg/m³
  o3: number | null;   // µg/m³
  no2: number | null;  // µg/m³
  measuredAt: string | null;
  source: 'openaq';
}

interface OpenAQMeasurement {
  parameter: string;
  value: number;
  lastUpdated: string;
  unit: string;
}

interface OpenAQLocation {
  measurements: OpenAQMeasurement[];
}

export async function fetchConcentrationsOpenAQ(): Promise<OpenAQConcentrations> {
  const empty: OpenAQConcentrations = {
    pm25: null, o3: null, no2: null, measuredAt: null, source: 'openaq',
  };

  try {
    const url = new URL(`${OPENAQ_BASE}/latest`);
    url.searchParams.set('coordinates', `${CHICAGO_LAT},${CHICAGO_LNG}`);
    url.searchParams.set('radius', String(RADIUS_METERS));
    url.searchParams.append('parameter', 'pm25');
    url.searchParams.append('parameter', 'o3');
    url.searchParams.append('parameter', 'no2');
    url.searchParams.set('limit', '20');
    url.searchParams.set('order_by', 'lastUpdated');
    url.searchParams.set('sort', 'desc');

    const res = await fetch(url.toString(), {
      headers: { 'Accept': 'application/json' },
      next: { revalidate: 3300 },
    });

    if (!res.ok) return empty;

    const data: { results: OpenAQLocation[] } = await res.json();
    if (!data.results?.length) return empty;

    // Collect the most recent value per parameter across all nearby stations
    const best: Record<string, { value: number; updatedAt: string }> = {};

    for (const location of data.results) {
      for (const m of location.measurements) {
        const key = m.parameter.toLowerCase();
        if (!['pm25', 'o3', 'no2'].includes(key)) continue;
        if (m.value < 0) continue; // filter sentinel values

        const existing = best[key];
        if (!existing || m.lastUpdated > existing.updatedAt) {
          best[key] = { value: m.value, updatedAt: m.lastUpdated };
        }
      }
    }

    // O3 from OpenAQ is reported in µg/m³ for US stations
    return {
      pm25: best['pm25']?.value ?? null,
      o3:   best['o3']?.value  ?? null,
      no2:  best['no2']?.value ?? null,
      measuredAt: best['pm25']?.updatedAt
        ?? best['o3']?.updatedAt
        ?? best['no2']?.updatedAt
        ?? null,
      source: 'openaq',
    };
  } catch {
    return empty;
  }
}
