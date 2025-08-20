import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import type { IngredientInList } from '@/@types';

// La liste a 2 états :
//   - son statut d'ouverture
//   - ses ingrédients
type ListState = {
  isExpanded: boolean;
  ingredients: IngredientInList[];
};

// Temporairement, j'ajoute en dur des ingrédients pour m'aider au développement
const FAKE_DATA: IngredientInList[] = [
  {
    name: 'beurre de cacahuètes crunchy',
    quantity: 150,
    unit: 'g',
  },
  {
    name: 'œuf',
    quantity: 3,
    unit: '',
  },
];

// CONVENTION : le nom du store commence par `use` et fini par `Store`
// attention à la syntaxe particulière en TS
// → https://zustand.docs.pmnd.rs/guides/typescript#basic-usage
//
// Zustand me propose d'utiliser les devTools Redux
// → https://zustand.docs.pmnd.rs/middlewares/devtools
export const useListStore = create<ListState>()(
  devtools(() => ({
    isExpanded: false,
    ingredients: FAKE_DATA,
  })),
);
