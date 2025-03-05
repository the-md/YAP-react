import { useSelector } from "../../services/store.ts";
import { getIngredientsState } from "../../services/ingredients/slice.ts";
import styles from "./order-item.module.css";
import { CurrencyIcon, FormattedDate } from "@ya.praktikum/react-developer-burger-ui-components";
import { Order, Ingredient } from "../../utils/types.ts";
import { useNavigate } from "react-router-dom";


export const OrderItem = ({ order }: OrderItemProps) => {
  const {ingredients} = useSelector(getIngredientsState);
  const navigate = useNavigate()

  const {imagesIngredients, totalPrice} = order.ingredients.reduce<{
    imagesIngredients: Ingredient[];
    totalPrice: number;
  }>(
    (acc, ingredientId) => {
      const foundIngredient = ingredients.find(item => item._id === ingredientId);
      if (foundIngredient) {
        acc.imagesIngredients.push(foundIngredient);
        acc.totalPrice += foundIngredient.price;
      }
      return acc;
    },
    {imagesIngredients: [], totalPrice: 0}
  );
  console.log('imagesIngredients', imagesIngredients)
  const onOrderClick = (order:Order) => {
    navigate(`/feed/${order._id}`, {
      state: { background: location },
    });
  }
  return (
    <div
      key={order._id}
      className={`p-6 mb-4 ${styles.orderItem}`}
      onClick={() => onOrderClick(order)}
    >
      <div className="display-flex justify_content-space-between">
        <div className="text_type_digits-default">
          {order.number.toString().padStart(6, '0')}
        </div>
        <div className="text_color_inactive text_type_main-default">
          <FormattedDate date={new Date(`${order.createdAt}`)}/>
        </div>
      </div>
      <div className="mt-6 mb-6 text_type_main-medium">{order.name}</div>
      <div className="display-flex justify_content-space-between align_items-center">
        <ul className={`${styles.orderIngredients}`}>
          {imagesIngredients.slice(0, 6).map((ingredient, index) => (
            <li key={index} className={`${styles.orderIngredientItem}`}>
              <img src={ingredient.image_mobile} alt={ingredient.name} className={styles.orderIngredientImage}/>
              {index === 5 && (
                <p className={styles.orderIngredientCount}>+{imagesIngredients.length - 5}</p>
              )}
            </li>
          ))}
        </ul>
        <div className="ml-6 text_type_digits-default">
          {totalPrice} <CurrencyIcon className="ml-2 price-icon-align" type="primary"/>
        </div>
      </div>
    </div>
  )
}

interface OrderItemProps {
  order: Order;
}