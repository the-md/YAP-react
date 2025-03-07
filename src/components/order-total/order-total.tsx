import React from "react";

export const OrderTotal: React.FC<OrderTotalProps> = ({title, sum}) => {
  return (
    <div className="mt-15">
      <p className={`text text_type_main-medium`}>{title}</p>
      <p className={`text text_type_digits-large text_shadow-number`}>{sum}</p>
    </div>
  )
}
interface OrderTotalProps {
  title: string;
  sum: number;
}