import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteIngredient, sortIngredient } from "../../../services/burger-constructor/slice.ts";
import { ConstructorIngredient } from "../../../utils/types.ts";
import type { AppDispatch } from "../../../services/store.ts";

export const BurgerConstructorItem: React.FC<BurgerConstructorItemProps> = ({item, index}) => {
  const dispatch = useDispatch<AppDispatch>();
  const ref = useRef<HTMLDivElement | null>(null);
  const [, drag] = useDrag({
    type: "ingredientSort",
    item: {item, index}
  });
  const [, drop] = useDrop({
    accept: "ingredientSort",
    hover(dragItem:BurgerConstructorItemProps) {
      if (dragItem.index !== index) {
        dispatch(sortIngredient({fromIndex: dragItem.index, toIndex: index}));
        dragItem.index = index;
      }
    }
  });

  drag(drop(ref));

  return (
    <>
      <div ref={ref} className="display-flex justify_content-center align_items-center" draggable>
        <DragIcon className="mr-2 cursor-grab" type="primary"/>
        <ConstructorElement
          key={item.uuid}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => dispatch(deleteIngredient(item.uuid))}
        />
      </div>
    </>
  )
}

interface BurgerConstructorItemProps {
  item: ConstructorIngredient;
  index: number;
}
