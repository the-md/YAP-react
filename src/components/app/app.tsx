import React, { useEffect } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AppHeader } from '../app-header/app-header'
import { OnlyAuth, OnlyUnAuth } from "../protected-route/protected-route.tsx";
import type { AppDispatch } from "../../services/store.ts";
import { checkUserAuth } from "../../services/user/actions.ts";
import { Modal } from "../modal/modal.tsx";
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
import { OrderFeedDetails } from "../order-feed-details/order-feed-details.tsx";

export const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(checkUserAuth());
  }, [dispatch]);

  const location = useLocation();
  const navigate = useNavigate();
  const background = location.state && location.state.background;

  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      <Routes location={background || location}>
        <Route path="/" element={<HomePage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/feed/:orderId" element={<OrderFeedDetails />} />
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
            path='/ingredients/:ingredientId'
            element={
              <Modal title="Детали ингредиента" onClose={()=>navigate(-1)}>
                <IngredientPage isModal={true} />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  )
}
