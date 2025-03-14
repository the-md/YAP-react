import { ingredientsSlice, IngredientsState } from "./slice.ts";
import { loadIngredients } from "./actions";
import { Ingredient } from "../../utils/types";

const mockIngredients: Ingredient[] = [
  {
    _id: "643d69a5c3f7b9001cfa093c",
    name: "Булка",
    type: "bun",
    proteins: 100,
    fat: 100,
    carbohydrates: 100,
    calories: 100,
    price: 100,
    image: "https://via.placeholder.com/150",
    image_mobile: "https://via.placeholder.com/150",
    image_large: "https://via.placeholder.com/150",
    __v: 0
  },
  {
    _id: "643d69a5c3f7b9001cfa093e",
    name: "Филе",
    type: "main",
    proteins: 100,
    fat: 100,
    carbohydrates: 100,
    calories: 100,
    price: 100,
    image: "https://via.placeholder.com/150",
    image_mobile: "https://via.placeholder.com/150",
    image_large: "https://via.placeholder.com/150",
    __v: 0
  }
];

describe("ingredientsSlice reducer", () => {
  const initialState = {
    ingredients: [],
    loading: false,
    error: null,
  };

  it("должен устанавливать `loading = true` при `loadIngredients.pending`", () => {
    const nextState: IngredientsState = ingredientsSlice.reducer(
      initialState,
      loadIngredients.pending("ingredients/loadIngredients")
    );

    expect(nextState.loading).toBe(true);
  });

  it("должен устанавливать `loading = false` и `error` при `loadIngredients.rejected`", () => {
    const error = new Error("Some error message");
    const nextState = ingredientsSlice.reducer(initialState, loadIngredients.rejected(error, ""));
    expect(nextState.loading).toBe(false);
    expect(nextState.error).toBe(error.message);
  });

  it("должен загружать ингредиенты и устанавливать `loading = false` при `loadIngredients.fulfilled`", () => {
    const nextState = ingredientsSlice.reducer(initialState, loadIngredients.fulfilled(mockIngredients, ""));
    expect(nextState.loading).toBe(false);
    expect(nextState.ingredients).toEqual(mockIngredients);
  });
});