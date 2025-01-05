import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";
import { Button, CurrencyIcon, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './burger-constructor.module.css';
import Modal from "../modal/modal.tsx";
import OrderDetails from "../order-details/order-details.tsx";
import {
  addIngredient,
  deleteIngredient,
  getConstructorState
} from "../../services/burger-constructor/slice.ts";
// import { getIngredientsState } from "../../services/ingredients/slice.ts";
import { IngredientObj } from "../../utils/types.ts";

const BurgerConstructor: React.FC = () => {
  const [modalContent, setModalContent] = React.useState(false)
  const dispatch = useDispatch()
  // const { ingredients } = useSelector(getIngredientsState);
  const {constructorIngredients, bun} = useSelector(getConstructorState);
  const [{isHover}, dropTarget] = useDrop({
    accept: "ingredient",
    drop(ingredient:IngredientObj) {
      dispatch(addIngredient(ingredient));
      console.log('constructorIngredients', bun, constructorIngredients,)
    },
    collect: monitor => ({
      isHover: monitor.isOver(),
    })
  });
  const borderColor = isHover ? 'lightgreen' : 'transparent';
  // TODO сделать подсветку для пустых блоков

  const totalPrice = constructorIngredients.reduce((sum, current) => sum + current.price, 0) + bun.price
  // TODO сделать проверку, чтобы не было NaN

  const handleDelete = (index:number) => {
    dispatch(deleteIngredient(index));
  };
  console.log('boolean', !constructorIngredients.length)
  console.log('constructorIngredients', constructorIngredients)

  return (
    <>
      <section className="burgerColumn ml-10 mt-25">
        <div className="ml-4 mr-4" ref={dropTarget} style={{borderColor}}>
          <div className="ml-8 mb-4">
            {Object.keys(bun).length === 0 ? (
              <div className="constructor-element constructor-element_pos_top text_align-center">
                <p className="m-3">Выберите булки</p>
              </div>
            ) : (
              <ConstructorElement
                key={'bun_1'}
                type="top"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}
          </div>
          <div className={`custom-scroll display-flex ${styles.constructorScroll}`}>
            {!constructorIngredients.length ? (
              <div className="display-flex justify_content-center align_items-center">
                <div className="ml-7 constructor-element text_align-center">
                  <p className="m-3">Выберите начинку</p>
                </div>
              </div>
            ) : (
              <>
              {constructorIngredients.map((item, index) => (
                  <div key={index} className="display-flex justify_content-center align_items-center">
                    <DragIcon className="mr-2" type="primary" />
                    <ConstructorElement
                      key={item._id}
                      text={item.name}
                      price={item.price}
                      thumbnail={item.image}
                      handleClose={()=>{handleDelete(index)}}
                    />
                  </div>
                ))}
              </>
            )}
          </div>
          <div className="ml-8 mt-4">
            {Object.keys(bun).length === 0 ? (
              <div className="constructor-element constructor-element_pos_bottom text_align-center">
                <p className="m-3">Выберите булки</p>
              </div>
            ) : (
              <ConstructorElement
                key={'bun_2'}
                type="bottom"
                isLocked={true}
                text={bun.name}
                price={bun.price}
                thumbnail={bun.image}
              />
            )}

          </div>
        </div>
        <div className="mt-10 mb-10 display-flex justify_content-end align_items-center">
          <div className="mr-10 display-flex justify_content-center">
            <span className="text_type_digits-medium mr-2">{totalPrice}</span>
            <CurrencyIcon className={styles.burgerConstructorTotalIcon} type="primary"/>
          </div>
          <Button onClick={() => setModalContent(true)} htmlType="button" type="primary" size="medium">
            Оформить заказ
          </Button>
        </div>
      </section>
      {modalContent &&
        <Modal title="" onClose={() => setModalContent(false)}>
          <OrderDetails />
        </Modal>
      }
    </>
  )
}

export default BurgerConstructor