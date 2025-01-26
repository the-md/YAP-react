import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { Button, CurrencyIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Modal } from "../modal/modal.tsx";
import { OrderDetails } from "../order-details/order-details.tsx";
import { addIngredient, getConstructorState } from "../../services/burger-constructor/slice.ts";
import { closeModalOrder, getOpenModalOrder } from "../../services/order/slice.ts";
import { postOrderThunk } from "../../services/order/actions.ts";
import { BurgerConstructorItem } from "./burger-constructor-item/burger-constructor-item.tsx";
import { Ingredient } from "../../utils/types.ts";
import type { AppDispatch } from "../../services/store.ts";
import styles from './burger-constructor.module.css';

export const ConstructorEmptyItem: React.FC<ConstructorEmptyItemProps> = ({position}) => {
  const positionClassName:string = position === 'center' ? 'ml-8 mb-4 mt-4' : `constructor-element_pos_${position}`
  const positionText:string = position === 'center' ? 'Перенесите ингредиент' : 'Перенесите булку'
  return (
    <div className={`constructor-element text_align-center ${positionClassName} ${styles.emptyItem}`}>
      <p className="m-3">{positionText}</p>
    </div>
  )
}

export const BurgerConstructor: React.FC = () => {
  const {constructorIngredients, constructorBuns} = useSelector(getConstructorState);
  const openModal = useSelector(getOpenModalOrder);
  const dispatch = useDispatch<AppDispatch>()
  const [{ canDrop, draggingItemType }, dropTargetBun] = useDrop({
    accept: "ingredient",
    drop(ingredient:Ingredient) {
      dispatch(addIngredient(ingredient));
    },
    collect: (monitor) => ({
      canDrop: monitor.canDrop(),
      draggingItemType: monitor.getItem()?.type,
    }),
  });

  const totalPrice = useMemo(()=>{
    return constructorIngredients.reduce((sum, current) => sum + current.price, 0) + (constructorBuns ? constructorBuns.price * 2 : 0)
  }, [constructorIngredients, constructorBuns])

  const handleCreateOrder = () => {
    const order:string[] = [
      ...(constructorBuns ? [constructorBuns._id] : []),
      ...constructorIngredients.map(item => item._id),
    ];
    dispatch(postOrderThunk(order));
  }

  return (
    <>
      <section className={`burgerColumn ml-10 mt-25`}  ref={dropTargetBun}>
        <div className="ml-4 mr-4">
          <div className={`ml-8 ${canDrop && draggingItemType === "bun" ? styles.hoverItem : ''}`}>
            {!constructorBuns ? (
              <ConstructorEmptyItem position="top" />
            ) : (
              <ConstructorElement
                key={constructorBuns.uuid}
                type="top"
                isLocked={true}
                text={constructorBuns.name}
                price={constructorBuns.price}
                thumbnail={constructorBuns.image}
              />
            )}
          </div>
          <div className={` ${canDrop && draggingItemType !== "bun" ? styles.hoverItem : ''}`}>
            {!constructorIngredients.length ? (
              <ConstructorEmptyItem position="center" />
            ) : (
              <div className={`custom-scroll display-flex mb-4 mt-4 ${styles.constructorScroll}`}>
                {constructorIngredients.map((item, index) => (
                  <BurgerConstructorItem key={item.uuid} item={item} index={index}/>
                ))}
              </div>
            )}
          </div>
          <div className={`ml-8 ${canDrop && draggingItemType === "bun" ? styles.hoverItem : ''}`}>
            {!constructorBuns ? (
              <ConstructorEmptyItem position="bottom" />
            ) : (
              <ConstructorElement
                key={constructorBuns.uuid}
                type="bottom"
                isLocked={true}
                text={constructorBuns.name}
                price={constructorBuns.price}
                thumbnail={constructorBuns.image}
              />
            )}
          </div>
        </div>
        <div className="mt-10 mb-10 display-flex justify_content-end align_items-center">
          <div className="mr-10 display-flex justify_content-center">
            <span className="text_type_digits-medium mr-2">{totalPrice}</span>
            <CurrencyIcon className={styles.burgerConstructorTotalIcon} type="primary"/>
          </div>
          <Button onClick={() => handleCreateOrder()} htmlType="button" type="primary" size="medium" disabled={totalPrice == 0 && true}>
            Оформить заказ
          </Button>
        </div>
      </section>
      {openModal &&
        <Modal title="" onClose={() => dispatch(closeModalOrder())}>
          <OrderDetails />
        </Modal>
      }
    </>
  )
}

interface ConstructorEmptyItemProps {
  position: string
}
