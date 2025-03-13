import React from "react";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { getConstructorState } from "../../../services/burger-constructor/slice.ts";
import { Ingredient } from "../../../utils/types.ts";
import styles from "./ingredient-item.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "../../../services/store.ts";

export const IngredientItem: React.FC<{ item: Ingredient }> = ({item}) => {
  const { constructorIngredients, constructorBuns } = useSelector(getConstructorState);
  const location = useLocation();
  const navigate = useNavigate()
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });
  const count:number = item.type === 'bun'
    ? constructorBuns?._id === item._id ? 2 : 0
    : constructorIngredients.filter(ingredient => ingredient._id === item._id).length

  const onIngredientClick = (ingredient:Ingredient) => {
    navigate(`/ingredients/${ingredient._id}`, {
      state: { background: location },
    });
  }
  return (
    <div
      ref={dragRef}
      className={`cursor-grab mb-8 ml-4 mr-4 text_align-center ${styles.ingredientItem}` }
      onClick={() => onIngredientClick(item)}
      data-cy="ingredient-item"
    >
      <img src={item.image} alt=""/>
      <div className="m-1 text_type_digits-default">
        {item.price} <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
      </div>
      <div className={styles.ingredientName}>
        {item.name}
      </div>
      {count !== 0 && (
        <Counter count={count} size="default" extraClass="m-1"/>
      )}
    </div>
  )
}
