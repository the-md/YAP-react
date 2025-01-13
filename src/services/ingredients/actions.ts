import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/api.ts";

export const loadIngredients = createAsyncThunk (
  "ingredients/loadIngredients",
  async () => {
    const response = await getIngredientsRequest();
    return response.data;
  }
)