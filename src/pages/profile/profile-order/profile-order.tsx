import React, { useEffect } from "react";
import { OrderList } from "../../../components/order-list/order-list.tsx";
import { type AppDispatch, useDispatch, useSelector } from "../../../services/store.ts";
import { useLocation } from "react-router-dom";
import { BURGER_API_WSS } from "../../../utils/api.ts";
import { wsConnect } from "../../../services/profile-order/actions.ts";
import { wsClose } from "../../../services/profile-order/slice.ts";
import { getOrdersData } from "../../../services/profile-order/slice.ts";

export const ProfileOrder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken") || "";
  const ordersData = useSelector(getOrdersData);

  console.log('ok')
  useEffect(() => {
    console.log('ok1')
    if (ordersData?.orders.length === 0) {
      console.log('ok2')
      dispatch(wsConnect(`${BURGER_API_WSS}/orders?token=${accessToken}`));
    }
    return () => {
      dispatch(wsClose());
    };
  }, [location.pathname, dispatch, accessToken, ordersData]);

  console.log('ordersData', ordersData)

  return (
    <OrderList />
  )
}