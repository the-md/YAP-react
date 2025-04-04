import React from "react";
import { Ingredient } from "../../../utils/types.ts";
import styles from "./ingredient-details.module.css";

export const IngredientDetails: React.FC<{ item: Ingredient }> = ({item}) => {
  return (
    <article className="text_align-center">
      <img
        alt=""
        className={styles.detailImage}
        src={item.image}
        data-image={item.image_large}
        onLoad={(e) => {
          const img = e.target as HTMLImageElement;
          const highResSrc = img.getAttribute("data-image");
          if (highResSrc) {
            const newImg = new Image();
            newImg.src = highResSrc;
            newImg.onload = () => {
              img.src = highResSrc;
            };
          }
        }}
      />
      <div className="mt-4 mb-8 text_type_main-medium font_size-24" data-cy="ingredient-detail-title">{item.name}</div>
      <ul className={`text_color_inactive display-flex align_items-start justify_content-center ${styles.detailsList}`}>
        <li>
          <div>Калории,ккал</div>
          <div className="mt-2 text_type_digits-default" data-cy="ingredient-detail-calories">{item.calories}</div>
        </li>
        <li>
          <div>Белки, г</div>
          <div className="mt-2 text_type_digits-default" data-cy="ingredient-detail-proteins">{item.proteins}</div>
        </li>
        <li>
          <div>Жиры, г</div>
          <div className="mt-2 text_type_digits-default" data-cy="ingredient-detail-fat">{item.fat}</div>
        </li>
        <li>
          <div>Углеводы, г</div>
          <div className="mt-2 text_type_digits-default" data-cy="ingredient-detail-carbohydrates">{item.carbohydrates}</div>
        </li>
      </ul>
    </article>
  )
}