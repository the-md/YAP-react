import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';
import { Link, NavLink } from "react-router-dom";

export const AppHeader: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={`container display-grid align_items-center ${styles.wrapperHeader}`}>
          <nav className={`display-flex ${styles.navLeft}`}>
            <NavLink
              to={`/`}
              className={`p-5 display-flex ${styles.headerLink}`}
            >
              {({ isActive }) => (
                <>
                  <BurgerIcon
                    className="mr-2"
                    type={isActive ? 'primary' : 'secondary'}
                  />
                  <span className={isActive ? styles.headerLinkActive : ""}>Конструктор</span>
                </>
              )}
            </NavLink>
            <NavLink
              to={`/feed`}
              className={`p-5 display-flex ${styles.headerLink}`}
            >
              {({ isActive }) => (
                <>
                  <ListIcon
                    className="mr-2"
                    type={isActive ? 'primary' : 'secondary'}
                  />
                  <span className={isActive ? styles.headerLinkActive : ""}>Лента заказов</span>
                </>
              )}
            </NavLink>
          </nav>
          <Link className="display-flex" to="/">
            <Logo/>
          </Link>
          <nav className={`display-flex justify_content-end align_items-center ${styles.navRight}`}>
            <NavLink
              to={`/profile`}
              className={`p-5 display-flex ${styles.headerLink}`}
            >
              {({ isActive }) => (
                <>
                  <ProfileIcon
                    className="mr-2"
                    type={isActive ? 'primary' : 'secondary'}
                  />
                  <span className={isActive ? styles.headerLinkActive : ""}>Личный кабинет</span>
                </>
              )}
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  )

}