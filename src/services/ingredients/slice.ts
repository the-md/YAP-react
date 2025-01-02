import { createSlice } from "@reduxjs/toolkit";
import { loadIngredients } from "./actions.ts";
import { IngredientsState } from "../../utils/types.ts";

const initialState:IngredientsState = {
  ingredients: [],
  loading: false,
  error: null
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {},
  selectors: {
    getAllIngredients: state => state
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

export const {getAllIngredients} =  ingredientsSlice.selectors