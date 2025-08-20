import './List.scss';

import { useListStore } from '@/store/useListStore';

import ListIngredient from './ListIngredient';

export default function List() {
  // on récupère les ingrédients de la liste depuis le store
  const ingredients = useListStore((state) => state.ingredients);
  // on veut pouvoir vider la liste
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
