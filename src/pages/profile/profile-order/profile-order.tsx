import React, { useEffect } from "react";
import { OrderList } from "../../../components/order-list/order-list.tsx";
import { type AppDispatch, useDispatch } from "../../../services/store.ts";
import { useLocation } from "react-router-dom";
import { wsConnect } from "../../../services/order-feed/actions.ts";
import { BURGER_API_WSS } from "../../../utils/api.ts";
import { wsClose } from "../../../services/order-feed/slice.ts";

export const ProfileOrder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken") || "";

  useEffect(() => {
    dispatch(wsConnect(`${BURGER_API_WSS}/orders?token=${accessToken}`));
    return () => {
      dispatch(wsClose());
    };
  }, [location.pathname, dispatch, accessToken]);

  return (
    <OrderList />
  )
}