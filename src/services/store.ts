import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { ingredientsSlice } from './ingredients/slice.ts'
import { burgerConstructorSlice } from './burger-constructor/slice.ts'
import { orderSlice } from './order/slice.ts'
import { userSlice } from './user/slice.ts'
import { useDispatch as dispatchHook, useSelector as selectorHook } from "react-redux";
import { orderFeedMiddleware, profileOrderMiddleware } from './middleware/socketMiddleware';
import { orderFeedSlice } from "./order-feed/slice.ts";
import { profileOrderSlice } from "./profile-order/slice.ts";


const rootReducer = combineSlices(
  orderSlice,
  burgerConstructorSlice,
  ingredientsSlice,
  userSlice,
  orderFeedSlice,
  profileOrderSlice
)

export const store = configureStore({
  reducer: rootReducer,
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers(),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(orderFeedMiddleware, profileOrderMiddleware),
})

// type TAppActions = TWsExternalActions | TWsInternalActions;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
// export type AppDispatch = ThunkDispatch<RootState, unknown, TAppActions>;

export const useDispatch = dispatchHook.withTypes<AppDispatch>();
export const useSelector = selectorHook.withTypes<RootState>();

export default store;