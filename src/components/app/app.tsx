import React, { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppHeader } from '../app-header/app-header'
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route.tsx";
import { AppDispatch, useSelector } from "../../services/store.ts";
import { checkUserAuth } from "../../services/user/actions.ts";
import { HomePage } from "../../pages/home/home.tsx";
import { LoginPage } from "../../pages/login/login.tsx";
import { ResetPasswordPage } from "../../pages/reset-password/reset-password.tsx";
import { ForgotPasswordPage } from "../../pages/forgot-password/forgot-password.tsx";
import { RegisterPage } from "../../pages/register/register.tsx";
import { NotFoundPage } from "../../pages/not-found/not-found.tsx";
import { IngredientPage } from "../../pages/ingredient-page/ingredient-page.tsx";
import { ProfilePage } from "../../pages/profile/profile.tsx";
import { ProfileUser } from "../../pages/profile/profile-user/profile-user.tsx";
import { ProfileOrder } from "../../pages/profile/profile-order/profile-order.tsx";
import { FeedPage } from "../../pages/feed/feed.tsx";
import { OrderPage } from "../../pages/order-page/order-page.tsx";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import { Loading } from "../loading/loading.tsx";

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { ingredients, loading } = useSelector(getIngredientsState);

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch, ingredients]);

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();
  const background = location.state && location.state.background;

  if (loading) return (
    <Loading container={true}/>
  );

  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:orderId" element={<OrderPage />} />
        <Route path="/ingredients/:ingredientId" element={<IngredientPage isModal={false} />} />
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
            path='/feed/:orderId'
            element={<OrderPage isModal={true} />}
          />

          <Route
            path='/ingredients/:ingredientId'
            element={<IngredientPage isModal={true} />}
          />
        </Routes>
      )}
    </div>
  )
}
