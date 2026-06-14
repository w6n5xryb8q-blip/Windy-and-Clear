import { describe, it, expect } from 'vitest';
import { neighborhoods, getNeighborhoodBySlug, getNeighborhoodByZip } from '@/data/neighborhoods';

describe('neighborhoods dataset', () => {
  it('has 72 community areas', () => {
    expect(neighborhoods.length).toBe(72);
  });

  it('every neighborhood has required fields', () => {
    for (const n of neighborhoods) {
      expect(n.slug, `${n.name} missing slug`).toBeTruthy();
      expect(n.name, `slug ${n.slug} missing name`).toBeTruthy();
      expect(n.nameEs, `slug ${n.slug} missing nameEs`).toBeTruthy();
      expect(n.communityAreaNumber, `slug ${n.slug} missing area number`).toBeGreaterThan(0);
      expect(n.primaryZip, `slug ${n.slug} missing primaryZip`).toMatch(/^\d{5}$/);
      expect(Array.isArray(n.allZips)).toBe(true);
      expect(n.allZips.length).toBeGreaterThan(0);
    }
  });

  it('slugs are unique', () => {
    const slugs = neighborhoods.map((n) => n.slug);
    const unique = new Set(slugs);
    expect(unique.size).toBe(slugs.length);
  });

  it('communityAreaNumbers are unique', () => {
    const areas = neighborhoods.map((n) => n.communityAreaNumber);
    const unique = new Set(areas);
    expect(unique.size).toBe(areas.length);
  });

  it('has exactly 13 EJ neighborhoods', () => {
    const ejCount = neighborhoods.filter((n) => n.isEj).length;
    expect(ejCount).toBe(13);
  });

  it('known EJ neighborhoods are marked correctly', () => {
    const ejSlugs = [
      'austin', 'east-garfield-park', 'englewood', 'humboldt-park',
      'lower-west-side', 'mckinley-park', 'new-city', 'north-lawndale',
      'roseland', 'south-deering', 'south-lawndale', 'west-englewood',
      'west-garfield-park',
    ];
    for (const slug of ejSlugs) {
      const hood = neighborhoods.find((n) => n.slug === slug);
      expect(hood, `EJ neighborhood ${slug} not found`).toBeDefined();
      expect(hood!.isEj, `${slug} should be isEj=true`).toBe(true);
    }
  });
});

describe('getNeighborhoodBySlug', () => {
  it('finds a neighborhood by slug', () => {
    const hood = getNeighborhoodBySlug('austin');
    expect(hood).toBeDefined();
    expect(hood!.name).toBe('Austin');
    expect(hood!.isEj).toBe(true);
  });

  it('returns undefined for unknown slug', () => {
    expect(getNeighborhoodBySlug('not-a-real-place')).toBeUndefined();
  });
});

describe('getNeighborhoodByZip', () => {
  it('finds a neighborhood by primary ZIP', () => {
    const hood = getNeighborhoodByZip('60644');
    expect(hood).toBeDefined();
    expect(hood!.slug).toBe('austin');
  });

  it('finds a neighborhood by secondary ZIP', () => {
    const austin = neighborhoods.find((n) => n.slug === 'austin')!;
    for (const zip of austin.allZips) {
      const found = getNeighborhoodByZip(zip);
      expect(found, `ZIP ${zip} should resolve to a neighborhood`).toBeDefined();
    }
  });

  it('returns undefined for unknown ZIP', () => {
    expect(getNeighborhoodByZip('00000')).toBeUndefined();
  });
});
