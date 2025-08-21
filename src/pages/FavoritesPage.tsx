import { isAxiosError } from 'axios';
import { useEffect, useState } from 'react';
import type { Recipe } from '@/@types';
import Card from '@/components/Card/Card';
import * as api from '@/services/api';
import { useAlertStore } from '@/store/useAlertStore';

export default function FavoritesPage() {
  const setAlert = useAlertStore((state) => state.setAlert);

  const [favorites, setFavorites] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchFavRecipes = async () => {
      try {
        const data = await api.getFavorites();
        setFavorites(data);
      } catch (error) {
        const message =
          isAxiosError(error) || error instanceof Error
            ? error.message
            : 'code inconnu';

        setAlert({
          status: 'error',
          message,
        });
      }
    };
    fetchFavRecipes();
  }, [setAlert]);

  return (
    <main className="home">
      <h1>Mes recettes préférées</h1>

      <div className="card-group">
        {favorites.map((favorite) => (
          <Card key={favorite.id} recipe={favorite} />
        ))}
      </div>
    </main>
  );
}
