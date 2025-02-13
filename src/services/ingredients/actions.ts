import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientsRequest } from "../../utils/api.ts";
import { Ingredient } from "../../utils/types.ts";

export const loadIngredients = createAsyncThunk<Array<Ingredient>, void> (
  "ingredients/loadIngredients",
  async () => {
    const response: IngredientsResponse = await getIngredientsRequest();
    return response.data;
  }
)

interface IngredientsResponse {
  data: Array<Ingredient>;
}