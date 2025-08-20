import type { IngredientInList } from '@/@types';
import { create } from 'zustand';

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
export const useListStore = create<ListState>()(() => ({
  isExpanded: false,
  ingredients: FAKE_DATA,
}));
