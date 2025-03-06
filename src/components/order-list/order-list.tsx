import { useSelector } from "../../services/store.ts";
import { getOrdersData } from "../../services/order-feed/slice.ts";
import styles from "./order-list.module.css";
import { OrderItem } from "../order-item/order-item.tsx";


export const OrderList = () => {
  const ordersData = useSelector(getOrdersData);
  return (
    <section className={`pr-2 containerColumn custom-scroll ${styles.orderScroll}`} >
      {ordersData?.orders.map((order) => (
          <OrderItem key={order._id} order={order} />
        )
      )}
    </section>
  )
}