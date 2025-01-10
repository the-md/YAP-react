import { createSlice } from "@reduxjs/toolkit";
import { postOrderThunk } from "./actions.ts";

const initialState:OrderStateProps = {
  orderObj: null,
  loading: false,
  error: null
}
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  selectors: {
    getOrder: state => state.orderObj
  },
  extraReducers: (builder) => {
    builder
      .addCase(postOrderThunk.pending, (state) => {
        state.loading = true
      })
      .addCase(postOrderThunk.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false
      })
      .addCase(postOrderThunk.fulfilled, (state, action) => {
        state.orderObj = action.payload;
        state.loading = false
      })
  }
})

export const { getOrder } =  orderSlice.selectors

interface OrderStateProps {
  orderObj: {
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  } | null;
  loading: boolean;
  error: string | null;
}
