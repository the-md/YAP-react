import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrdersRequest, orderRequest } from "../../utils/api.ts";
import { clearIngredients } from "../burger-constructor/slice.ts";
import { OrderResponseProps } from "../../utils/types.ts";

export const onCreateOrder = createAsyncThunk<OrderResponseProps, Array<string>> (
  "order/postOrder",
  async (data, { dispatch }) => {
    const response = await orderRequest(data);
    if (response.success) {
      dispatch(clearIngredients());
    }
    return response;
  }
)

export const onGetOrder = createAsyncThunk<OrderResponseProps, number> (
  "order/getOrder",
  async (orderId) => {
    const response = await getOrdersRequest(orderId);
    console.log('response', response)
    return response;
  }
)

