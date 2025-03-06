import { createSlice } from "@reduxjs/toolkit";
import { onCreateOrder, onGetOrder } from "./actions.ts";
import { Order } from "../../utils/types.ts";

const initialState: OrderState = {
  order: null,
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
      .addCase(onCreateOrder.pending, (state: OrderState) => {
        state.loading = true
        state.openModal = true
      })
      .addCase(onCreateOrder.rejected, (state: OrderState, action) => {
        state.error = action.error?.message || null;
        state.loading = false
      })
      .addCase(onCreateOrder.fulfilled, (state: OrderState, action) => {
        state.order = action.payload;
        state.loading = false
        console.log('onCreateOrder action.payload', action.payload)
      })
      .addCase(onGetOrder.pending, (state: OrderState) => {
        state.loading = true
        state.openModal = true
      })
      .addCase(onGetOrder.rejected, (state: OrderState, action) => {
        state.error = action.error?.message || null;
        state.loading = false
      })
      .addCase(onGetOrder.fulfilled, (state: OrderState, action) => {
        console.log('onGetOrder action.payload', action.payload)
        state.order = action.payload;
        state.loading = false
      })
  }
})

export const { closeModalOrder } = orderSlice.actions;

export const { getOrderState, getOpenModalOrder } =  orderSlice.selectors

interface OrderState {
  order: Order | null;
  loading: boolean;
  error: string | null;
  openModal: boolean;
}
