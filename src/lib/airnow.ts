import { airnowCategoryToAqiCategory, maxCategory, type AqiCategory } from './aqi-utils';
import { calculateAqhi, type AqhiResult } from './aqhi';

const AIRNOW_BASE = 'https://www.airnowapi.org/aq/observation/zipCode/current/';

export interface PollutantReading {
  parameterName: string;
  aqi: number;
  category: AqiCategory;
  categoryNumber: number;
}

export interface AirQualityResult {
  zip: string;
  observedAt: string | null;
  overallCategory: AqiCategory;
  overallAqi: number;
  pollutants: PollutantReading[];
  dataAvailable: boolean;
  stale?: boolean;
  aqhi: AqhiResult | null;
}

interface AirNowObservation {
  DateObserved: string;
  HourObserved: number;
  LocalTimeZone: string;
  ReportingArea: string;
  StateCode: string;
  Latitude: number;
  Longitude: number;
  ParameterName: string;
  AQI: number;
  Category: {
    Number: number;
    Name: string;
  };
}

const MOCK_DATA: AirNowObservation[] = [
  {
    DateObserved: new Date().toISOString().split('T')[0],
    HourObserved: new Date().getHours(),
    LocalTimeZone: 'CST',
    ReportingArea: 'Chicago',
    StateCode: 'IL',
    Latitude: 41.85,
    Longitude: -87.65,
    ParameterName: 'PM2.5',
    AQI: 68,
    Category: { Number: 2, Name: 'Moderate' },
  },
  {
    DateObserved: new Date().toISOString().split('T')[0],
    HourObserved: new Date().getHours(),
    LocalTimeZone: 'CST',
    ReportingArea: 'Chicago',
    StateCode: 'IL',
    Latitude: 41.85,
    Longitude: -87.65,
    ParameterName: 'Ozone',
    AQI: 42,
    Category: { Number: 1, Name: 'Good' },
  },
];

export async function fetchAirQuality(zip: string): Promise<AirQualityResult> {
  if (process.env.AIRNOW_MOCK === 'true') {
    return buildResult(zip, MOCK_DATA);
  }

  const apiKey = process.env.AIRNOW_API_KEY;
  if (!apiKey) {
    throw new Error('AIRNOW_API_KEY is not configured');
  }

  const url = new URL(AIRNOW_BASE);
  url.searchParams.set('format', 'application/json');
  url.searchParams.set('zipCode', zip);
  url.searchParams.set('distance', '25');
  url.searchParams.set('API_KEY', apiKey);

  try {
    const res = await fetch(url.toString(), {
      next: { revalidate: 3300 },
    });

    if (!res.ok) {
      return noDataResult(zip);
    }

    const observations: AirNowObservation[] = await res.json();

    if (!observations || observations.length === 0) {
      const wider = new URL(AIRNOW_BASE);
      wider.searchParams.set('format', 'application/json');
      wider.searchParams.set('zipCode', zip);
      wider.searchParams.set('distance', '50');
      wider.searchParams.set('API_KEY', apiKey);

      const res2 = await fetch(wider.toString(), { next: { revalidate: 3300 } });
      if (!res2.ok) return noDataResult(zip);

      const obs2: AirNowObservation[] = await res2.json();
      if (!obs2 || obs2.length === 0) return noDataResult(zip);
      return buildResult(zip, obs2);
    }

    return buildResult(zip, observations);
  } catch {
    return noDataResult(zip);
  }
}

function buildResult(zip: string, observations: AirNowObservation[]): AirQualityResult {
  const pollutants: PollutantReading[] = observations.map((o) => ({
    parameterName: o.ParameterName,
    aqi: o.AQI,
    category: airnowCategoryToAqiCategory(o.Category.Name),
    categoryNumber: o.Category.Number,
  }));

  const categories = pollutants.map((p) => p.category);
  const overallCategory = maxCategory(categories);
  const overallAqi = Math.max(...pollutants.map((p) => p.aqi));

  const first = observations[0];
  let observedAt: string | null = null;
  if (first) {
    try {
      observedAt = new Date(
        `${first.DateObserved.trim()}T${String(first.HourObserved).padStart(2, '0')}:00:00`
      ).toISOString();
    } catch {
      observedAt = null;
    }
  }

  return {
    zip,
    observedAt,
    overallCategory,
    overallAqi,
    pollutants,
    dataAvailable: true,
    aqhi: calculateAqhi(pollutants),
  };
}

function noDataResult(zip: string): AirQualityResult {
  return {
    zip,
    observedAt: null,
    overallCategory: 'unknown',
    overallAqi: 0,
    pollutants: [],
    dataAvailable: false,
    aqhi: null,
  };
}
