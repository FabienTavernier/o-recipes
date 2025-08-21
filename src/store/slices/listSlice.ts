import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { Ingredient } from '@/@types';

// L'état :
//   - la liste peut être ouverte ou fermée
//   - la liste peut contenir des ingrédients
type ListState = {
  isExpanded: boolean;
  ingredients: Omit<Ingredient, 'id'>[];
};

export const initialState: ListState = {
  isExpanded: false,
  ingredients: [],
};

const listSlice = createSlice({
  name: 'list',
  initialState,
  reducers: {
    // Ouvrir/fermer la liste
    toggle: (state) => {
      // Grâce à Immer (embarqué dans Toolkit), je peux écrire du code mutable
      // et directement modifier la valeur de la propriété
      state.isExpanded = !state.isExpanded;
    },
    // Vider la liste
    clearIngredients: (state) => {
      state.ingredients = [];
    },
    // Ajouter des ingrédients
    addIngredients: (state, action: PayloadAction<Ingredient[]>) => {
      // POUR CHAQUE ingrédient à ajouter
      for (const { name, quantity, unit } of action.payload) {
        // je regarde s'il est déjà dans la liste qui se trouve dans mon état
        // (je cherche par le nom de l'ingrédient)
        const existing = state.ingredients.find((i) => i.name === name);

        if (existing) {
          // il y est déjà → je modifie sa quantité
          existing.quantity += quantity;
        } else {
          // il n'y est pas → je l'ajoute
          state.ingredients.push({
            name,
            quantity,
            unit,
          });
        }
      }
    },
    // Supprimer un ingrédient (par son nom)
    removeIngredient: (state, action: PayloadAction<string>) => {
      // je ne conserve que les ingrédients dont le nom n'est pas celui envoyé dans l'action
      state.ingredients = state.ingredients.filter(
        (i) => i.name !== action.payload,
      );
    },
    // Modifier la quantité d'un ingrédient
    // j'ai besoin de l'ingrédient (son nom) et de la nouvelle quantité
    changeIngredientQuantity: (
      state,
      action: PayloadAction<{ name: string; qty: number }>,
    ) => {
      // pour chaque ingrédient de ma liste
      state.ingredients = state.ingredients.map((i) => {
        // SI c'est le bon ingrédient (le nom correspond dans le payload)
        if (i.name === action.payload.name) {
          // je modifie sa quantité (quantité envoyée dans le payload)
          i.quantity = action.payload.qty;
        }
        // je retourne l'ingrédient (modifié ou non)
        return i;
      });
    },
  },
});

// J'exporte les actions
export const {
  toggle,
  clearIngredients,
  addIngredients,
  removeIngredient,
  changeIngredientQuantity,
} = listSlice.actions;

// J'exporte le reducer
export default listSlice.reducer;
