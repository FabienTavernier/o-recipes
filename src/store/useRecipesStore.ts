import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { Alert, Recipe } from '@/@types';
import * as api from '@/services/api';
import { useAlertStore } from './useAlertStore';

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

    fetchRecipes: async () => {
      set({ isLoading: true }, undefined, 'recipes/fetch.pending');
      try {
        const data = await api.getRecipes();
        set({ recipes: data, isLoading: false }, undefined, 'recipes/fetch.fulfilled');
      } catch (err) {
        const error: Alert = {
          status: 'error',
          message: 'Erreur lors du chargement des recettes',
        };

        // je veux transmettre l'erreur à `useAlertStore`
        // ATTENTION je ne peux pas utiliser le hook ici
        // (je ne suis pas dans un composant ni dans un autre hook)
        // → on va récupérer le store puis mon action
        //
        // https://zustand.docs.pmnd.rs/apis/create#returns
        //
        // Pour communiquer avec un autre store, on appelle directement le store
        // (pas le hook dédié, donc sans `()`) qui nous fournit une méthode
        // pour récupérer le state (`getState`)
        useAlertStore.getState().setAlert(error);

        set({ isLoading: false }, undefined, 'recipes/fetch.rejected');
        console.error(err);
      }
    },
  })),
);
