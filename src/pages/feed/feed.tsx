import React, { useEffect } from "react";
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "../../services/store.ts";
import { useLocation } from "react-router-dom";
import { getOrdersData, getStatus, wsClose } from "../../services/order-feed/slice.ts";
import { BURGER_API_WSS } from "../../utils/api.ts";

import { wsConnect } from "../../services/order-feed/actions.ts";
import { OrderTotal } from "../../components/order-total/order-total.tsx";


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
  const ordersData = useSelector(getOrdersData);
  const orderDone = ordersData?.orders?.filter((product) => product.status === 'done') ?? [];
  const orderInProgress = ordersData?.orders?.filter((product) => product.status !== 'done') ?? [];
  return (
    <section className="containerColumn ml-15">
      <div className={`display-flex mb-15 ${styles.orderTable}`}>
        <div>
          <div className="text_type_main-medium mb-6">Готовы:</div>
          <ul className={`text_type_digits-default text_color_turquoise ${styles.orderTableList}`}>
            {orderDone.slice(0, 10).map((item) => (
              <li key={item._id}>{item.number.toString().padStart(6, '0')}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text_type_main-medium mb-6">В работе:</div>
          <ul className={`text_type_digits-default ${styles.orderTableList}`}>
            {orderInProgress.slice(0, 10).map((item) => (
              <li key={item._id}>{item.number.toString().padStart(6, '0')}</li>
            ))}
          </ul>
        </div>
      </div>
      <OrderTotal title="Выполнено за все время:" sum={ordersData?.total ?? 0} />
      <OrderTotal title="Выполнено за сегодня:" sum={ordersData?.totalToday ?? 0} />
    </section>
  )
}
export const FeedPage: React.FC = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const status = useSelector(getStatus);
  const ordersData = useSelector(getOrdersData);

  console.log('status', status)
  console.log('orderData', ordersData)

  useEffect(() => {
    dispatch(wsConnect(`${BURGER_API_WSS}/orders/all`));
    return () => {
      dispatch(wsClose());
    };
  }, [location.pathname, dispatch]);

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