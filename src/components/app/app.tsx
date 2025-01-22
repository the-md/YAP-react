import React from "react";
import { Route, Routes } from "react-router-dom";
import { AppHeader } from '../app-header/app-header'
import { Home } from "../../page/home.tsx";
import { Login } from "../../page/login.tsx";
import { Register } from "../../page/reset-password.tsx";
import { ForgotPassword } from "../../page/forgot-password.tsx";
import { ResetPassword } from "../../page/register.tsx";
import { NotFound404 } from "../../page/not-found.tsx";

export const App: React.FC = () => {

  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound404/>}/>
      </Routes>
    </div>
  )
}
