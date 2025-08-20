import type { Ingredient } from '@/@types';
import { useListStore } from '@/store/useListStore';

type ListIngredient = {
  ingredient: Omit<Ingredient, 'id'>;
};

export default function ListIngredient({ ingredient }: ListIngredient) {
  const removeFromList = useListStore((state) => state.removeIngredient);
  const changeQuantity = useListStore(
    (state) => state.changeIngredientQuantity,
  );

  function updateQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    const newQuantity = Number(event.currentTarget.value);

    if (newQuantity === 0) {
      removeIngredient();
    } else {
      changeQuantity(ingredient.name, newQuantity);
    }
  }

  function removeIngredient() {
    removeFromList(ingredient.name);
  }

  return (
    <article className="list-ingredient">
      <h3>{ingredient.name}</h3>

      <div>
        <input
          name="qty"
          type="number"
          min={0}
          value={ingredient.quantity}
          onChange={updateQuantity}
        />{' '}
        {ingredient.unit}
      </div>

      <button
        type="button"
        className="button button--ghost"
        title="Supprimer"
        onClick={removeIngredient}
      >
        X
      </button>
    </article>
  );
}
