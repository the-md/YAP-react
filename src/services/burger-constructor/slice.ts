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
      if (action.payload) {
        state.ingredients = action.payload;
      } else {
        console.error('Попытка добавить null в ингредиенты');
      }
    },
    deleteIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter(ingredient => ingredient._id !== action.payload);
    },
  },
  selectors: {
    getConstructorIngredients: state => state.ingredients,
    getConstructorBun: state => state.ingredients[0]
  }
})

export const { addIngredient, deleteIngredient } = burgerConstructorSlice.actions;
export const {getConstructorIngredients, getConstructorBun} =  burgerConstructorSlice.selectors
