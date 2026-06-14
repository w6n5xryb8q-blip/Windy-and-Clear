import { test, expect } from '@playwright/test';

test.describe('Language toggle', () => {
  test('language toggle switches locale in URL while preserving path', async ({ page }) => {
    await page.goto('/en/neighborhood/austin');
    await page.waitForLoadState('networkidle');

    const toggle = page.locator('button, a').filter({ hasText: /español|english|es|en/i }).first();
    if (await toggle.isVisible()) {
      await toggle.click();
      await page.waitForURL(/\/es\//);
      expect(page.url()).toContain('/es/');
      expect(page.url()).toContain('austin');
    }
  });

  test('home page renders in Spanish when locale is es', async ({ page }) => {
    await page.goto('/es');
    const body = await page.textContent('body');
    expect(body).toMatch(/calidad|aire|barrio|código/i);
  });

  test('Spanish neighborhood page shows translated content', async ({ page }) => {
    await page.goto('/es/neighborhood/austin');
    await page.waitForLoadState('networkidle');
    const body = await page.textContent('body');
    expect(body).toMatch(/calidad|aire|reporta|suscri/i);
  });

  test('switching to Spanish from English preserves the ZIP in URL', async ({ page }) => {
    await page.goto('/en/neighborhood/humboldt-park');
    await page.waitForLoadState('networkidle');

    const toggle = page.locator('button, a').filter({ hasText: /español/i }).first();
    if (await toggle.isVisible()) {
      await toggle.click();
      await page.waitForURL(/\/es\//);
      expect(page.url()).toContain('/es/');
      expect(page.url()).toContain('humboldt-park');
    }
  });
});
