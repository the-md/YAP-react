import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { useDrag, useDrop } from "react-dnd";
import { ConstructorElement, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { addIngredient, deleteIngredient } from "../../../services/burger-constructor/slice.ts";
import { BurgerConstructorItemProps, IngredientObj } from "../../../utils/types.ts";
import styles from './burger-constructor-item.module.css';

const BurgerConstructorItem: React.FC<BurgerConstructorItemProps> = ({item, index}) => {
  const dispatch = useDispatch()
  const ref = useRef<HTMLDivElement>(null);
  const [{isDrag}, drag] = useDrag({
    type: "ingredient",
    item: item,
    collect: monitor => ({
      isDrag: monitor.isDragging()
    })
  });
  const [{isHover}, drop] = useDrop({
    accept: "ingredient",
    drop(ingredient:IngredientObj) {
      dispatch(addIngredient(ingredient));
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });

  drag(drop(ref));

  const handleDelete = (index:number) => {
    dispatch(deleteIngredient(index));
  };

  // TODO сделать подсветку для пустых блоков

  return (
    !isDrag &&
    <>
      <div ref={ref} className={`display-flex justify_content-center align_items-center ${styles.burgerConstructorItem} ${isHover ? styles.highlight : ''}`}>
        <DragIcon className="mr-2" type="primary"/>
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