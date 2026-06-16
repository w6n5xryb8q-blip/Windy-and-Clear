/**
 * Canadian Air Quality Health Index (AQHI) — WHO-endorsed methodology
 *
 * Formula: AQHI = (1000/10.4) × [(e^(0.000871 × NO₂) − 1)
 *                               + (e^(0.000537 × O₃) − 1)
 *                               + (e^(0.000487 × PM₂.₅) − 1)]
 *
 * Concentrations must be in µg/m³.
 * Source: Health Canada / Environment Canada (2008); WHO Regional Office for
 * Europe, "Air quality indexes: key considerations and roadmaps for best
 * practices" (2026).
 *
 * AirNow supplies AQI values, not raw concentrations, so we reverse each
 * pollutant's AQI back to µg/m³ using the EPA's published piecewise-linear
 * breakpoint tables before applying the formula.
 */

// Each row: [aqiLow, aqiHigh, concLow, concHigh]
type Breakpoint = readonly [number, number, number, number];

const PM25_BP: readonly Breakpoint[] = [
  [0,   50,  0.0,   12.0],
  [51,  100, 12.1,  35.4],
  [101, 150, 35.5,  55.4],
  [151, 200, 55.5,  150.4],
  [201, 300, 150.5, 250.4],
  [301, 400, 250.5, 350.4],
  [401, 500, 350.5, 500.4],
] as const;

// 8-hour average in ppb; for AQI 301+ EPA uses the 1-hour standard
const O3_BP: readonly Breakpoint[] = [
  [0,   50,  0,   54],
  [51,  100, 55,  70],
  [101, 150, 71,  85],
  [151, 200, 86,  105],
  [201, 300, 106, 200],
  [301, 500, 201, 604],
] as const;

// Annual standard breakpoints in ppb
const NO2_BP: readonly Breakpoint[] = [
  [0,   50,  0,    53],
  [51,  100, 54,   100],
  [101, 150, 101,  360],
  [151, 200, 361,  649],
  [201, 300, 650,  1249],
  [301, 400, 1250, 1649],
  [401, 500, 1650, 2049],
] as const;

function reverseAqi(aqi: number, bp: readonly Breakpoint[]): number {
  const v = Math.max(0, Math.min(aqi, 500));
  for (const [lo, hi, clo, chi] of bp) {
    if (v >= lo && v <= hi) {
      return ((v - lo) / (hi - lo)) * (chi - clo) + clo;
    }
  }
  return bp[bp.length - 1][3];
}

// Unit conversion at 25 °C, 1 atm (standard conditions used by Health Canada)
// O₃:  1 ppb = 48/24.45 µg/m³
// NO₂: 1 ppb = 46/24.45 µg/m³
const O3_TO_UGM3  = 48 / 24.45;
const NO2_TO_UGM3 = 46 / 24.45;

export type AqhiCategory = 'low' | 'moderate' | 'high' | 'veryHigh';

export interface AqhiResult {
  score: number;        // integer 1–11; 11 represents "10+"
  display: string;      // "3" or "10+"
  category: AqhiCategory;
  pollutantsUsed: string[];
}

export function calculateAqhi(
  pollutants: { parameterName: string; aqi: number }[]
): AqhiResult {
  let pm25 = 0;
  let o3   = 0;
  let no2  = 0;
  const used: string[] = [];

  for (const p of pollutants) {
    const name = p.parameterName.toLowerCase().replace(/[.\s_-]/g, '');
    if (name === 'pm25') {
      const conc = reverseAqi(p.aqi, PM25_BP);          // already µg/m³
      pm25 = Math.exp(0.000487 * conc) - 1;
      used.push('PM2.5');
    } else if (name === 'ozone' || name === 'o3') {
      const ppb  = reverseAqi(p.aqi, O3_BP);
      const conc = ppb * O3_TO_UGM3;
      o3 = Math.exp(0.000537 * conc) - 1;
      used.push('O₃');
    } else if (name === 'no2' || name === 'nitrogendioxide') {
      const ppb  = reverseAqi(p.aqi, NO2_BP);
      const conc = ppb * NO2_TO_UGM3;
      no2 = Math.exp(0.000871 * conc) - 1;
      used.push('NO₂');
    }
  }

  const raw   = (1000 / 10.4) * (no2 + o3 + pm25);
  const score = Math.max(1, Math.min(Math.round(raw), 11));

  return {
    score,
    display:        score >= 11 ? '10+' : String(score),
    category:       aqhiToCategory(score),
    pollutantsUsed: used,
  };
}

export function aqhiToCategory(score: number): AqhiCategory {
  if (score <= 3)  return 'low';
  if (score <= 6)  return 'moderate';
  if (score <= 10) return 'high';
  return 'veryHigh';
}

export interface AqhiMeta {
  colorHex:      string;
  labelEn:       string;
  labelEs:       string;
  headlineEn:    string;
  headlineEs:    string;
  tailwindText:  string;
  tailwindBorder: string;
}

export const AQHI_META: Record<AqhiCategory, AqhiMeta> = {
  low: {
    colorHex:       '#22c55e',
    labelEn:        'Low Risk',
    labelEs:        'Riesgo Bajo',
    headlineEn:     'Air quality poses a low health risk today.',
    headlineEs:     'La calidad del aire representa un riesgo bajo para la salud hoy.',
    tailwindText:   'text-green-700',
    tailwindBorder: 'border-green-500',
  },
  moderate: {
    colorHex:       '#eab308',
    labelEn:        'Moderate Risk',
    labelEs:        'Riesgo Moderado',
    headlineEn:     'Moderate health risk — people with lung or heart conditions should limit outdoor time.',
    headlineEs:     'Riesgo moderado para la salud — personas con condiciones pulmonares o cardíacas deben limitar el tiempo al aire libre.',
    tailwindText:   'text-yellow-700',
    tailwindBorder: 'border-yellow-500',
  },
  high: {
    colorHex:       '#ef4444',
    labelEn:        'High Risk',
    labelEs:        'Riesgo Alto',
    headlineEn:     'High health risk. Reduce outdoor activity and keep windows closed.',
    headlineEs:     'Riesgo alto para la salud. Reduce las actividades al aire libre y mantén las ventanas cerradas.',
    tailwindText:   'text-red-700',
    tailwindBorder: 'border-red-500',
  },
  veryHigh: {
    colorHex:       '#7f1d1d',
    labelEn:        'Very High Risk',
    labelEs:        'Riesgo Muy Alto',
    headlineEn:     'Very high health risk. Stay indoors — this is a health emergency.',
    headlineEs:     'Riesgo muy alto para la salud. Quédate en casa — esto es una emergencia de salud.',
    tailwindText:   'text-red-950',
    tailwindBorder: 'border-red-900',
  },
};
