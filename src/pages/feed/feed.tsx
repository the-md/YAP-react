import React from "react";
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";

const OrderList = () => {
  return (
    <section className="containerColumn">
      <div className={`p-6 ${styles.orderItem}`}>
        <div className="display-flex justify_content-space-between">
          <div className="text_type_digits-default">#034535</div>
          <div className="text_color_inactive text_type_main-default">
            <FormattedDate date={new Date('2025-03-01T10:33:32.877Z')} />
          </div>
        </div>
        <div className="mt-6 mb-6 text_type_main-medium">Death Star Starship Main бургер</div>
        <div className="display-flex justify_content-space-between align_items-center">
          <ul className={`${styles.orderIngredients}`}>
            <li className={`${styles.orderIngredientItem}`}></li>
            <li className={`${styles.orderIngredientItem}`}></li>
            <li className={`${styles.orderIngredientItem}`}></li>
            <li className={`${styles.orderIngredientItem}`}></li>
            <li className={`${styles.orderIngredientItem}`}></li>
            <li className={`${styles.orderIngredientItem}`}></li>
          </ul>
          <div className="ml-6 text_type_digits-default">
            480 <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
          </div>
        </div>
      </div>
    </section>
  )
}

const OrderDashboard = () => {
  return (
    <section className="containerColumn ml-15">
      <div className={`display-flex mb-15 ${styles.orderTable}`}>
        <div>
          <div className="text_type_main-medium mb-6">Готовы:</div>
          <ul className={`text_type_digits-default text_color_turquoise ${styles.orderTableList}`}>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
          </ul>
        </div>
        <div>
          <div className="text_type_main-medium mb-6">В работе:</div>
          <ul className={`text_type_digits-default ${styles.orderTableList}`}>
            <li>034533</li>
            <li>034533</li>
            <li>034533</li>
          </ul>
        </div>
      </div>
      <div>
        <div className={`text_type_main-medium`}>Выполнено за все время:</div>
        <div className={`text_type_digits-large mb-15 text_shadow-number`}>28 752</div>
      </div>
      <div>
        <div className={`text_type_main-medium`}>Выполнено за сегодня:</div>
        <div className={`text_type_digits-large mb-15 text_shadow-number`}>138</div>
      </div>
    </section>
  )
}
export const FeedPage: React.FC = () => {
  return (
    <div className="container">
      <h1 className="mb-5 mt-10 text_type_main-large">Лента заказов</h1>
      <main className="container display-flex">
        <OrderList />
        <OrderDashboard />
      </main>
    </div>
  )
}