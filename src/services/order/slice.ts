import { createSlice } from "@reduxjs/toolkit";
import { onCreateOrder } from "./actions.ts";

const initialState:OrderState = {
  orderObj: null,
  loading: false,
  error: null,
  openModal: false,
}
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    closeModalOrder: (state) => {
      state.openModal = false
    },
  },
  selectors: {
    getOrderState: state => state,
    getOpenModalOrder: state => state.openModal,
  },
  extraReducers: (builder) => {
    builder
      .addCase(onCreateOrder.pending, (state) => {
        state.loading = true
        state.openModal = true
      })
      .addCase(onCreateOrder.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false
      })
      .addCase(onCreateOrder.fulfilled, (state, action) => {
        state.orderObj = action.payload;
        state.loading = false
      })
  }
})

export const { closeModalOrder } = orderSlice.actions;

export const { getOrderState, getOpenModalOrder } =  orderSlice.selectors

interface OrderState {
  orderObj: {
    name: string;
    order: {
      number: number;
    };
    success: boolean;
  } | null;
  loading: boolean;
  error: string | null;
  openModal: boolean;
}
