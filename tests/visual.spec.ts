import { test, expect } from '@playwright/test';

const breakpoints = [
  { width: 320,  height: 812,  name: '320-mobile' },
  { width: 768,  height: 1024, name: '768-tablet' },
  { width: 1024, height: 768,  name: '1024-laptop' },
  { width: 1440, height: 900,  name: '1440-desktop' },
];

for (const bp of breakpoints) {
  test(`renders correctly at ${bp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await page.waitForTimeout(1000); // let GSAP animations settle
    await expect(page).toHaveScreenshot(`hero-${bp.name}.png`);
  });
}

test('hero CTA scrolls to contact section', async ({ page }) => {
  await page.goto('/');
  await page.click('.hero__cta');
  await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 });
});

test('nav CTA scrolls to contact section', async ({ page }) => {
  await page.goto('/');
  await page.click('.nav__cta');
  await expect(page.locator('#contact')).toBeInViewport({ timeout: 2000 });
});

test('contact form fields are present and interactive', async ({ page }) => {
  await page.goto('/');
  await page.locator('#name').fill('Test User');
  await page.locator('#email').fill('test@example.com');
  await page.locator('#message').fill('Hello from Playwright');
  await expect(page.locator('button[type="submit"]')).toBeEnabled();
});
