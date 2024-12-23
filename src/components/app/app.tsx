import React from "react";
import { API_URL } from "../../utils/constants.ts";
import AppHeader from '../app-header/app-header'
import BurgerIngredients from "../burger-ingredients/burger-ingredients.tsx";
import BurgerConstructor from "../burger-constructor/burger-constructor.tsx";

function App() {
  const [state, setState] = React.useState({
    data: null,
    isLoading: false,
    error: null,
  })

  const getProductData = () => {
    setState((prevState) => ({ ...prevState, error: null, isLoading: true }));
    fetch(`${API_URL}/ingredients`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json()
      })
      .then(({data}) => setState((prevState) => ({...prevState, data, isLoading: false})))
      .catch((err) => {
        setState((prevState) => ({ ...prevState, error: err.message, isLoading: false }));
      });
  };

  React.useEffect(() => {
    getProductData();
  }, []);

  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      <main className="container display-flex">
        {state.isLoading && (
          <div className="loader-container display-flex justify_content-center align_items-center">
            <div className="spinner"></div>
          </div>
        )}
        {state.error && <div style={{ color: "red" }}>{state.error}</div>}
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
