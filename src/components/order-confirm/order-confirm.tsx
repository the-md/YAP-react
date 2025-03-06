import React from "react";
import { useSelector } from "react-redux";
import { getOrderState } from "../../services/order/slice.ts";
import OrderIcon from "../../images/done.svg";
import { Loading } from "../loading/loading.tsx";

export const OrderConfirm: React.FC = () => {
  const {order, loading} = useSelector(getOrderState)
  if (loading) return (
    <Loading/>
  );
  //todo очистить стор, чтобы не выводилось второй раз
  return (
    <div className="mb-15 text_align-center">
      <div className={`mb-8 text_type_digits-large text_shadow-number`}>
        {order?.number.toString().padStart(6, '0')}
      </div>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={OrderIcon} className="mt-15 mb-15" alt="order done"/>
      <p className="text mb-2">Ваш заказ начали готовить</p>
      <p className="text text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}