import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import * as api from '@/services/api';

import type { Recipe } from '@/@types';

type RecipesState = {
  recipes: Recipe[];
  isLoading: boolean;
};

const initialState: RecipesState = {
  recipes: [],
  isLoading: false,
};

// Une action ne peut pas être asynchrone…
// Or je dois faire un `fetch` pour récupérer mes recettes depuis mon API
// → j'utilise un « async thunk » : une « enveloppe » qui me générera 3 actions
//
// Pourquoi 3 ?
// En fonction du statut de la promesse (de mon fetch) :
//   1. statut `pending` → promesse en cours
//   2. statut `fulfilled` → promesse résolue avec succès
//   3. statut `rejected` → promesse résolue avec erreur
export const fetchRecipes = createAsyncThunk(
  // nom → on fait comme une action `nom_slice/nom_reducer`
  'recipes/fetchRecipes',
  // promesse → notre fetch
  async (_, { rejectWithValue }) => {
    try {
      return await api.getRecipes();
    } catch (_error) {
      // si on est en erreur, je peux rejeter la promesse (`rejected`)
      // avec un message personnalisé
      return rejectWithValue('Erreur lors du chargement des recettes');
    }
  }
);

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {},
  // les thunks se rangent sur un propriété spéciale…
  // le reducer global est une « grosse » fonction qui fait un `switch` :
  // https://redux.js.org/tutorials/fundamentals/part-3-state-actions-reducers#creating-the-root-reducer
  //
  // on doit ici ajouter (presque) manuellement des `case` pour nos 3 actions générées par le thunk
  extraReducers: (builder) => {
    builder
      // EN COURS (non résolue) → nom_du_thunk.pending
      .addCase(fetchRecipes.pending, (state) => {
        // quand la promesse est en cours, on passe en mode chargement
        state.isLoading = true;
      })
      // SUCCÈS → nom_du_thunk.fulfilled
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        // on n'est plus en train de charger (on a un résultat)
        state.isLoading = false;
        // la réponse de la promesse est renvoyée (par le thunk) dans le payload de l'action
        state.recipes = action.payload;
      })
      // ERREUR → nom_du_thunk.rejected
      .addCase(fetchRecipes.rejected, (state, action) => {
        // on n'est plus en train de charger (on a un résultat)
        state.isLoading = false;

        // message fourni par `rejectWithValue`
        console.log(action.payload);
        // je peux récupérer des erreurs dans l'action elle-même
        console.log(action.error);
      });
  }
});

export default recipesSlice.reducer;
