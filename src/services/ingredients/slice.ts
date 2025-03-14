import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  reducers: {},
  selectors: {
    getIngredientsState: (state: IngredientsState) => state,
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false;
      })
      .addCase(loadIngredients.fulfilled, (state, action: PayloadAction<Array<Ingredient>>) => {
        state.ingredients = action.payload;
        state.loading = false;
      });
  },
})

export const { getIngredientsState } =  ingredientsSlice.selectors

export interface IngredientsState {
  ingredients: Array<Ingredient>;
  loading: boolean;
  error: string | null;
}
