import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients.tsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.tsx";
import { getAllIngredients } from "../../services/ingredients/slice.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import type { AppDispatch } from '../../services/store';
import { IngredientsArray } from "../../utils/types.ts";
import { addIngredient } from "../../services/burger-constructor/slice.ts";

function App() {
  const { loading, error, ingredients } = useSelector(getAllIngredients);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  //delete
    // const bun = ingredients.find(item => item.type === "bun")
    // const ingredientsWithoutBun = ingredients.filter(item => item.type !== "bun")

  const randomIngredients: IngredientsArray[] = [];
  const num: number = 10;

  if (ingredients.length > 0) {
    for (let i = 0; i < num; i++) {
      const randomIndex = Math.floor(Math.random() * ingredients.length);
      const ingredient = ingredients[randomIndex];

      if (ingredient) {
        randomIngredients.push(ingredient);
      }
    }
  }
  console.log('randomIngredients', randomIngredients)

    useEffect(() => {
      setTimeout(() => {
        dispatch(addIngredient(randomIngredients));
      }, 1500);
    }, [dispatch, ingredients]);


  //delete

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
        <BurgerIngredients />
        <BurgerConstructor />
      </main>
    </div>
  )
}

export default App
