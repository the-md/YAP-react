import React from "react";
import { getOrderState } from "../../services/order/slice.ts";
import OrderIcon from "../../images/done.svg";
import { Loading } from "../loading/loading.tsx";
import { useSelector } from "../../services/store.ts";

export const OrderConfirm: React.FC = () => {
  const {order, loading} = useSelector(getOrderState)
  if (loading) return (
    <Loading/>
  );
  return (
    <div className="mb-15 text_align-center">
      <div className={`mb-8 text_type_digits-large text_shadow-number`}>
        {order?.number}
      </div>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={OrderIcon} className="mt-15 mb-15" alt="order done"/>
      <p className="text mb-2">Ваш заказ начали готовить</p>
      <p className="text text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}