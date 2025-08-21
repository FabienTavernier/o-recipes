import { describe, expect, it } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';

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

    const logoutBtn = screen.getByText('Se déconnecter');
    // je simule un clic sur le bouton
    fireEvent.click(logoutBtn);
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

  it('should replace "Se déconnecter" by "OK" on click', () => {
    // Comme je supprime la fonction `setIsLogged`, je ne peux plus modifier
    // la valeur de l'état `isLogged`
    //
    // Solution recréer un composant qui enveloppe notre Header avec un état isLogged
    // actif
    function HeaderTestWrapper() {
      const [isLogged, setIsLogged] = React.useState(true);

      return (
        <Provider store={store}>
          <BrowserRouter>
            <Header
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              setAlert={() => {}}
            />
          </BrowserRouter>
        </Provider>
      );
    }

    render(<HeaderTestWrapper />);

    // je récupère mon bouton "Se déconnecter"
    const logoutBtn = screen.getByText('Se déconnecter');
    // je simule un clic sur le bouton
    fireEvent.click(logoutBtn); // → grâce au wrapper, isLogged est modifié

    // je dois retrouver le bouton "OK"
    expect(screen.getByRole('button', { name: 'OK' })).toBeInTheDocument();
    // On peut aussi vérifier les champs du formulaire
    expect(screen.getByPlaceholderText('Adresse e-mail')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Mot de passe')).toBeInTheDocument();
  });
});