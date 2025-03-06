import React, { useEffect } from "react";
import styles from './order-details.module.css';
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { Ingredient, Order } from "../../utils/types.ts";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import { loadIngredients } from "../../services/ingredients/actions.ts";
import type { AppDispatch } from "../../services/store.ts";

export const OrderDetails: React.FC<OrderPageProps> = ({order}) => {
  const {ingredients} = useSelector(getIngredientsState);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (ingredients.length === 0) {
      dispatch(loadIngredients());
    }
  }, [dispatch, ingredients]);


  const {listIngredients, totalPrice} = order.ingredients.reduce<{
    listIngredients: ListIngredientsProps[];
    totalPrice: number;
  }>(
    (acc, ingredientId) => {
      const foundIngredient = ingredients.find(item => item._id === ingredientId);
      if (foundIngredient) {
        const existingIngredient = acc.listIngredients.find(
          item => item._id === foundIngredient._id
        );
        if (existingIngredient) {
          existingIngredient.count! += 1;
        } else {
          acc.listIngredients.push({ ...foundIngredient, count: 1 });
        }
        acc.totalPrice += foundIngredient.price;
      }
      return acc;
    },
    {listIngredients: [], totalPrice: 0}
  );

  return (
    <article className={`${styles.order}`}>
      <div className="mb-10 text_type_digits-default text_align-center">
        #{order.number.toString().padStart(6, '0')}
      </div>
      <div className="mb-3 text_type_main-medium">{order.name}</div>
      <div className="mb-15 text_color_turquoise">{order.status === 'done' ? 'Выполнен' : 'Готовится'}</div>
      <div className="mb-6 text_type_main-medium">Состав:</div>
      <div className={`mb-10 pr-6 ${styles.orderIngredients}`}>
        <ul className={`text ${styles.orderIngredientList}`}>
          {listIngredients.map((ingredient, index) => (
            <li key={index} className={`display-flex align_items-center mb-4 ${styles.orderIngredientItem}`}>
              <div className={`${styles.orderIngredientImage}`}>
                <img src={ingredient.image_mobile} alt={ingredient.name} />
              </div>
              <div className={`text_type_main-default ${styles.orderIngredientTitle}`}>{ingredient.name}</div>
              <div className={`text_type_digits-default ${styles.orderIngredientTotal}`}>
                {ingredient.count} x {ingredient.price} <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="display-flex justify_content-space-between">
        <div className="text_color_inactive text_type_main-default">
          <FormattedDate date={new Date(`${order?.createdAt}`)}/>
        </div>
        <div className="ml-6 text_type_digits-default">
          {totalPrice} <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
        </div>
      </div>
    </article>
  )
}

interface OrderPageProps {
  order: Order;
}

interface ListIngredientsProps extends Ingredient {
  count: number;
}