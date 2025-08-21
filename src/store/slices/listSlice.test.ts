import { describe, expect, it } from 'vitest';

import listReducer, { addIngredients, initialState } from './listSlice';
import type { Ingredient } from '@/@types';

// je crée une variable Ingredient pour mes différents tests
const ingredientToAdd: Ingredient = {
  id: 42,
  name: 'framboise',
  quantity: 50,
  unit: 'g',
};
// je prend son pendant dans la liste
const ingredientInList: Omit<Ingredient, 'id'> = {
  name: ingredientToAdd.name,
  quantity: ingredientToAdd.quantity,
  unit: ingredientToAdd.unit,
}

describe('listSlice reducers', () => {
  /*
    À l'initialisation, Redux appelle tous les reducers pour
    créer le state global (à partir des états initiaux des slices).
    
    Rappel : un reducer est une fonction qui prend l'état actuel
    et une action en paramètres et qui retourne un nouvel état.
    
    Je peux tester ça, j'appelle mon reducer avec :
    
      - l'état actuel → à l'initialisation = undefined
        > je n'ai pas encore d'état
          
      - une action → pour simuler l'initialisation,
        je mets une « fausse » action
        
        > NOTE une action est un objet avec une propriété `type`
        > (le nom de l'action)
        > et peut avoir un `payload`
  */
  it('should return the initial state', () => {
    const expectedState = listReducer(undefined, { type: '@@TEST' });
    expect(expectedState).toEqual(initialState);
  });

  /*
    Je peux tester mes actions

    Une action est « capturée » par le reducer qui doit retourner
    un nouvel état modifié
  */
  it('should add ingredients to the list (simple add)', () => {
    // initialState: ingredients = []
    // ingredientsToAdd = [Ingredient]
    // updatedState: ingredients = [Omit<Ingredient, 'id'>]
    const updatedState = listReducer(initialState, addIngredients([ingredientToAdd]));

    // je veux avoir 1 élément dans ma liste
    expect(updatedState.ingredients).toHaveLength(1);

    // je veux que cet élément soit mon ingredient (sans l'ID)
    expect(updatedState.ingredients[0]).toEqual(ingredientInList);
  });

  it('should add ingredients to the list (existing ingredient)', () => {
    // pour tester quand un ingrédient est déjà présent dans la liste,
    // je dois fabrique un état avec un ingrédient présent
    // état actuel: ingredients = [Ingredient]
    const currentState = { ...initialState, ingredients: [ingredientInList] }
    // j'ajoute le même ingredient à l'état actuel
    const updatedState = listReducer(currentState, addIngredients([ingredientToAdd]));

    // je veux toujours avoir 1 élément dans ma liste
    expect(updatedState.ingredients).toHaveLength(1);

    // je veux que cet élément ait sa quantité doublée
    expect(updatedState.ingredients[0].quantity).toEqual(ingredientInList.quantity * 2);
  });

  // TODO tester removeIngredient
  // état actuel → avec 1 ingrédient = ingredientInList
  // nom de l'ingrédient à supprimer = ingredientInList.name
  // on s'attend à ce que l'état modifié ne comporte plus d'ingrédient → expect().toHaveLength(0) || expect().toEqual([])
});
