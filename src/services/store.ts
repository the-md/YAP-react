import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { burgerConstructorSlice } from './burger-constructor/slice.ts'
import { ingredientsSlice } from './ingredients/slice.ts'
import { orderSlice } from './order/slice.ts'

const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorSlice,
  ingredients: ingredientsSlice,
  order: orderSlice,
})

export const store = configureStore({
  reducer: rootReducer,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
  devTools: process.env.NODE_ENV !== 'production',
})