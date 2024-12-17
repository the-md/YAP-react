import React from "react";
import { IngredientsArray } from "../../../types/ingredients-array.ts";
import styles from "./ingredient-item.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem: React.FC<{ item: IngredientsArray }> = ({item}) => {
  return (
    <article className={`mb-8 ml-4 mr-4 ${styles.ingredientItem}`}>
      <div className="image">
        <img src={item.image} alt=""/>
      </div>
      <div className="m-1 text_type_digits-default">
        {item.price} <CurrencyIcon className={styles.priceIcon} type="primary" />
      </div>
      <div className={styles.ingredientName}>
        {item.name}
      </div>
      <Counter count={1} size="default" extraClass="m-1" />
    </article>
  )
}

export default IngredientItem