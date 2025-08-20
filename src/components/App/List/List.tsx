import './List.scss';

import { useListStore } from '@/store/useListStore';

import ListIngredient from './ListIngredient';

export default function List() {
  const ingredients = useListStore((state) => state.ingredients);
  const clearList = useListStore((state) => state.clear);

  return (
    <aside className="list list--open">
      <div className="list-top">
        <h2>Votre liste</h2>
        <button
          type="button"
          className="list-empty button button--ghost"
          onClick={() => clearList()}
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
