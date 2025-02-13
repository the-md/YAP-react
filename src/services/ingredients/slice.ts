import { createSlice } from "@reduxjs/toolkit";
import { loadIngredients } from "./actions.ts";
import { Ingredient } from "../../utils/types.ts";

const initialState:IngredientsState = {
  ingredients: [],
  loading: false,
  error: null,
}
export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  selectors: {
    getIngredientsState: state => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state: IngredientsState) => {
        state.loading = true
      })
      .addCase(loadIngredients.rejected, (state: IngredientsState, action) => {
        state.error = action.error?.message || null;
        state.loading = false
      })
      .addCase(loadIngredients.fulfilled, (state: IngredientsState, action) => {
        state.ingredients = action.payload;
        state.loading = false
      })
  }
})

export const { getIngredientsState } =  ingredientsSlice.selectors

interface IngredientsState {
  ingredients: Array<Ingredient>;
  loading: boolean;
  error: string | null;
}
