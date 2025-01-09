import React from "react";
import OrderIcon from "../../images/done.svg";
import styles from "./order-details.module.css"

export const OrderDetails: React.FC = () => {
  return (
    <div className="mb-15">
      <div className={`mb-8 text_type_digits-large ${styles.orderNumber}`}>034536</div>
      <p className="text text_type_main-medium">идентификатор заказа</p>
      <img src={OrderIcon} className="mt-15 mb-15" alt="order done"/>
      <p className="text mb-2">Ваш заказ начали готовить</p>
      <p className="text text_color_inactive">Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}