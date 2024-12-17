import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import {IngredientsArray} from '../../types/ingredients-array.ts'
import styles from './burger-ingredients.module.css';
import IngredientSection from "./ingredient-section/ingredient-section.tsx";


const BurgerIngredients: React.FC<{ ingredients: IngredientsArray[] }> = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('bun')

  return (
    <section className="burgerColumn">
      <h1 className="text_type_main-large">Соберите бургер</h1>
      <div className="mb-10 display-flex">
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={styles.ingredientsScroll}>
        <IngredientSection title="Булки" type="bun" ingredients={ingredients} />
        <IngredientSection title="Соусы" type="sauce" ingredients={ingredients} />
        <IngredientSection title="Начинки" type="main" ingredients={ingredients} />
      </div>
    </section>
  )

}

export default BurgerIngredients