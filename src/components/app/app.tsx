import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from '../app-header/app-header'
import { Home } from "../../page/home/home.tsx";
import { Login } from "../../page/login/login.tsx";
import { Register } from "../../page/reset-password/reset-password.tsx";
import { ForgotPassword } from "../../page/forgot-password/forgot-password.tsx";
import { ResetPassword } from "../../page/register/register.tsx";
import { NotFound404 } from "../../page/not-found/not-found.tsx";
import { IngredientPage } from "../../page/ingredient-page/ingredient-page.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import type { AppDispatch } from "../../services/store.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import { Modal } from "../modal/modal.tsx";



export const App: React.FC = () => {
  const { loading, error } = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  const handleModalClose = () => {
    // Возвращаемся к предыдущему пути при закрытии модалки
    navigate(-1);
  };

  if (loading) return (
    <div className="container display-flex">
      <div className="loader-container display-flex justify_content-center align_items-center">
        <div className="spinner"></div>
      </div>
    </div>
  );
  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      {error && <div className="container error-text">{error}</div>}
      <Routes location={background || location}>
        <Route path="/" element={<Home />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound404/>}/>
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/ingredients/:ingredientId'
            element={
              <Modal title="Детали ингредиента" onClose={handleModalClose}>
                <IngredientPage isModal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  )
}
