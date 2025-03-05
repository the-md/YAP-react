import { useSelector } from "../../services/store.ts";
import { getOrdersData } from "../../services/order-feed/slice.ts";
import styles from "./order-dashboard.module.css";
import { OrderTotal } from "../order-total/order-total.tsx";

export const OrderDashboard = () => {
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
                {order.number.toString().padStart(6, '0')}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text_type_main-medium mb-6">В работе:</div>
          <ul className={`text_type_digits-default ${styles.orderTableList}`}>
            {orderInProgress.slice(0, 10).map((order) => (
              <li key={order._id}>
                {order.number.toString().padStart(6, '0')}
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