import React, { useEffect } from "react";
import { type AppDispatch, useDispatch } from "../../services/store.ts";
import { useLocation } from "react-router-dom";
import { wsClose } from "../../services/order-feed/slice.ts";
import { BURGER_API_WSS } from "../../utils/api.ts";
import { wsConnect } from "../../services/order-feed/actions.ts";
import { OrderDashboard } from "../../components/order-dashboard/order-dashboard.tsx";
import { OrderList } from "../../components/order-list/order-list.tsx";
import styles from "./feed.module.css";
import { WebsocketStatus } from "../../utils/types.ts";
import { Loading } from "../../components/loading/loading.tsx";
import { useSelector } from "react-redux";
import { getStatus } from "../../services/order-feed/slice.ts";

export const FeedPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const location = useLocation();
  const status = useSelector(getStatus)

  useEffect(() => {
    dispatch(wsConnect(`${BURGER_API_WSS}/orders/all`));
    return () => {
      dispatch(wsClose());
    };
  }, [location.pathname, dispatch]);

  if (status === WebsocketStatus.OFFLINE) return (
    <Loading/>
  );

  return (
    <div className="container">
      <h1 className="mb-5 mt-10 text_type_main-large">Лента заказов</h1>
      <main className={`container display-flex ${styles.orderColumns}`}>
        <section className="pr-2 containerColumn custom-scroll">
          <OrderList/>
        </section>
        <section className="containerColumn ml-15">
          <OrderDashboard/>
        </section>
      </main>
    </div>
)
}


