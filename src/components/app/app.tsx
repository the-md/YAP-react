import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients.tsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.tsx";
import { useSelector } from "react-redux";
import { getAllIngredients } from "../../services/ingredients/slice.ts";

function App() {
  const ingredientsState = useSelector(getAllIngredients);

  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      <main className="container display-flex">
        {ingredientsState.loading && (
          <div className="loader-container display-flex justify_content-center align_items-center">
            <div className="spinner"></div>
          </div>
        )}
        {ingredientsState.error && <div style={{ color: "red" }}>{ingredientsState.error}</div>}
        {ingredientsState.ingredients &&
            <>
                <BurgerIngredients ingredients={ingredientsState.ingredients} />
                <BurgerConstructor ingredients={ingredientsState.ingredients} />
            </>
        }
      </main>
    </div>
)
}

export default App
