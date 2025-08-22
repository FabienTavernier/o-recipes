import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/O'recipes/);
});

test('display the homepage', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // Attend que le titre de la page (h1) soit visible et qu'il ait le bon contenu
  const heading = page.getByRole('heading', { level: 1, name: 'Les recettes' });
  await expect(heading).toBeVisible();
});
