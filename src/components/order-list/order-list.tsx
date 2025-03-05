import { useSelector } from "../../services/store.ts";
import { getOrdersData } from "../../services/order-feed/slice.ts";
import styles from "./order-list.module.css";
import { OrderItem } from "../order-item/order-item.tsx";


export const OrderList = () => {
  const ordersData = useSelector(getOrdersData);
  return (
    <section className={`containerColumn custom-scroll ${styles.orderScroll}`} >
      {ordersData?.orders.slice(0, 10).map((order) => (
          <OrderItem order={order} />
        )
      )}
    </section>
  )
}