import { createSlice } from "@reduxjs/toolkit";
import { IngredientObj } from "../../utils/types.ts";

const initialState:BurgerConstructorState = {
  constructorIngredients: [],
  bun: null
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
    sortIngredient: (state, action) => {
      const { fromIndex, toIndex } = action.payload;
      const newIngredients = [...state.constructorIngredients];

      if (fromIndex !== -1 && toIndex !== -1) {
        const [movedItem] = newIngredients.splice(fromIndex, 1);
        newIngredients.splice(toIndex, 0, movedItem);
        state.constructorIngredients = newIngredients;
      }
    },
  },
  selectors: {
    getConstructorState: state => state,
  }
})

export const { addIngredient, deleteIngredient, sortIngredient } = burgerConstructorSlice.actions;
export const {getConstructorState} =  burgerConstructorSlice.selectors

interface BurgerConstructorState {
  constructorIngredients: IngredientObj[];
  bun: IngredientObj | null;
}
