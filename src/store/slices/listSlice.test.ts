import { describe, expect, it } from 'vitest';

import listReducer, { initialState } from './listSlice';

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
});
