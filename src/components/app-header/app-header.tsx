import React from "react";
import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

export const AppHeader: React.FC = () => {
  return (
    <>
      <header className={styles.header}>
        <div className={`container display-grid align_items-center ${styles.wrapperHeader}`}>
          <nav className={`display-flex ${styles.navLeft}`}>
            <a className={`p-5 display-flex ${styles.headerLink}`} href="#"><BurgerIcon className="mr-2" type="primary"/>Конструктор</a>
            <a className={`p-5 ml-2 display-flex ${styles.headerLink}`} href="#"><ListIcon className="mr-2" type="primary"/>Лента заказов</a>
          </nav>
          <a className="display-flex" href="/">
            <Logo/>
          </a>
          <nav className={`display-flex justify_content-end align_items-center ${styles.navRight}`}>
            <a className={`p-5 display-flex ${styles.headerLink}`} href="#"><ProfileIcon className="mr-2" type="primary"/>Личный кабинет</a>
          </nav>
        </div>
      </header>
    </>
  )

}