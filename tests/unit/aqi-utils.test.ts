import { describe, it, expect } from 'vitest';
import {
  aqiToCategory,
  airnowCategoryToAqiCategory,
  getAqiMeta,
  maxCategory,
  isAlertLevel,
  type AqiCategory,
} from '@/lib/aqi-utils';

describe('aqiToCategory', () => {
  it('returns good for 0–50', () => {
    expect(aqiToCategory(0)).toBe('good');
    expect(aqiToCategory(50)).toBe('good');
  });
  it('returns moderate for 51–100', () => {
    expect(aqiToCategory(51)).toBe('moderate');
    expect(aqiToCategory(100)).toBe('moderate');
  });
  it('returns usg for 101–150', () => {
    expect(aqiToCategory(101)).toBe('usg');
    expect(aqiToCategory(150)).toBe('usg');
  });
  it('returns unhealthy for 151–200', () => {
    expect(aqiToCategory(151)).toBe('unhealthy');
    expect(aqiToCategory(200)).toBe('unhealthy');
  });
  it('returns veryUnhealthy for 201–300', () => {
    expect(aqiToCategory(201)).toBe('veryUnhealthy');
    expect(aqiToCategory(300)).toBe('veryUnhealthy');
  });
  it('returns hazardous for 301+', () => {
    expect(aqiToCategory(301)).toBe('hazardous');
    expect(aqiToCategory(500)).toBe('hazardous');
  });
});

describe('airnowCategoryToAqiCategory', () => {
  it('maps Good', () => expect(airnowCategoryToAqiCategory('Good')).toBe('good'));
  it('maps Moderate', () => expect(airnowCategoryToAqiCategory('Moderate')).toBe('moderate'));
  it('maps Unhealthy for Sensitive Groups', () => {
    expect(airnowCategoryToAqiCategory('Unhealthy for Sensitive Groups')).toBe('usg');
  });
  it('maps Very Unhealthy', () => expect(airnowCategoryToAqiCategory('Very Unhealthy')).toBe('veryUnhealthy'));
  it('maps Unhealthy (not very)', () => expect(airnowCategoryToAqiCategory('Unhealthy')).toBe('unhealthy'));
  it('maps Hazardous', () => expect(airnowCategoryToAqiCategory('Hazardous')).toBe('hazardous'));
  it('maps unknown strings to unknown', () => expect(airnowCategoryToAqiCategory('Fog')).toBe('unknown'));
});

describe('getAqiMeta', () => {
  it('returns meta with correct colorHex for good', () => {
    const meta = getAqiMeta('good');
    expect(meta.colorHex).toBe('#22c55e');
    expect(meta.tailwindBg).toContain('green');
  });

  it('returns meta with correct colorHex for hazardous', () => {
    const meta = getAqiMeta('hazardous');
    expect(meta.colorHex).toBe('#7f1d1d');
  });

  it('returns meta for every valid category', () => {
    const categories: AqiCategory[] = ['good', 'moderate', 'usg', 'unhealthy', 'veryUnhealthy', 'hazardous', 'unknown'];
    for (const cat of categories) {
      const meta = getAqiMeta(cat);
      expect(meta.category).toBe(cat);
      expect(meta.colorHex).toBeTruthy();
    }
  });
});

describe('maxCategory', () => {
  it('returns the worst category in the list', () => {
    expect(maxCategory(['good', 'moderate', 'unhealthy'])).toBe('unhealthy');
    expect(maxCategory(['good', 'hazardous', 'veryUnhealthy'])).toBe('hazardous');
    expect(maxCategory(['good'])).toBe('good');
    expect(maxCategory([])).toBe('unknown');
  });

  it('prefers hazardous over veryUnhealthy', () => {
    expect(maxCategory(['veryUnhealthy', 'hazardous'])).toBe('hazardous');
  });
});

describe('isAlertLevel', () => {
  it('returns true for unhealthy categories', () => {
    expect(isAlertLevel('unhealthy')).toBe(true);
    expect(isAlertLevel('veryUnhealthy')).toBe(true);
    expect(isAlertLevel('hazardous')).toBe(true);
  });

  it('returns false for non-alert categories', () => {
    expect(isAlertLevel('good')).toBe(false);
    expect(isAlertLevel('moderate')).toBe(false);
    expect(isAlertLevel('usg')).toBe(false);
    expect(isAlertLevel('unknown')).toBe(false);
  });
});
