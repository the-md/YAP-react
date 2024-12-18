import React from "react";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientsArray } from '../../types'
import styles from './burger-ingredients.module.css';
import IngredientSection from "./ingredient-section/ingredient-section.tsx";
import IngredientItem from "./ingredient-item/ingredient-item.tsx";
import Modal from "../modal/modal.tsx";
import IngredientDetails from "./ingredient-details/ingredient-details.tsx";


const BurgerIngredients: React.FC<{ ingredients: IngredientsArray[] }> = ({ ingredients }) => {
  const [current, setCurrent] = React.useState('bun')
  const [modalItem, setModalItem] = React.useState<IngredientsArray | null>(null)

  const itemsBun = React.useMemo(() => ingredients.filter(item => item.type === 'bun'), [ingredients])
  const itemsSauce = React.useMemo(() => ingredients.filter(item => item.type === 'sauce'), [ingredients])
  const itemsMain = React.useMemo(() => ingredients.filter(item => item.type === 'main'), [ingredients])

  return (
    <>
      <section className="burgerColumn">
        <h1 className="mb-6 text_type_main-large">Соберите бургер</h1>
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

        <div className={`custom-scroll ${styles.ingredientsScroll}`}>
          <IngredientSection title="Булки">
            {itemsBun.map(item => <IngredientItem key={item._id} item={item} openModal={() => setModalItem(item)}/>)}
          </IngredientSection>
          <IngredientSection title="Соусы">
            {itemsSauce.map(item => <IngredientItem key={item._id} item={item} openModal={() => setModalItem(item)}/>)}
          </IngredientSection>
          <IngredientSection title="Начинки">
            {itemsMain.map(item => <IngredientItem key={item._id} item={item} openModal={() => setModalItem(item)}/>)}
          </IngredientSection>
        </div>
      </section>
      {modalItem &&
        <Modal title="Детали ингредиента" onClose={() => setModalItem(null)}>
          <IngredientDetails item={modalItem} />
        </Modal>
      }
    </>
  )

}

export default BurgerIngredients