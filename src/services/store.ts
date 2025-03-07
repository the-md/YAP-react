import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from './ingredients/slice.ts'
import { burgerConstructorSlice } from './burger-constructor/slice.ts'
import { orderSlice } from './order/slice.ts'
import { userSlice } from './user/slice.ts'

const rootReducer = combineSlices(
  orderSlice,
  burgerConstructorSlice,
  ingredientsSlice,
  userSlice
)

export const store = configureStore({
  reducer: rootReducer,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
  devTools: process.env.NODE_ENV !== 'production',
})

export type AppDispatch = typeof store.dispatch;