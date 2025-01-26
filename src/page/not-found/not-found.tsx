import React from "react";
import { Link } from "react-router-dom";

export const NotFoundPage: React.FC = () => {

  return (
    <div className="container mb-10 mt-10 ">
      <h1 className="text_type_main-large">404 Ошибка</h1>
      <Link to="/">Вернуться на главную страницу</Link>
    </div>
  )
}