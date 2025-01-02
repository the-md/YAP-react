import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ingredients: []
}
export const burgerConstructorSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  selectors: {
    getIngredientsConstructor: state => state.ingredients
  }
})