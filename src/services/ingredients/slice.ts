import { createSlice } from "@reduxjs/toolkit";
import { loadIngredients } from "./actions.ts";
import { IngredientObj } from "../../utils/types.ts";

const initialState:IngredientsStateProps = {
  ingredients: [],
  loading: false,
  error: null,
  openModal: false,
  ingredientDetail: null,
}

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    openIngredientDetail: (state, action) => {
      state.ingredientDetail = action.payload
      state.openModal = true
    },
    closeIngredientDetail: (state) => {
      state.ingredientDetail = null
      state.openModal = false
    },
  },
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

export const { openIngredientDetail, closeIngredientDetail } = ingredientsSlice.actions;

export const { getIngredientsState } =  ingredientsSlice.selectors

interface IngredientsStateProps {
  ingredients: IngredientObj[];
  loading: boolean;
  error: string | null;
  openModal: boolean;
  ingredientDetail: IngredientObj | null;
}
