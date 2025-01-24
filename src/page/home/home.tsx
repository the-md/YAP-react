import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor.tsx";


export const Home: React.FC = () => {

  return (
    <div className="container">
      <h1 className="mb-5 mt-10 text_type_main-large">Соберите бургер</h1>
      <main className="container display-flex">
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </div>
  )
}