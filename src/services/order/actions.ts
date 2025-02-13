import { createAsyncThunk } from "@reduxjs/toolkit";
import { orderRequest } from "../../utils/api.ts";
import { clearIngredients } from "../burger-constructor/slice.ts";

export const onCreateOrder = createAsyncThunk (
  "order/postOrder",
  async (data: Array<string>, { dispatch }) => {
    const response = await orderRequest(data);
    if (response.success) {
      dispatch(clearIngredients());
    }
    return response;
  }
)