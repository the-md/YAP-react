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
