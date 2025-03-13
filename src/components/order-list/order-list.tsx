import React from "react";
import { useSelector } from "../../services/store.ts";
import { getOrdersData as getOrderFeedData } from "../../services/order-feed/slice.ts";
import { getOrdersData as getProfileOrderData } from "../../services/profile-order/slice.ts";
import { OrderItem } from "../order-item/order-item.tsx";
import { useMatch } from "react-router-dom";

export const OrderList: React.FC = () => {
  const isProfile = useMatch("/profile/orders");

  const ordersData = useSelector(isProfile ? getProfileOrderData : getOrderFeedData);
  // const ordersData = useSelector(isProfile ? getProfileOrderData : getOrderFeedData);
  const sortedOrders = [...(ordersData?.orders || [])].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div>
      {sortedOrders.map((order) => (
          <OrderItem key={order._id} order={order} isProfile={!!isProfile} />
        )
      )}
    </div>
  )
}