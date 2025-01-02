import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/api.ts";

export const loadIngredients = createAsyncThunk (
  "ingredients/gerIngredients",
  async () => {
    return getIngredientsRequest()
  }
)