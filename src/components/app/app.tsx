import React from "react";
import { AppHeader } from '../app-header/app-header'
import { Home } from "../../page/home.tsx";

export const App: React.FC = () => {

  return (
    <div className="wrapper text_type_main-default">
      <AppHeader/>
      <Home/>
    </div>
  )
}
