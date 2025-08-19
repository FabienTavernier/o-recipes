import { useAppDispatch, useAppSelector } from '@/store/hooks';
import './List.scss';

import { clearIngredients } from '@/store/slices/listSlice';
import ListIngredient from './ListIngredient';

export default function List() {
  // je vais chercher mes ingredients depuis mon store
  const ingredients = useAppSelector((state) => state.list.ingredients);

  // je veux pouvoir modifier mon état (dans le store)
  const dispatch = useAppDispatch();

  return (
    <aside className="list list--open">
      <div className="list-top">
        <h2>Votre liste</h2>
        <button
          type="button"
          className="list-empty button button--ghost"
          onClick={() => dispatch(clearIngredients())}
        >
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
