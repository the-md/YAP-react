import { createSlice } from "@reduxjs/toolkit";
import { onLogin, onLogout, onRegister } from "./actions.ts";
import { User } from "../../utils/types.ts";

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getIsAuthChecked: (state) => state.isAuthChecked,
    getUser: (state) => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        console.log('onLogin.fulfilled action.payload', action.payload)
        console.log('onLogin.fulfilled state.user', state.user)

        state.isAuthChecked = true;
      })
      .addCase(onRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(onLogout.fulfilled, (state) => {
        state.user = null;
      })
  }
})

export const { setIsAuthChecked, setUser } = userSlice.actions;

export const { getIsAuthChecked, getUser } =  userSlice.selectors

interface UserState {
  user: User | null;
  isAuthChecked: boolean;
}
