import { useSelector } from "../../services/store.ts";
import { getOrdersData } from "../../services/order-feed/slice.ts";
import { OrderItem } from "../order-item/order-item.tsx";

export const OrderList = () => {
  const ordersData = useSelector(getOrdersData);
  const sortedOrders = [...(ordersData?.orders || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  console.log('ordersData', ordersData)

  return (
    <div>
      {sortedOrders.map((order) => (
          <OrderItem key={order._id} order={order} />
        )
      )}
    </div>
  )
}