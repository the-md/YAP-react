import React from "react";
import styles from "./ingredient-details.module.css";
import { IngredientsArray } from "../../../types";


const IngredientDetails: React.FC<{ item: IngredientsArray }> = ({item}) => {
  return (
    <article>
      <img src={item.image_large} alt=""/>
      <div className={`mt-4 mb-8 text_type_main-medium ${styles.detailsName}`}>{item.name}</div>
      <ul className={`text_color_inactive ${styles.detailsList}`}>
        <li>
          <div>Калории,ккал</div>
          <div className="mt-2 text_type_digits-default">{item.calories}</div>
        </li>
        <li>
          <div>Белки, г</div>
          <div className="mt-2 text_type_digits-default">{item.proteins}</div>
        </li>
        <li>
          <div>Жиры, г</div>
          <div className="mt-2 text_type_digits-default">{item.fat}</div>
        </li>
        <li>
          <div>Углеводы, г</div>
          <div className="mt-2 text_type_digits-default">{item.carbohydrates}</div>
        </li>
      </ul>
    </article>
  )
}

export default IngredientDetails