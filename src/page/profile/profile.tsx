import React from "react";
import styles from "./profile.module.css"
import { NavLink, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogout } from "../../services/user/actions.ts";

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(onLogout())
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <div className={`display-grid ${styles.profileBlock}`}>
        <div className={`mr-15 ${styles.leftBlock}`}>
          <ul className={styles.profileMenu}>
            <li>
              <NavLink
                to='/profile'
                className={({isActive}) => (isActive ? styles.profileLinkActive : "")}
                end
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/profile/orders'
                className={({isActive}) => (isActive ? styles.profileLinkActive : "")}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/login'
                onClick={handleLogout}
              >
                Выход
              </NavLink>
            </li>
          </ul>
          <p className={`mt-20 ${styles.caption}`}>В этом разделе вы можете изменить свои персональные данные</p>
        </div>

        <Outlet/>
      </div>
    </div>
  )
}