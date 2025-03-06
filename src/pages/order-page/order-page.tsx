import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "../../components/modal/modal.tsx";
import type { AppDispatch } from "../../services/store.ts";
import { Loading } from "../../components/loading/loading.tsx";
import { OrderDetails } from "../../components/order-details/order-details.tsx";
import { onGetOrder } from "../../services/order/actions.ts";
import { getOrderState } from "../../services/order/slice.ts";
import styles from './order-page.module.css';

export const OrderPage: React.FC<OrderPageProps> = ({ isModal }) => {
  const { orderId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const {order, loading} = useSelector(getOrderState);
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) {
      dispatch(onGetOrder(Number(orderId)));
    }
  }, [dispatch, orderId]);

  const handleClose = () => {
    navigate(-1);
  };

  if (loading) return (
    <Loading container={!isModal}/>
  );

  if (isModal && order) {
    return (
      <Modal onClose={handleClose}>
        <div className={`${styles.modalIngredient}`}>
          <OrderDetails order={order} />
        </div>
      </Modal>
    );
  }

  return (
    <>
      {order ? (
        <div className="container mt-30">
          <OrderDetails order={order} />
        </div>
      ) : (
        <div className="container mb-20 mt-20 ">
          <p className="text_align-center">Такого заказа нет</p>
        </div>
      )}
    </>
  )
}

interface OrderPageProps {
  isModal?: boolean;
}
