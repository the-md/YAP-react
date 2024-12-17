import React from "react";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients.tsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.tsx";

function App() {
  const [state, setState] = React.useState({
    data: null,
    isLoading: false,
    hasError: false,
  })
  const URL = 'https://norma.nomoreparties.space'

  const getProductData = () => {
    setState((prevState) => ({ ...prevState, hasError: false, isLoading: true }));
    fetch(`${URL}/api/ingredients`)
      .then((res) => res.json())
      .then(({ data }) => setState((prevState) => ({ ...prevState, data, isLoading: false })))
      .catch(() => {
        setState((prevState) => ({ ...prevState, hasError: true, isLoading: false }));
      });
  };

  React.useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="wrapper text text_type_main-default">
      <AppHeader/>
      <main className="container display-flex">
        {state.isLoading && 'Загрузка ...'}
        {state.data &&
            <>
                <BurgerIngredients ingredients={state.data} />
                <BurgerConstructor ingredients={state.data} />
            </>
        }
      </main>
    </div>
)
}

export default App
