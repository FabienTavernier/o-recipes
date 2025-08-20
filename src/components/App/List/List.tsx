import './List.scss';

import { useListStore } from '@/store/useListStore';

import ListIngredient from './ListIngredient';

export default function List() {
  // on récupère les ingrédients de la liste depuis le store
  const ingredients = useListStore((state) => state.ingredients);

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
