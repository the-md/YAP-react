import React from "react";
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients.tsx";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor.tsx";

function App() {
  const [state, setState] = React.useState({
    data: null,
    isLoading: false,
    hasError: false,
  })
  const URL = 'https://norma.nomoreparties.space'

  const getProductData = React.useCallback(() => {
    setState({ ...state, hasError: false, isLoading: true });
    fetch(`${URL}/api/ingredients`)
      .then(res => res.json())
      .then(({ data }) => setState({ ...state, data, isLoading: false }))
      .catch(() => {
        setState({ ...state, hasError: true, isLoading: false });
      });
  }, []);

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
