import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersRequest, orderRequest } from "../../utils/api.ts";
import { clearIngredients } from "../burger-constructor/slice.ts";
import { Order } from "../../utils/types.ts";

export const onCreateOrder = createAsyncThunk<Order, Array<string>> (
  "order/postOrder",
  async (data, { dispatch }) => {
    const response = await orderRequest(data);
    if (response.success) {
      dispatch(clearIngredients());
    }
    return response.order;
  }
)

export const onGetOrder = createAsyncThunk<Order, number> (
  "order/getOrder",
  async (orderId) => {
    const response = await getOrdersRequest(orderId);
    return response;
  }
)

