export type AqiCategory =
  | 'good'
  | 'moderate'
  | 'usg'
  | 'unhealthy'
  | 'veryUnhealthy'
  | 'hazardous'
  | 'unknown';

export interface AqiMeta {
  category: AqiCategory;
  colorHex: string;
  tailwindBg: string;
  tailwindBorder: string;
  tailwindText: string;
  dotColor: string;
}

export function aqiToCategory(aqi: number): AqiCategory {
  if (aqi <= 50) return 'good';
  if (aqi <= 100) return 'moderate';
  if (aqi <= 150) return 'usg';
  if (aqi <= 200) return 'unhealthy';
  if (aqi <= 300) return 'veryUnhealthy';
  return 'hazardous';
}

export function airnowCategoryToAqiCategory(airnowCategory: string): AqiCategory {
  const c = airnowCategory.toLowerCase();
  if (c.includes('good')) return 'good';
  if (c.includes('moderate')) return 'moderate';
  if (c.includes('sensitive') || c === 'usg') return 'usg';
  if (c.includes('very unhealthy') || c.includes('very_unhealthy')) return 'veryUnhealthy';
  if (c.includes('unhealthy')) return 'unhealthy';
  if (c.includes('hazardous')) return 'hazardous';
  return 'unknown';
}

const META: Record<AqiCategory, AqiMeta> = {
  good: {
    category: 'good',
    colorHex: '#22c55e',
    tailwindBg: 'bg-green-100',
    tailwindBorder: 'border-green-500',
    tailwindText: 'text-green-800',
    dotColor: '#22c55e',
  },
  moderate: {
    category: 'moderate',
    colorHex: '#eab308',
    tailwindBg: 'bg-yellow-100',
    tailwindBorder: 'border-yellow-500',
    tailwindText: 'text-yellow-800',
    dotColor: '#eab308',
  },
  usg: {
    category: 'usg',
    colorHex: '#f97316',
    tailwindBg: 'bg-orange-100',
    tailwindBorder: 'border-orange-500',
    tailwindText: 'text-orange-800',
    dotColor: '#f97316',
  },
  unhealthy: {
    category: 'unhealthy',
    colorHex: '#ef4444',
    tailwindBg: 'bg-red-100',
    tailwindBorder: 'border-red-500',
    tailwindText: 'text-red-800',
    dotColor: '#ef4444',
  },
  veryUnhealthy: {
    category: 'veryUnhealthy',
    colorHex: '#a855f7',
    tailwindBg: 'bg-purple-100',
    tailwindBorder: 'border-purple-500',
    tailwindText: 'text-purple-800',
    dotColor: '#a855f7',
  },
  hazardous: {
    category: 'hazardous',
    colorHex: '#7f1d1d',
    tailwindBg: 'bg-red-950',
    tailwindBorder: 'border-red-900',
    tailwindText: 'text-red-100',
    dotColor: '#7f1d1d',
  },
  unknown: {
    category: 'unknown',
    colorHex: '#9ca3af',
    tailwindBg: 'bg-gray-100',
    tailwindBorder: 'border-gray-400',
    tailwindText: 'text-gray-600',
    dotColor: '#9ca3af',
  },
};

export function getAqiMeta(category: AqiCategory): AqiMeta {
  return META[category];
}

export function maxCategory(categories: AqiCategory[]): AqiCategory {
  const order: AqiCategory[] = ['hazardous', 'veryUnhealthy', 'unhealthy', 'usg', 'moderate', 'good', 'unknown'];
  for (const cat of order) {
    if (categories.includes(cat)) return cat;
  }
  return 'unknown';
}

export function isAlertLevel(category: AqiCategory): boolean {
  return ['unhealthy', 'veryUnhealthy', 'hazardous'].includes(category);
}
