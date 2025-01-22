import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../components/burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../components/burger-constructor/burger-constructor.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsState } from "../services/ingredients/slice.ts";
import type { AppDispatch } from "../services/store.ts";
import { loadIngredients } from "../services/ingredients/actions.ts";

export const Home: React.FC = () => {
  const { loading, error } = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  if (loading) return (
    <div className="container display-flex">
      <div className="loader-container display-flex justify_content-center align_items-center">
        <div className="spinner"></div>
      </div>
    </div>
  );
  return (
    <div className="container">
      <h1 className="mb-5 mt-10 text_type_main-large">Соберите бургер</h1>
      <main className="container display-flex">
        {error && <div className="error-text">{error}</div>}
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients/>
          <BurgerConstructor/>
        </DndProvider>
      </main>
    </div>
  )
}