import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { deleteIngredient, sortIngredient } from "../../../services/burger-constructor/slice.ts";
import { BurgerConstructorItemProps } from "../../../utils/types.ts";
import styles from './burger-constructor-item.module.css';

const BurgerConstructorItem: React.FC<BurgerConstructorItemProps> = ({item, index}) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null);
  const [, drag] = useDrag({
    type: "ingredientSort",
    item: {item, index}
  });
  const [, drop] = useDrop({
    accept: "ingredientSort",
    hover(dragItem:BurgerConstructorItemProps) {
      if (dragItem.index !== index) {
        dispatch(sortIngredient({fromIndex: dragItem.index, toIndex: index}));
        dragItem.index = index; // Обновляем индекс для корректного перемещения
      }
    }
  });

  drag(drop(ref));

  const handleDelete = (index:number) => {
    dispatch(deleteIngredient(index));
  };

  // TODO сделать подсветку для пустых блоков

  return (
    <>
      <div ref={ref} className={`display-flex justify_content-center align_items-center ${styles.burgerConstructorItem} `} draggable>
        <DragIcon className="mr-2 cursor-grab" type="primary"/>
        <ConstructorElement
          key={item._id}
          text={item.name}
          price={item.price}
          thumbnail={item.image}
          handleClose={() => {
            handleDelete(index)
          }}
        />
      </div>
    </>
  )
}

export default BurgerConstructorItem