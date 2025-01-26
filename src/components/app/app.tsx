import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { AppHeader } from '../app-header/app-header'
import { HomePage } from "../../page/home/home.tsx";
import { LoginPage } from "../../page/login/login.tsx";
import { ResetPasswordPage } from "../../page/reset-password/reset-password.tsx";
import { ForgotPasswordPage } from "../../page/forgot-password/forgot-password.tsx";
import { RegisterPage } from "../../page/register/register.tsx";
import { NotFoundPage } from "../../page/not-found/not-found.tsx";
import { IngredientPage } from "../../page/ingredient-page/ingredient-page.tsx";
import { useDispatch, useSelector } from "react-redux";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import type { AppDispatch } from "../../services/store.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import { checkUserAuth } from "../../services/user/actions.ts";
import { Modal } from "../modal/modal.tsx";
import { ProfilePage } from "../../page/profile/profile.tsx";
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route.tsx";
import { ProfileUser } from "../../page/profile/profile-user.tsx";
import { ProfileOrder } from "../../page/profile/profile-order.tsx";

export const App: React.FC = () => {
  const { loading, error } = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  useEffect(() => {
    dispatch(checkUserAuth());
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
        <Route path="/" element={<HomePage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage />} />
        <Route path="/login" element={<OnlyUnAuth component={<LoginPage />} />} />
        <Route path="/register" element={<OnlyUnAuth component={<RegisterPage />} />} />
        <Route path="/forgot-password" element={<OnlyUnAuth component={<ForgotPasswordPage />} />} />
        <Route path="/reset-password" element={<OnlyUnAuth component={<ResetPasswordPage />} />} />
        <Route path="/profile" element={<OnlyAuth component={<ProfilePage />} />} >
          <Route index element={<ProfileUser />} />
          <Route path="orders" element={<ProfileOrder />} />
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
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
