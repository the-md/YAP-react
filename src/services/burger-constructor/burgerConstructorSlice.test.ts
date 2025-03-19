import { Ingredient } from "../../utils/types.ts";
import {
  addIngredient,
  burgerConstructorSlice,
  clearIngredients,
  deleteIngredient,
  initialState,
  sortIngredient
} from "./slice.ts";

jest.mock("@reduxjs/toolkit", () => ({
  ...jest.requireActual("@reduxjs/toolkit"),
  nanoid: jest.fn(() => "mocked-uuid"),
}));

const mockBun: Ingredient = {
  _id: "643d69a5c3f7b9001cfa093c",
  name: "Краторная булка N-200i",
  type: "bun",
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: "https://code.s3.yandex.net/react/code/bun-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
  __v: 0
}
const mockIngredient: Ingredient = {
  _id: "643d69a5c3f7b9001cfa0942",
  name: "Соус Spicy-X",
  type: "sauce",
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: "https://code.s3.yandex.net/react/code/sauce-02.png",
  image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
  __v: 0
}
const mockIngredientMeat: Ingredient = {
  _id: "643d69a5c3f7b9001cfa0941",
  name: "Биокотлета из марсианской Магнолии",
  type: "main",
  proteins: 420,
  fat: 142,
  carbohydrates: 242,
  calories: 4242,
  price: 424,
  image: "https://code.s3.yandex.net/react/code/meat-01.png",
  image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
  image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
  __v: 0
}

describe("burger constructor reducer", () => {
  it("correct initial state", () => {
    const state = burgerConstructorSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("addIngredient bun", () => {
    const action = addIngredient(mockBun)
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, constructorBuns: { ...mockBun, uuid: "mocked-uuid" }});
  });

  it("addIngredient ingredient", () => {
    const action = addIngredient(mockIngredient)
    const state = burgerConstructorSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, constructorIngredients: [{ ...mockIngredient, uuid: "mocked-uuid" }]});
  });

  it("deleteIngredient ingredient", () => {
    const initialStateWithData = {
      ...initialState,
      constructorIngredients: [{ ...mockIngredient, uuid: "001" }],
    };
    const action = deleteIngredient("001")
    const newState = burgerConstructorSlice.reducer(initialStateWithData, action);
    expect(newState).toEqual({...initialState, constructorIngredients: []});
  });

  it("clearIngredients", () => {
    const initialStateWithData = {
      ...initialState,
      constructorBuns: { ...mockBun, uuid: "001" },
      constructorIngredients: [{ ...mockIngredient, uuid: "002" }],
    };
    const action = clearIngredients()
    const newState = burgerConstructorSlice.reducer(initialStateWithData, action);
    expect(newState).toEqual(initialState);
  });

  it("sortIngredient", () => {
    const initialStateWithData = {
      ...initialState,
      constructorIngredients: [
        { ...mockIngredient, uuid: "001" },
        { ...mockIngredientMeat, uuid: "002" },
      ],
    };
    const action = sortIngredient({ fromIndex: -1, toIndex: 2 });
    const newState = burgerConstructorSlice.reducer(initialStateWithData, action);
    expect(newState).toEqual(initialStateWithData);
  });
});