import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css';

function AppHeader() {
  return (
    <>
      <header className={styles.header}>
        <div className={`container ${styles.wrapperHeader}`}>
          <nav className={styles.navLeft}>
            <a className={styles.headerLink} href="#"><BurgerIcon className="mr-2" type="primary"/>Конструктор</a>
            <a className={`ml-2 ${styles.headerLink}`} href="#"><ListIcon className="mr-2" type="primary"/>Лента заказов</a>
          </nav>
          <a className={styles.logo} href="/">
            <Logo/>
          </a>
          <nav className={styles.navRight}>
            <a className={styles.headerLink} href="#"><ProfileIcon className="mr-2" type="primary"/>Личный кабинет</a>
          </nav>
        </div>
      </header>
    </>
  )

}

export default AppHeader