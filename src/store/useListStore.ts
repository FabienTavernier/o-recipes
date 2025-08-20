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

// on peut séparer les types qui concernent les valeurs d'état
// et les types pour les actions
type ListActions = {
  toggle: () => void; // toggle est une fonction qui ne retourne rien
  clear: () => void;
  // pour ajouter des ingrédients à la liste, il nous faut… des ingrédients
  // on les passe directement en paramètres de notre action
  // (équivalent action.payload de Redux mais en plus simple !)
  addIngredients: (ingredients: IngredientInList[]) => void;
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
//
// Comme je sépare mes types pour las variables et les types pour mes actions,
// je dois les combiner ici pour bien typer mon store
// → je crée un type qui combine les propriétés de mon état et les méthodes d'actions
export const useListStore = create<ListState & ListActions>()(
  // je vais ajouter une action qui va modifier l'état grâce à la fonction `set()`,
  // cette fonction vient automatiquement de Zustand
  devtools((set) => ({
    isExpanded: false,
    ingredients: FAKE_DATA,

    // `set` prend comme argument notre action :
    // une fonction qui prend l'état actuel en paramètre et
    // retourne un nouvel objet d'état ;
    // on n'indique que la ou les propriétés à modifier (le reste sera inchangé)
    //
    // NOTE attention à ne pas se perdre avec les accolades et les parenthèses !
    // C'est « LA » grosse difficulté de Zustand.
    //
    // RAPPEL sur les retours d'une fonctions fléchées : explicite vs implicite
    //
    // explicite : plus verbeux mais peut-être plus lisible
    // implicite : plus concis mais peut être difficilement lisible avec les objets
    //
    // explicite :
    // const func = () => {
    //   return 'hello';
    // };
    // const func = () => {
    //   return {
    //     name: 'Dave Lopper',
    //   };
    // };
    //
    // implicite :
    // const func = () => 'hello';
    //
    // particularité → pour ne pas « confondre » les accolades de l'objet avec les accolades
    // de la fonction, on entoure notre objet de parenthèses
    // const func = () => ({ name: 'Dave Lopper' });
    //
    // Par défaut, les actions sont nommées `anonymous` dans les devTools,
    // on peut y remédier en utilisant un 3ème argument dans la fonction `set`
    // → https://zustand.docs.pmnd.rs/middlewares/devtools#all-action-names-are-labeled-as-'anonymous'
    toggle: () =>
      set(
        (state) => ({ isExpanded: !state.isExpanded }), // l'action
        undefined, // indique si on remplace tout l'état par le 1er argument
        'list/toggle', // permet de nommer l'action dans les devtools
      ),

    clear: () => set(() => ({ ingredients: [] }), undefined, 'list/clear'),

    addIngredients: (ingredients) =>
      set(
        (state) => ({
          // code immuable (sauf utilisation du MW immer)
          ingredients: [...state.ingredients, ...ingredients],
        }),
        undefined,
        'list/addIngredients',
      ),
  })),
);
