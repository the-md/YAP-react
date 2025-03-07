import React, { useEffect } from "react";
import { OrderList } from "../../../components/order-list/order-list.tsx";
import { type AppDispatch, useDispatch, useSelector } from "../../../services/store.ts";
import { useLocation } from "react-router-dom";
import { BURGER_API_WSS } from "../../../utils/api.ts";
import { wsConnect } from "../../../services/profile-order/actions.ts";
import { getStatus, wsClose } from "../../../services/profile-order/slice.ts";
import { WebsocketStatus } from "../../../utils/types.ts";
import { Loading } from "../../../components/loading/loading.tsx";

export const ProfileOrder: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const accessToken = localStorage.getItem("accessToken") || "";
  const status = useSelector(getStatus)

  useEffect(() => {
    dispatch(wsConnect(`${BURGER_API_WSS}/orders?token=${accessToken}`));
    return () => {
      dispatch(wsClose());
    };
  }, [location.pathname, dispatch, accessToken]);

  if (status === WebsocketStatus.OFFLINE) return (
    <Loading/>
  );

  return (
    <OrderList />
  )
}