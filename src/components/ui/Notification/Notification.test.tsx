import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Notification from './Notification';
import type { Alert } from '@/@types';

import '@testing-library/jest-dom';

const alert: Alert = {
  status: 'error',
  message: 'On teste un composant',
};

// on ne va pas tester la fonctionnalité setAlert mais le composant
// l'important c'est d'avoir une fonction…
const setAlert = () => {};

describe('Notification component', () => {
  it('should render component', () => {
    // je rends le composant dans jsdom (le DOM simulé configuré comme environnement de test)
    render(<Notification alert={alert} setAlert={setAlert} />);

    // je cible mon élément
    const elt = screen.getByText(alert.message);

    // je veux avoir (dans le DOM) le message envoyé en prop
    expect(elt).toBeInTheDocument();

    // je vérifie que la div a bien la bonne classe
    expect(elt).toHaveClass(`alert--${alert.status}`);
  });
});