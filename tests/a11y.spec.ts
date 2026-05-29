import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  const results = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa'])
    .analyze();
  expect(results.violations).toEqual([]);
});

test('all sections have accessible headings', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('h1')).toBeVisible();
  await expect(page.locator('h2')).toHaveCount(3);
});

test('contact form fields are present', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
  await expect(page.locator('#contact label').first()).toBeVisible();
  await expect(page.locator('#contact input[type="text"]')).toBeVisible();
  await expect(page.locator('#contact input[type="email"]')).toBeVisible();
  await expect(page.locator('#contact textarea')).toBeVisible();
});
