import { useAppSelector } from '@/store/hooks';
import './List.scss';

import ListIngredient from './ListIngredient';

export default function List() {
  // je vais chercher mes ingredients depuis mon store
  const ingredients = useAppSelector((state) => state.list.ingredients);

  return (
    <aside className="list list--open">
      <div className="list-top">
        <h2>Votre liste</h2>
        <button type="button" className="list-empty button button--ghost">
          Vider
        </button>
      </div>

      <section className="list-ingredients">
        {ingredients.map((ingredient) => (
          <ListIngredient key={ingredient.name} ingredient={ingredient} />
        ))}
      </section>
    </aside>
  );
}
