import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { ConstructorIngredient, Ingredient } from "../../utils/types.ts";

export const initialState: BurgerConstructorState = {
  constructorIngredients: [],
  constructorBuns: null,
}

export const burgerConstructorSlice = createSlice({
  name: "burgerConstructor",
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<ConstructorIngredient>) => {
        if (action.payload.type === "bun") {
          state.constructorBuns = action.payload;
        } else {
          state.constructorIngredients.push(action.payload);
        }
      },
      prepare: (ingredient: Ingredient) => {
        return { payload: { ...ingredient, uuid: nanoid() } };
      },
    },
    deleteIngredient: (state, action: PayloadAction<string>) => {
      state.constructorIngredients = state.constructorIngredients.filter(item=> item.uuid !== action.payload )
    },
    clearIngredients: (state) => {
      state.constructorIngredients = [];
      state.constructorBuns = null;
    },
    sortIngredient: (state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) => {
      const { fromIndex, toIndex } = action.payload;
      if (fromIndex !== -1 && toIndex !== -1) {
        const newIngredients = [...state.constructorIngredients];
        const [movedItem] = newIngredients.splice(fromIndex, 1);
        newIngredients.splice(toIndex, 0, movedItem);
        state.constructorIngredients = newIngredients;
      }
    },
  },
  selectors: {
    getConstructorState: state => state
  },
});

export const {
  addIngredient,
  deleteIngredient,
  clearIngredients,
  sortIngredient,
} = burgerConstructorSlice.actions;

export const { getConstructorState } = burgerConstructorSlice.selectors;

interface BurgerConstructorState {
  constructorIngredients: Array<ConstructorIngredient>;
  constructorBuns: ConstructorIngredient | null;
}

