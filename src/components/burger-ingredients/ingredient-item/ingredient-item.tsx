import React from "react";
import { IngredientItemProps } from "../../../utils/types.ts";
import styles from "./ingredient-item.module.css";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

const IngredientItem: React.FC<IngredientItemProps> = ({item, openModal}) => {

  return (
    <>
      <div className={`cursor-pointer mb-8 ml-4 mr-4 text_align-center ${styles.ingredientItem}`} onClick={() => openModal(item)}>
        <img src={item.image} alt=""/>
        <div className="m-1 text_type_digits-default">
          {item.price} <CurrencyIcon className={`ml-2 ${styles.priceIcon}`} type="primary" />
        </div>
        <div className={styles.ingredientName}>
          {item.name}
        </div>
        <Counter count={1} size="default" extraClass="m-1" />
      </div>

    </>
  )
}

export default IngredientItem