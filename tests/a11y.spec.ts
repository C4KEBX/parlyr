import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('homepage has no accessibility violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('all sections have accessible headings', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero-heading')).toBeVisible();
  await expect(page.locator('#services-heading')).toBeVisible();
  await expect(page.locator('#why-heading')).toBeAttached(); // sr-only, not visible
  await expect(page.locator('#contact-heading')).toBeVisible();
});

test('contact form labels are associated with inputs', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('label[for="name"]')).toBeVisible();
  await expect(page.locator('label[for="email"]')).toBeVisible();
  await expect(page.locator('label[for="message"]')).toBeVisible();
});
