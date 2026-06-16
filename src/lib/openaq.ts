/**
 * OpenAQ v3 — raw pollutant concentration data for Chicago.
 * Requires OPENAQ_API_KEY (free at openaq.org).
 * Used as fallback when AirNow /aq/data/ is unavailable.
 *
 * Strategy: query locations within 30 km of Chicago center, collect the
 * most recent reading per parameter across all nearby stations.
 *
 * https://api.openaq.org/v3/
 */

const OPENAQ_V3 = 'https://api.openaq.org/v3';

const CHICAGO_LAT = 41.8781;
const CHICAGO_LNG = -87.6298;
const RADIUS_METERS = 30000;

// Unit conversion at 25 °C, 1 atm
const O3_PPB_TO_UGM3  = 48 / 24.45;
const NO2_PPB_TO_UGM3 = 46 / 24.45;

export interface OpenAQConcentrations {
  pm25: number | null; // µg/m³
  o3:   number | null; // µg/m³
  no2:  number | null; // µg/m³
  measuredAt: string | null;
  source: 'openaq';
}

interface V3Sensor {
  id: number;
  parameter: {
    name: string;  // 'pm25' | 'o3' | 'no2' | ...
    units: string; // 'µg/m³' | 'ppb' | ...
  };
  lastValue:   number | null;
  lastUpdated: string | null;
}

interface V3Location {
  id: number;
  sensors: V3Sensor[];
}

interface V3Response {
  results: V3Location[];
}

function normalizeToUgM3(value: number, unit: string, param: string): number {
  const u = unit.toLowerCase().replace(/\s/g, '');
  if (u === 'µg/m³' || u === 'ug/m3') return value;
  if (u === 'ppb') {
    if (param === 'o3')  return value * O3_PPB_TO_UGM3;
    if (param === 'no2') return value * NO2_PPB_TO_UGM3;
  }
  return value;
}

export async function fetchConcentrationsOpenAQ(): Promise<OpenAQConcentrations> {
  const empty: OpenAQConcentrations = {
    pm25: null, o3: null, no2: null, measuredAt: null, source: 'openaq',
  };

  const apiKey = process.env.OPENAQ_API_KEY;
  if (!apiKey) return empty;

  try {
    const url = new URL(`${OPENAQ_V3}/locations`);
    url.searchParams.set('coordinates', `${CHICAGO_LAT},${CHICAGO_LNG}`);
    url.searchParams.set('radius',      String(RADIUS_METERS));
    url.searchParams.set('limit',       '20');
    url.searchParams.set('order_by',    'distance');

    const res = await fetch(url.toString(), {
      headers: {
        'X-API-Key': apiKey,
        'Accept':    'application/json',
      },
      next: { revalidate: 3300 },
    });

    if (!res.ok) return empty;

    const data: V3Response = await res.json();
    if (!data.results?.length) return empty;

    // Collect the most recent valid reading per parameter
    const best: Record<string, { value: number; updatedAt: string }> = {};

    for (const location of data.results) {
      for (const sensor of location.sensors ?? []) {
        const param = sensor.parameter?.name?.toLowerCase();
        if (!['pm25', 'o3', 'no2'].includes(param)) continue;
        if (sensor.lastValue == null || sensor.lastValue < 0) continue;
        if (!sensor.lastUpdated) continue;

        const existing = best[param];
        if (!existing || sensor.lastUpdated > existing.updatedAt) {
          best[param] = {
            value:     normalizeToUgM3(sensor.lastValue, sensor.parameter.units ?? 'µg/m³', param),
            updatedAt: sensor.lastUpdated,
          };
        }
      }
    }

    const latestAt = best['pm25']?.updatedAt ?? best['o3']?.updatedAt ?? best['no2']?.updatedAt ?? null;

    return {
      pm25:       best['pm25']?.value ?? null,
      o3:         best['o3']?.value   ?? null,
      no2:        best['no2']?.value  ?? null,
      measuredAt: latestAt,
      source:     'openaq',
    };
  } catch {
    return empty;
  }
}
