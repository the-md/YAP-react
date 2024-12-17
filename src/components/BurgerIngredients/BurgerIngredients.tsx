import React from "react";
import { CurrencyIcon, Tab, Counter } from '@ya.praktikum/react-developer-burger-ui-components'
import {Ingredients} from '../../types/Ingredients.ts'
import styles from './BurgerIngredients.module.css';

const IngredientSection: React.FC<IngredientSectionProps> = ({title, type, ingredients}) => {
  return (
    <section className="mb-10">
      <h2 className={`mb-6 text_type_main-small ${styles.ingredientSectionTitle}`}>{title}</h2>
      <div className="display-flex flex_wrap-wrap">
        {ingredients.filter(item => item.type === type).map(item => <IngredientItem item={item}/>)}
      </div>
    </section>
  )
}

interface IngredientSectionProps {
  title: string;
  type: string;
  ingredients: Ingredients[];
}

const IngredientItem: React.FC<{ item: Ingredients }> = ({item}) => {
  return (
    <article className={`mb-8 ${styles.ingredientItem}`}>
      <div className="image">
        <img src={item.image} alt=""/>
      </div>
      <div className="m-1 text_type_digits-default">
        {item.price} <CurrencyIcon className={styles.priceIcon} type="primary" />
      </div>
      <div className={styles.ingredientName}>
        {item.name}
      </div>
      <Counter count={1} size="default" extraClass="m-1" />
    </article>
  )
}

const BurgerIngredients: React.FC<{ ingredients: Ingredients[] }> = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('bun')
  console.log('ingredients33', ingredients)

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