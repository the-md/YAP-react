import React from "react";
import { IngredientsSections } from "../../../types/ingredients-sections.ts";
import styles from "./ingredient-section.module.css";
import IngredientItem from "../ingredient-item/ingredient-item.tsx";

const IngredientSection: React.FC<IngredientsSections> = ({title, type, ingredients}) => {
  return (
    <section>
      <h2 className={`mb-6 text_type_main-small ${styles.ingredientSectionTitle}`}>{title}</h2>
      <div className="display-flex flex_wrap-wrap">
        {ingredients.filter(item => item.type === type).map(item => <IngredientItem key={item._id} item={item}/>)}
      </div>
    </section>
  )
}

export default IngredientSection