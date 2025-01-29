import React, { useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BurgerIngredients } from "../../components/burger-ingredients/burger-ingredients.tsx";
import { BurgerConstructor } from "../../components/burger-constructor/burger-constructor.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import type { AppDispatch } from "../../services/store.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import { Loading } from "../../components/loading/loading.tsx";


export const HomePage: React.FC = () => {
  const { ingredients, loading } = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch, ingredients]);

  if (loading) return (
    <Loading container={true}/>
  );
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