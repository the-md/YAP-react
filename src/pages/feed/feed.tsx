import React, { useEffect } from "react";
import styles from './feed.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { type AppDispatch, useDispatch, useSelector } from "../../services/store.ts";
import { useLocation } from "react-router-dom";
import { getOrdersData, wsClose } from "../../services/order-feed/slice.ts";
import { BURGER_API_WSS } from "../../utils/api.ts";

import { wsConnect } from "../../services/order-feed/actions.ts";
import { OrderTotal } from "../../components/order-total/order-total.tsx";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";

const OrderNumber = ({num}) => {
  return num.toString().padStart(6, '0')
}
const OrderIngredients = ({ingredients}) => {
  const { ingredients: storeIngredients } = useSelector(getIngredientsState);
  const matchedIngredients = ingredients.map(ingredientId =>
    storeIngredients.find(item => item._id === ingredientId)
  ).filter(Boolean);
  return (
    <ul className={`${styles.orderIngredients}`}>
      {matchedIngredients.slice(0, 6).map((ingredient, index) => (
        <li key={ingredient._id+index} className={`${styles.orderIngredientItem}`}>
          <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.orderIngredientImage}/>
          {index === 5 && (
            <p className={styles.orderIngredientCount}>+{matchedIngredients.length - 5}</p>
          )}
        </li>
      ))}
    </ul>
  )
}

const OrderList = () => {
  const ordersData = useSelector(getOrdersData);
  return (
    <section className="containerColumn">
      {ordersData?.orders.slice(0, 10).map((order) => (
        <div key={order._id} className={`p-6 mb-4 ${styles.orderItem}`}>
          <div className="display-flex justify_content-space-between">
            <div className="text_type_digits-default"><OrderNumber num={order.number}/></div>
            <div className="text_color_inactive text_type_main-default">
                <FormattedDate date={new Date(`${order.createdAt}`)}/>
              </div>
            </div>
            <div className="mt-6 mb-6 text_type_main-medium">{order.name}</div>
            <div className="display-flex justify_content-space-between align_items-center">
              <OrderIngredients ingredients={order.ingredients} />
              <div className="ml-6 text_type_digits-default">
                480 <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
              </div>
            </div>
          </div>
        )
      )}
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
            {orderDone.slice(0, 10).map((order) => (
              <li key={order._id}>
                <OrderNumber num={order.number} />
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text_type_main-medium mb-6">В работе:</div>
          <ul className={`text_type_digits-default ${styles.orderTableList}`}>
            {orderInProgress.slice(0, 10).map((order) => (
              <li key={order._id}>
                <OrderNumber num={order.number} />
              </li>
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
  const { ingredients } = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();


  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch, ingredients]);

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