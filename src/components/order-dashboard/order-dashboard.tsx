import { useSelector } from "../../services/store.ts";
import { getOrdersData } from "../../services/order-feed/slice.ts";
import styles from "./order-dashboard.module.css";
import { OrderTotal } from "../order-total/order-total.tsx";
import { Order } from "../../utils/types.ts";

export const OrderDashboard = () => {
  const ordersData = useSelector(getOrdersData);
  const orderDone = ordersData?.orders?.filter((product) => product.status === 'done') ?? [];
  const orderInProgress = ordersData?.orders?.filter((product) => product.status !== 'done') ?? [];
  console.log(orderDone)
  return (
    <section className="containerColumn ml-15">
      <div className={`display-flex mb-15 ${styles.orderTable}`}>
        <OrderColumn orders={orderDone} status="done" />
        <OrderColumn orders={orderInProgress} status="inprogress" />
      </div>
      <OrderTotal title="Выполнено за все время:" sum={ordersData?.total ?? 0} />
      <OrderTotal title="Выполнено за сегодня:" sum={ordersData?.totalToday ?? 0} />
    </section>
  )
}

const OrderColumn = ({orders, status}: OrderColumnProps) => {
  const MAX_ITEMS = 18;
  const COLUMN_SIZE = 6;

  const limitedOrders = orders.slice(0, MAX_ITEMS); // Ограничиваем до 18 элементов

  const columns = Array.from({ length: Math.ceil(limitedOrders.length / COLUMN_SIZE) }, (_, i) =>
    limitedOrders.slice(i * COLUMN_SIZE, i * COLUMN_SIZE + COLUMN_SIZE)
  );

  return (
    <div>
      <div className="text_type_main-medium mb-6">{status === 'done'? 'Готовы:' : 'В работе:'}</div>
      <div className={`display-flex ${styles.orderColumns}`}>
        {columns.map((column, index) => (
          <ul key={index} className={`text_type_digits-default ${status === 'done'? 'text_color_turquoise' : ''} ${styles.orderTableList}`}>
            {column.map((order) => (
              <li key={order._id}>
                {order.number.toString().padStart(6, "0")}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  )
}

interface OrderColumnProps {
  orders: Order[];
  status: string;
}