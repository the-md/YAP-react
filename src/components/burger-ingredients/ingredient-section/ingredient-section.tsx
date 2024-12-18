import React from "react";
import { IngredientsSectionsProps } from "../../../types";
import styles from "./ingredient-section.module.css";

const IngredientSection: React.FC<IngredientsSectionsProps> = ({title, children}) => {
  return (
    <section>
      <h2 className={`mb-6 text_type_main-small ${styles.ingredientSectionTitle}`}>{title}</h2>
      <div className="display-flex flex_wrap-wrap">
        {children}
      </div>
    </section>
  )
}

export default IngredientSection