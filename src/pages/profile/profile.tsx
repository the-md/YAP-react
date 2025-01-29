import React from "react";
import styles from "./profile.module.css"
import { NavLink, Outlet, useMatch } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogout } from "../../services/user/actions.ts";
import type { AppDispatch } from "../../services/store.ts";

export const ProfilePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const matchOrders = useMatch("/profile/orders")
  const handleLogout = () => {
    dispatch(onLogout())
  }

  return (
    <div className="container text_align-center mt-30 mb-10">
      <div className={`display-grid ${styles.blockGrid}`}>
        <div className={`mr-15 ${styles.leftBlock}`}>
          <ul className={styles.menu}>
            <li>
              <NavLink
                to='/profile'
                className={({isActive}) => (isActive ? styles.linkActive : "")}
                end
              >
                Профиль
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/profile/orders'
                className={({isActive}) => (isActive ? styles.linkActive : "")}
              >
                История заказов
              </NavLink>
            </li>
            <li>
              <button
                className='text_type_main-default'
                onClick={handleLogout}
              >
                Выход
              </button>
            </li>
          </ul>
          <p className={`mt-20 ${styles.caption}`}>
            В этом разделе вы можете {matchOrders ? 'просмотреть свою историю заказов' : 'изменить свои персональные данные'}
          </p>
        </div>
        <Outlet/>
      </div>
    </div>
  )
}