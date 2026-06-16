/**
 * AirNow /aq/data/ endpoint — returns raw measured concentrations (µg/m³, ppb).
 * Independent of the zip-based AQI endpoint in airnow.ts.
 * Used as the primary source for AQHI calculation.
 *
 * Docs: https://docs.airnowapi.org/Data/query
 */

const AIRNOW_DATA_BASE = 'https://www.airnowapi.org/aq/data/';

// Chicago metro bounding box (west, south, east, north)
const CHICAGO_BBOX = '-88.0,41.6,-87.4,42.1';

export interface AirNowConcentrations {
  pm25: number | null; // µg/m³
  o3: number | null;   // µg/m³ (converted from ppb)
  no2: number | null;  // µg/m³ (converted from ppb)
  measuredAt: string | null;
  source: 'airnow-data';
}

interface AirNowDataRecord {
  Parameter: string;
  Value: number;
  Unit: string;
  UTC: string;
  AQI: number;
  Category: number;
  SiteName: string;
}

// Unit conversions at 25 °C, 1 atm
const O3_PPB_TO_UGM3  = 48 / 24.45;
const NO2_PPB_TO_UGM3 = 46 / 24.45;

function toUgM3(value: number, unit: string, parameter: string): number {
  const u = unit.toLowerCase();
  if (u === 'ug/m3' || u === 'µg/m³') return value;
  if (u === 'ppb') {
    if (parameter.toLowerCase().includes('ozone')) return value * O3_PPB_TO_UGM3;
    if (parameter.toLowerCase().includes('no2'))   return value * NO2_PPB_TO_UGM3;
  }
  return value; // best-effort if unit is unknown
}

export async function fetchRawConcentrations(): Promise<AirNowConcentrations> {
  const empty: AirNowConcentrations = {
    pm25: null, o3: null, no2: null, measuredAt: null, source: 'airnow-data',
  };

  const apiKey = process.env.AIRNOW_API_KEY;
  if (!apiKey) return empty;

  // Request the last 2 hours; use the most recent observation per parameter
  const now   = new Date();
  const start = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  const fmt = (d: Date) =>
    `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}T${String(d.getUTCHours()).padStart(2, '0')}`;

  try {
    const url = new URL(AIRNOW_DATA_BASE);
    url.searchParams.set('startDate', fmt(start));
    url.searchParams.set('endDate',   fmt(now));
    url.searchParams.set('parameters', 'PM25,OZONE,NO2');
    url.searchParams.set('BBOX',       CHICAGO_BBOX);
    url.searchParams.set('dataType',   'C'); // concentrations
    url.searchParams.set('format',     'application/json');
    url.searchParams.set('verbose',    '0');
    url.searchParams.set('API_KEY',    apiKey);

    const res = await fetch(url.toString(), { next: { revalidate: 3300 } });
    if (!res.ok) return empty;

    const records: AirNowDataRecord[] = await res.json();
    if (!records?.length) return empty;

    // Keep the most recent valid reading per parameter
    const best: Record<string, { value: number; utc: string }> = {};

    for (const r of records) {
      if (r.Value < 0) continue;
      const key = r.Parameter.toLowerCase().replace(/[.\s_-]/g, '');
      const normKey = key === 'pm25' ? 'pm25'
        : key === 'ozone' ? 'o3'
        : key === 'no2' ? 'no2'
        : null;
      if (!normKey) continue;

      const existing = best[normKey];
      if (!existing || r.UTC > existing.utc) {
        best[normKey] = {
          value: toUgM3(r.Value, r.Unit, r.Parameter),
          utc: r.UTC,
        };
      }
    }

    return {
      pm25: best['pm25']?.value ?? null,
      o3:   best['o3']?.value  ?? null,
      no2:  best['no2']?.value ?? null,
      measuredAt: best['pm25']?.utc ?? best['o3']?.utc ?? best['no2']?.utc ?? null,
      source: 'airnow-data',
    };
  } catch {
    return empty;
  }
}
