import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Alert, Recipe } from '@/@types';
import * as api from '@/services/api';

type RecipesState = {
  recipes: Recipe[];
  isLoading: boolean;
  error: Alert | null;
};

type RecipesActions = {
  // Zustand accepte les actions « asynchrones »
  fetchRecipes: () => Promise<void>;
};

export const useRecipesStore = create<RecipesState & RecipesActions>()(
  devtools((set) => ({
    recipes: [],
    isLoading: false,
    error: null,

    fetchRecipes: async () => {
      set({ isLoading: true, error: null });
      try {
        const data = await api.getRecipes();
        set({ recipes: data, isLoading: false });
      } catch (err) {
        const error: Alert = {
          status: 'error',
          message: 'Erreur lors du chargement des recettes',
        };

        set({ error, isLoading: false });
        console.error(err);
      }
    },
  })),
);
