import 'dotenv/config';
import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/O'recipes/);
});

test('display the homepage', async ({ page }) => {
  await page.goto('/');

  // Attend que le titre de la page (h1) soit visible et qu'il ait le bon contenu
  const heading = page.getByRole('heading', { level: 1, name: 'Les recettes' });
  await expect(heading).toBeVisible();
});

test('display the recipe page', async ({ page }) => {
  await page.goto('/');

  // je clique sur la première recette
  await page.getByRole('link', { name: 'Cookies au beurre de cacahuète' }).click();

  // vérifie le titre de la page
  const heading = page.getByRole('heading', { level: 1, name: 'Cookies au beurre de cacahuète' });
  await expect(heading).toBeVisible();
});

test('login', async ({ page }) => {
  await page.goto('/');

  // Remplir mon formulaire
  await page.getByRole('textbox', { name: 'Adresse e-mail' }).fill(process.env.TEST_USER_MAIL || 'DEFINE IN .ENV');
  await page.getByRole('textbox', { name: 'mot de passe' }).fill(process.env.TEST_USER_PWD || ''); // ATTENTION pas de mot de passe en clair sur GH !
  await page.getByRole('button', { name: 'OK' }).click();

  // Chercher le texte « Bienvenue »
  await expect(page.getByText('Bienvenue')).toBeVisible();
});