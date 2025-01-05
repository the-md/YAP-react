import { createSlice } from "@reduxjs/toolkit";
import { BurgerConstructorState } from "../../utils/types.ts";

const initialState:BurgerConstructorState = {
  constructorIngredients: [],
  bun: {}
}
export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: (state, action) => {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.constructorIngredients.push(action.payload);
      }
    },
    deleteIngredient: (state, action) => {
      state.constructorIngredients.splice(action.payload, 1);
    },
  },
  selectors: {
    getConstructorState: state => state,
  }
})

export const { addIngredient, deleteIngredient } = burgerConstructorSlice.actions;
export const {getConstructorState} =  burgerConstructorSlice.selectors
