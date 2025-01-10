import { createSlice } from "@reduxjs/toolkit";
import { loadIngredients } from "./actions.ts";
import { IngredientObj } from "../../utils/types.ts";

const initialState:IngredientsStateProps = {
  ingredients: [],
  loading: false,
  error: null
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  selectors: {
    getIngredientsState: state => state
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadIngredients.pending, (state) => {
        state.loading = true
      })
      .addCase(loadIngredients.rejected, (state, action) => {
        state.error = action.error?.message || null;
        state.loading = false
      })
      .addCase(loadIngredients.fulfilled, (state, action) => {
        state.ingredients = action.payload;
        state.loading = false
      })
  }
})

export const { getIngredientsState } =  ingredientsSlice.selectors

interface IngredientsStateProps {
  ingredients: IngredientObj[];
  loading: boolean;
  error: string | null;
}
