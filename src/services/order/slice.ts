import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  order: []
}
export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  selectors: {
    getOrder: state => state.order
  }
})