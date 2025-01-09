import React from "react";
import { IngredientsSectionsProps } from "../../../utils/types.ts";

export const IngredientSection: React.FC<IngredientsSectionsProps> = ({title, children}) => {
  return (
    <section>
      <h2 className={`mb-6 text text_type_main-small font_size-24`}>{title}</h2>
      <div className="display-flex flex_wrap-wrap">
        {children}
      </div>
    </section>
  )
}