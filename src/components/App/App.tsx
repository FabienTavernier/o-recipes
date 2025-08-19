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
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchRecipes } from '@/store/slices/recipesSlice';
import Notification from '../ui/Notification/Notification';
import Spinner from '../ui/Spinner/Spinner';
import Header from './Header/Header';
import List from './List/List';
import SideBar from './Sidebar/Sidebar';

export default function App() {
  // pour gérer les recettes, on passe désormais par le store
  const { isLoading, recipes } = useAppSelector((state) => state.recipes);
  const dispatch = useAppDispatch();

  const location = useLocation();

  const [alert, setAlert] = useState<Alert | null>(null);

  const [isLogged, setIsLogged] = useState(false);

  // mon état local va être remplacé par mon store
  // const [showList, setShowList] = useState(false);
  const showList = useAppSelector((state) => state.list.isExpanded);

  useEffect(() => {
    function getToken() {
      const token = ls.getToken();

      if (token) {
        api.addTokenToInstance(token);
        setIsLogged(true);
      }
    }

    getToken();

    // J'appelle mon action « asynchrone », mon thunk
    dispatch(fetchRecipes());
  }, [dispatch]);

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
              // setShowList={setShowList} // plus besoin : je dispatcherai mon action pour parler à mon store
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
