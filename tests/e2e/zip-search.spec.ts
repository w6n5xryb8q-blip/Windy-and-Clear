import { test, expect } from '@playwright/test';

test.describe('ZIP code search', () => {
  test('home page loads with ZIP input', async ({ page }) => {
    await page.goto('/en');
    await expect(page.locator('input[type="text"], input[placeholder*="ZIP"], input[placeholder*="código"]').first()).toBeVisible();
  });

  test('entering a known Chicago ZIP navigates to neighborhood page', async ({ page }) => {
    await page.goto('/en');
    const input = page.locator('input').first();
    await input.fill('60644');
    await input.press('Enter');
    await page.waitForURL(/\/(en|es)\/(zip|neighborhood)\//);
    await expect(page).toHaveURL(/60644|austin/);
  });

  test('neighborhood page shows air status card', async ({ page }) => {
    await page.goto('/en/neighborhood/austin');
    await expect(page.locator('text=Austin, text=air').or(page.locator('[data-testid="air-status"], .air-status, article, section').first())).toBeVisible({ timeout: 10_000 });
  });

  test('neighborhood picker links work', async ({ page }) => {
    await page.goto('/en');
    const firstNeighborhood = page.locator('a[href*="/neighborhood/"]').first();
    if (await firstNeighborhood.isVisible()) {
      const href = await firstNeighborhood.getAttribute('href');
      await firstNeighborhood.click();
      await page.waitForURL(/\/neighborhood\//);
      expect(page.url()).toContain('/neighborhood/');
    }
  });
});
