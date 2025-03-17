import { ingredientsSlice, initialState } from "./slice";
import { loadIngredients } from "./actions.ts";
import { Ingredient } from "../../utils/types.ts";

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

describe("ingredients reducer", () => {
  it("correct initial state", () => {
    const state = ingredientsSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("loadIngredients.pending", () => {
    const action = { type: loadIngredients.pending.type };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, loading: true});
  });

  it("loadIngredients.rejected", () => {
    const action = { type: loadIngredients.rejected.type, error: { message: "Test" } };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, error: "Test"});
  });

  it("loadIngredients.fulfilled", () => {
    const action = { type: loadIngredients.fulfilled.type, payload: mockIngredients };
    const state = ingredientsSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, ingredients: mockIngredients});
  });
});
