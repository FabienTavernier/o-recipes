import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IngredientInList } from '@/@types';

type ListState = {
  isExpanded: boolean;
  ingredients: IngredientInList[];
};

type ListActions = {
  toggle: () => void;
  clear: () => void;
  addIngredients: (ingredients: IngredientInList[]) => void;
  removeIngredient: (name: string) => void;
  changeIngredientQuantity: (name: string, quantity: number) => void;
};

export const useListStore = create<ListState & ListActions>()(
  devtools((set) => ({
    isExpanded: false,
    ingredients: [],

    toggle: () =>
      set(
        (state) => ({ isExpanded: !state.isExpanded }),
        undefined,
        'list/toggle',
      ),

    clear: () => set(() => ({ ingredients: [] }), undefined, 'list/clear'),

    addIngredients: (ingredients) =>
      set(
        (state) => {
          const updatedIngredients = [...state.ingredients];

          for (const { name, quantity, unit } of ingredients) {
            const existing = updatedIngredients.find((i) => i.name === name);

            if (existing) {
              existing.quantity += quantity;
            } else {
              updatedIngredients.push({
                name,
                quantity,
                unit,
              });
            }
          }

          return { ingredients: updatedIngredients };
        },
        undefined,
        'list/addIngredients',
      ),

    removeIngredient: (name) =>
      set(
        (state) => ({
          ingredients: state.ingredients.filter((i) => i.name !== name),
        }),
        undefined,
        'list/removeIngredient',
      ),

    changeIngredientQuantity: (name, quantity) =>
      set(
        (state) => ({
          ingredients: state.ingredients.map((i) => {
            if (i.name === name) {
              i.quantity = quantity;
            }

            return i;
          }),
        }),
        undefined,
        'list/changeIngredientQuantity',
      ),
  })),
);
