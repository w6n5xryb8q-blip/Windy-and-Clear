/**
 * Unified concentration fetcher for AQHI calculation.
 *
 * Priority:
 *   1. AirNow /aq/data/ — raw measured concentrations (requires AIRNOW_API_KEY)
 *   2. OpenAQ v2         — open, no key required
 *
 * Both sources are independent of the EPA AQI pipeline in airnow.ts.
 * Returns null if neither source has data.
 */

import { fetchRawConcentrations, type AirNowConcentrations } from './airnow-data';
import { fetchConcentrationsOpenAQ, type OpenAQConcentrations } from './openaq';
import { calculateAqhiFromConcentrations, type AqhiResult } from './aqhi';

export type ConcentrationSource = 'airnow-data' | 'openaq' | 'none';

export interface ConcentrationResult {
  pm25: number | null;
  o3: number | null;
  no2: number | null;
  measuredAt: string | null;
  source: ConcentrationSource;
  aqhi: AqhiResult | null;
}

// Mock concentrations for local dev (AIRNOW_MOCK=true)
// PM2.5=12 µg/m³ + O3=60 µg/m³ → AQHI ≈ 3 (Low Risk)
const MOCK_CONCS = { pm25: 12.0, o3: 60.0, no2: null };
const MOCK_AQHI  = calculateAqhiFromConcentrations(MOCK_CONCS);
const MOCK_CONCENTRATIONS: ConcentrationResult = {
  ...MOCK_CONCS,
  measuredAt: null,
  source: 'airnow-data',
  aqhi: MOCK_AQHI.pollutantsUsed.length > 0 ? MOCK_AQHI : null,
};

export async function fetchConcentrationsForAqhi(): Promise<ConcentrationResult> {
  if (process.env.AIRNOW_MOCK === 'true') return MOCK_CONCENTRATIONS;

  // Run both in parallel — use AirNow if it has data, otherwise OpenAQ
  const [airnow, openaq] = await Promise.all([
    fetchRawConcentrations(),
    fetchConcentrationsOpenAQ(),
  ]);

  const hasAirNow = airnow.pm25 !== null || airnow.o3 !== null || airnow.no2 !== null;
  const hasOpenAQ = openaq.pm25 !== null || openaq.o3 !== null || openaq.no2 !== null;

  let chosen: AirNowConcentrations | OpenAQConcentrations | null = null;

  if (hasAirNow) {
    chosen = airnow;
  } else if (hasOpenAQ) {
    chosen = openaq;
  }

  if (!chosen) {
    return { pm25: null, o3: null, no2: null, measuredAt: null, source: 'none', aqhi: null };
  }

  const aqhi = calculateAqhiFromConcentrations({
    pm25: chosen.pm25,
    o3:   chosen.o3,
    no2:  chosen.no2,
  });

  return {
    pm25:       chosen.pm25,
    o3:         chosen.o3,
    no2:        chosen.no2,
    measuredAt: chosen.measuredAt,
    source:     chosen.source,
    aqhi:       aqhi.pollutantsUsed.length > 0 ? aqhi : null,
  };
}
