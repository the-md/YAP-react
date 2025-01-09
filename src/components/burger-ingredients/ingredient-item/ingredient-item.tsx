import React from "react";
import { useDrag } from "react-dnd";
import { Counter, CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredient-item.module.css";
import { IngredientObj } from "../../../utils/types.ts";

export const IngredientItem: React.FC<IngredientItemProps> = ({item, openModal}) => {
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: item,
  });

  return (
    <>
      <div ref={dragRef} className={`cursor-grab mb-8 ml-4 mr-4 text_align-center ${styles.ingredientItem}`} onClick={() => openModal(item)}>
        <img src={item.image} alt=""/>
        <div className="m-1 text_type_digits-default">
          {item.price} <CurrencyIcon className={`ml-2 ${styles.priceIcon}`} type="primary" />
        </div>
        <div className={styles.ingredientName}>
          {item.name}
        </div>
        {/* TODO сделать счетчик интерактивным */}
        <Counter count={1} size="default" extraClass="m-1" />
      </div>

    </>
  )
}

interface IngredientItemProps {
  item: IngredientObj;
  openModal: (item: IngredientObj | null) => void
}
