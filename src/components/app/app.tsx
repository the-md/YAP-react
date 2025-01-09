import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { AppHeader } from '../app-header/app-header'
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.tsx";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import type { AppDispatch } from '../../services/store';

export const App: React.FC = () => {
  const { loading, error } = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  if (loading) return (
    <main className="container display-flex">
      <div className="loader-container display-flex justify_content-center align_items-center">
        <div className="spinner"></div>
      </div>
    </main>
  );
  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      <main className="container display-flex">
        {error && <div style={{ color: "red" }}>{error}</div>}
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  )
}
