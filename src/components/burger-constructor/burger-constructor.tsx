import { Button, CurrencyIcon, ConstructorElement, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import React from "react";
import { IngredientsArray } from "../../types";
import styles from './burger-constructor.module.css';

const BurgerConstructor: React.FC<{ ingredients: IngredientsArray[] }> = ({ ingredients }) => {
  const bun = ingredients.find(item => item.type === "bun")
  const ingredientsWithoutBun = ingredients.filter(item => item.type !== "bun")
  const randomIngredients: IngredientsArray[] = [];
  const num: number = 10;
  for (let i = 0; i < num; i++) {
    const randomIndex = Math.floor(Math.random() * ingredientsWithoutBun.length);
    randomIngredients.push(ingredientsWithoutBun[randomIndex]);
  }
  return (
    <section className="burgerColumn ml-10 mt-25">
      <div className="ml-4 mr-4">
        <div className="ml-8 mb-4">
          {bun &&
              <ConstructorElement
                  key={'bun_1'}
                  type="top"
                  isLocked={true}
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image}
              />
          }
        </div>
        <div className={`custom-scroll ${styles.constructorScroll}`}>
          {randomIngredients.map((item, index) => (
            <div key={index} className="display-flex justify_content-center align_items-center">
              <DragIcon className="mr-2" type="primary" />
              <ConstructorElement
                key={item._id}
                text={item.name}
                price={item.price}
                thumbnail={item.image}
              />
            </div>
          ))}
        </div>
        <div className="ml-8 mt-4">
          {bun &&
              <ConstructorElement
                  key={'bun_2'}
                  type="bottom"
                  isLocked={true}
                  text={bun.name}
                  price={bun.price}
                  thumbnail={bun.image}
              />
          }
        </div>
      </div>
      <div className="mt-10 mb-10 display-flex justify_content-end align_items-center">
        <div className="mr-10 display-flex justify_content-center">
          <span className="text_type_digits-medium mr-2">610</span>
          <CurrencyIcon className={styles.burgerConstructorTotalIcon} type="primary"/>
        </div>
        <Button htmlType="button" type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </section>
  )
}

export default BurgerConstructor