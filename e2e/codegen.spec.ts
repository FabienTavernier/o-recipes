import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Les recettes' })).toBeVisible();
  await page.getByRole('article').filter({ hasText: 'Cookies au beurre de cacahuète' }).getByRole('link').click();
  await expect(page.locator('h1')).toContainText('Cookies au beurre de cacahuète');
  await page.getByRole('button', { name: 'Afficher la liste des ingrédients' }).click();
  await expect(page.getByRole('heading', { name: 'Votre liste' })).toBeVisible();
  await page.getByRole('button', { name: 'Ajouter les ingrédients à la liste' }).click();
  await expect(page.locator('section')).toContainText('sucre roux');
  await expect(page.getByRole('article').filter({ hasText: 'sucre roux gX' }).getByRole('spinbutton')).toHaveValue('120');
  await page.getByRole('button', { name: 'Ajouter les ingrédients à la liste' }).click();
  await expect(page.getByRole('article').filter({ hasText: 'sucre roux gX' }).getByRole('spinbutton')).toHaveValue('240');
  await page.getByRole('article').filter({ hasText: 'sucre roux gX' }).getByRole('spinbutton').click();
  await page.getByRole('article').filter({ hasText: 'sucre roux gX' }).getByRole('spinbutton').fill('100');
  await expect(page.getByRole('article').filter({ hasText: 'sucre roux g' }).getByRole('spinbutton')).toHaveValue('100');
  await page.getByRole('link', { name: 'Amandier' }).click();
  await expect(page.locator('h1')).toContainText('Amandier');
  await page.getByRole('button', { name: 'Ajouter les ingrédients à la liste' }).click();
  await expect(page.getByText('sucre gX')).toBeVisible();
  await page.getByRole('article').filter({ hasText: 'bicarbonate ccX' }).getByRole('button').click();
  // je vérifie si l'ingrédient a disparu
  await expect(page.getByRole('article').filter({ hasText: 'bicarbonate ccX' })).toHaveCount(0);
  await page.getByRole('button', { name: 'Vider' }).click();
  // je vérifie que la section est vide
  await expect(page.locator('section').locator('article')).toHaveCount(0);
});
