import React from "react";
import { useSelector } from "react-redux";
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { IngredientObj } from '../../utils/types.ts'
import { IngredientSection } from "./ingredient-section/ingredient-section.tsx";
import { IngredientItem } from "./ingredient-item/ingredient-item.tsx";
import { Modal } from "../modal/modal.tsx";
import { IngredientDetails } from "./ingredient-details/ingredient-details.tsx";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import styles from './burger-ingredients.module.css';

export const BurgerIngredients: React.FC = () => {
  const { ingredients } = useSelector(getIngredientsState);
  const [currentTab, setCurrentTab] = React.useState('bun')
  const [modalIngredient, setModalIngredient] = React.useState<IngredientObj | null>(null)

  const itemsBun = ingredients?.filter((product) => product.type === 'bun');
  const itemsSauce = ingredients?.filter((product) => product.type === 'sauce');
  const itemsMain = ingredients?.filter((product) => product.type === 'main');

  return (
    <>
      <section className="burgerColumn">
        <h1 className="mb-6 text_type_main-large">Соберите бургер</h1>
        <div className="mb-10 display-flex">
          <Tab value="bun" active={currentTab === 'bun'} onClick={setCurrentTab}>
            Булки
          </Tab>
          <Tab value="sauce" active={currentTab === 'sauce'} onClick={setCurrentTab}>
            Соусы
          </Tab>
          <Tab value="main" active={currentTab === 'main'} onClick={setCurrentTab}>
            Начинки
          </Tab>
        </div>

        <div className={`custom-scroll ${styles.ingredientsScroll}`}>
          <IngredientSection title="Булки">
            {itemsBun.map(item => <IngredientItem key={item._id} item={item} openModal={() => setModalIngredient(item)}/>)}
          </IngredientSection>
          <IngredientSection title="Соусы">
            {itemsSauce.map(item => <IngredientItem key={item._id} item={item} openModal={() => setModalIngredient(item)}/>)}
          </IngredientSection>
          <IngredientSection title="Начинки">
            {itemsMain.map(item => <IngredientItem key={item._id} item={item} openModal={() => setModalIngredient(item)}/>)}
          </IngredientSection>
        </div>
      </section>
      {modalIngredient &&
        <Modal title="Детали ингредиента" onClose={() => setModalIngredient(null)}>
          <IngredientDetails item={modalIngredient} />
        </Modal>
      }
    </>
  )

}
