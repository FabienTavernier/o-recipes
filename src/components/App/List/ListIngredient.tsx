import type { Ingredient } from '@/@types';
import { useAppDispatch } from '@/store/hooks';
import {
  changeIngredientQuantity,
  removeIngredient,
} from '@/store/slices/listSlice';

type ListIngredient = {
  ingredient: Omit<Ingredient, 'id'>;
};

export default function ListIngredient({ ingredient }: ListIngredient) {
  const dispatch = useAppDispatch();

  function updateQuantity(event: React.ChangeEvent<HTMLInputElement>) {
    // Quand je mets à jour la quantité, j'ai 2 cas :
    //   - la nouvelle quantité est égale à 0 → je supprime l'ingrédient de la liste
    //   - différente de 0 → je change la quantité avec la valeur de mon input
    const newQty = Number(event.currentTarget.value);

    if (newQty === 0) {
      remove();
    } else {
      dispatch(
        changeIngredientQuantity({
          name: ingredient.name,
          qty: newQty,
        }),
      );
    }
  }

  function remove() {
    dispatch(removeIngredient(ingredient.name));
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
        onClick={remove}
      >
        X
      </button>
    </article>
  );
}
