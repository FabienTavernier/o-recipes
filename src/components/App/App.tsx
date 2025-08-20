import './App.scss';

import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import type { Alert } from '@/@types';
import FavoritesPage from '@/pages/FavoritesPage';
import HomePage from '@/pages/HomePage';
import NotFoundPage from '@/pages/NotFoundPage';
import RecipePage from '@/pages/RecipePage';
import * as api from '@/services/api';
import * as ls from '@/services/localStorage';
import { useListStore } from '@/store/useListStore';
import { useRecipesStore } from '@/store/useRecipesStore';

import Notification from '../ui/Notification/Notification';
import Spinner from '../ui/Spinner/Spinner';
import Header from './Header/Header';
import List from './List/List';
import SideBar from './Sidebar/Sidebar';

export default function App() {
  const location = useLocation();

  // const [recipes, setRecipes] = useState<Recipe[]>([]);
  // const [isLoading, setIsLoading] = useState(true);
  const { recipes, isLoading, error, fetchRecipes } = useRecipesStore();

  const [alert, setAlert] = useState<Alert | null>(error);

  const [isLogged, setIsLogged] = useState(false);

  const showList = useListStore((state) => state.isExpanded);

  useEffect(() => {
    function getToken() {
      const token = ls.getToken();

      if (token) {
        api.addTokenToInstance(token);
        setIsLogged(true);
      }
    }

    fetchRecipes();
    getToken();
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: scroll when URL changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      {alert && <Notification alert={alert} setAlert={setAlert} />}

      <div className="app">
        <div className="app-content">
          <SideBar recipes={recipes} isLogged={isLogged} />

          <div className="content">
            <Header
              isLogged={isLogged}
              setIsLogged={setIsLogged}
              setAlert={setAlert}
            />

            <hr />

            <Routes>
              <Route path="/" element={<HomePage recipes={recipes} />} />
              <Route path="/recipe/:slug" element={<RecipePage />} />

              {isLogged && (
                <Route
                  path="/favorites"
                  element={<FavoritesPage setAlert={setAlert} />}
                />
              )}

              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
        </div>

        <div className={showList ? 'app-list app-list--expanded' : 'app-list'}>
          <List />
        </div>
      </div>
    </>
  );
}
