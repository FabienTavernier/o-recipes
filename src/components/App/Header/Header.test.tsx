import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Header from './Header';

import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { BrowserRouter } from 'react-router';

describe('Header component', () => {
  it('should render component (logged)', () => {
    // je rends le composant dans jsdom (le DOM simulé configuré comme environnement de test)
    // ATTENTION comme Header utilise des hooks de Redux et re React Router,
    // il faut fournir leurs contextes
    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <Header
            isLogged={true}
            setIsLogged={() => {}}
            setAlert={() => {}}
          />
        </BrowserRouter>
      </Provider>
    );

    render(component);

    // je veux avoir (dans le DOM) le bouton "Se déconnecter"
    expect(screen.getByText('Se déconnecter')).toBeInTheDocument();
  });

  it('should render component (NOT logged)', () => {
    // je rends le composant dans jsdom (le DOM simulé configuré comme environnement de test)
    // ATTENTION comme Header utilise des hooks de Redux et re React Router,
    // il faut fournir leurs contextes
    const component = (
      <Provider store={store}>
        <BrowserRouter>
          <Header
            isLogged={false}
            setIsLogged={() => {}}
            setAlert={() => {}}
          />
        </BrowserRouter>
      </Provider>
    );

    render(component);

    // je veux avoir (dans le DOM) le bouton "Se déconnecter"
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
  });
});