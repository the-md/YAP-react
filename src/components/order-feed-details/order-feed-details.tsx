import React, { useEffect } from "react";
import styles from './order-feed-details.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../services/store.ts";
import { onGetOrder } from "../../services/order/actions.ts";

export const OrderFeedDetails: React.FC = () => {
  const { orderId } = useParams();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (orderId) {
      dispatch(onGetOrder(Number(orderId)));
    }
  }, [dispatch, orderId]);
  console.log('orderId page', orderId)
  return (
    <article className={`${styles.order}`}>
      <div className="mb-10 text_type_digits-default text_align-center">#034535</div>
      <div className="mb-3 text_type_main-medium">Death Star Starship Main бургер</div>
      <div className="mb-15 text_color_turquoise">Выполнен</div>
      <div className="mb-6 text_type_main-medium">Состав:</div>
      <div className="mb-10">
        <ul className={`${styles.orderIngredients}`}>
          <li className={`display-flex align_items-center mb-4 ${styles.orderIngredientItem}`}>
            <div className={`${styles.orderIngredientImage}`}></div>
            <div className={`text_type_main-default ${styles.orderIngredientTitle}`}>Флюоресцентная булка R2-D3</div>
            <div className={`text_type_digits-default ${styles.orderIngredientTotal}`}>
              2 x 20 <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
            </div>
          </li>
        </ul>
      </div>
      <div className="display-flex justify_content-space-between">
        <div className="text_color_inactive text_type_main-default">
          <FormattedDate date={new Date('2025-03-01T10:33:32.877Z')}/>
        </div>
        <div className="ml-6 text_type_digits-default">
          480 <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
        </div>
      </div>
    </article>
  )
}
