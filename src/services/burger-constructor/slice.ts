import { createSlice } from "@reduxjs/toolkit";
import { BurgerConstructorState } from "../../utils/types.ts";

const initialState:BurgerConstructorState = {
  ingredients: []
}
export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },
    deleteIngredient: (state, action) => {
      state.ingredients.splice(action.payload, 1);
    },
  },
  selectors: {
    getConstructorIngredients: state => state.ingredients,
    getConstructorBun: state => state.ingredients[0]
  }
})

export const { addIngredient, deleteIngredient } = burgerConstructorSlice.actions;
export const {getConstructorIngredients, getConstructorBun} =  burgerConstructorSlice.selectors
