import { beforeEach, describe, expect, it, vi, type Mock } from 'vitest';

import '@testing-library/jest-dom';

import ListIngredient from './ListIngredient';
import { fireEvent, render, screen } from '@testing-library/react';
import { useAppDispatch } from '@/store/hooks';
import { changeIngredientQuantity, removeIngredient } from '@/store/slices/listSlice';

const mockIngredient = {
  quantity: 2,
  unit: '',
  name: "blanc d'oeuf",
};

/*
  Mock Redux dispatch


  Comme on a déjà tester nos reducers, plus besoin de le faire ici…
  On doit juste tester si l'action est bien dispatchée.
  Mais on va le faire sans réellement atteindre le store Redux.

  C'est ça un mock : on remplace des données réelles
  (ici la fonction dispatch) par une fausse version contrôlable.

  Ça permet de :

  - voir si elle est appelée (et avec quels arguments)
  - éviter d'exécuter du vrai code (comme une requête réseau ou une mutation de state)
*/

// « Quand tu vois `useAppDispatch`, renvoie une fausse fonction »
// → remplace l'import
vi.mock('@/store/hooks', () => ({
  useAppDispatch: vi.fn(), // fonction mockée
}));

describe('ListIngredient component', () => {
  // je prépare aussi un mock lors de l'utilisation de `useAppDispatch`
  const mockDispatch = vi.fn();

  // Avant chaque test, je remplace (dans le code) l'appel `useAppDispatch()`
  // par mon mon mock
  beforeEach(() => {
    vi.clearAllMocks();

    // Pour pouvoir remplacer mon hook par mon mock, j'utilise une méthode spéciale.
    // Cette Méthode est donnée par le type `Mock`, je dois convertir le type de mon hook
    // en Mock ; je passe par un type intermédiaire : `unknown`
    (useAppDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it('should call dispatch when change quantity', () => {
    // je rends le composant
    render(<ListIngredient ingredient={mockIngredient} />);

    // je récupère le input[type=number] par son rôle
    // → https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/input#fonctionnalit%C3%A9s_suppl%C3%A9mentaires:~:text=contenu%20phras%C3%A9.-,R%C3%B4le%20ARIA%20implicite,-type%3Dbutton%C2%A0%3A
    const input = screen.getByRole('spinbutton');
    // je déclenche le changement de la valeur, et je la passe à 3
    fireEvent.change(input, { target: { value: 3 } }); // event.target.value

    // je veux vérifier que le dispatch appelle :
    //
    // - la bonne ACTION
    // - avec les bons ARGUMENTS
    expect(mockDispatch).toHaveBeenCalledWith(
      changeIngredientQuantity({
        name: mockIngredient.name,
        qty: 3,
      }),
    );
  });

  it('should call dispatch when change quantity to 0', () => {
    // je rends le composant
    render(<ListIngredient ingredient={mockIngredient} />);

    // je récupère le input[type=number] par son rôle
    // → https://developer.mozilla.org/fr/docs/Web/HTML/Reference/Elements/input#fonctionnalit%C3%A9s_suppl%C3%A9mentaires:~:text=contenu%20phras%C3%A9.-,R%C3%B4le%20ARIA%20implicite,-type%3Dbutton%C2%A0%3A
    const input = screen.getByRole('spinbutton');
    // je déclenche le changement de la valeur, et je la passe à 3
    fireEvent.change(input, { target: { value: 0 } }); // event.target.value

    // je veux vérifier que le dispatch appelle :
    //
    // - la bonne ACTION
    // - avec les bons ARGUMENTS
    expect(mockDispatch).toHaveBeenCalledWith(
      removeIngredient(mockIngredient.name),
    );
  });

  it('should remove ingredient when clicking the delete button', () => {
    // je rends le composant
    render(<ListIngredient ingredient={mockIngredient} />);

    // je cible le bouton avec le titre "Supprimer"
    const deleteButton = screen.getByTitle('Supprimer');
    // je clique dessus
    fireEvent.click(deleteButton);

    // je vérifie l'action
    expect(mockDispatch).toHaveBeenCalledWith(
      removeIngredient(mockIngredient.name),
    );
  });

});