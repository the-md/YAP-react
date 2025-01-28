import { createSlice } from "@reduxjs/toolkit";
import { onForgotPassword, onLogin, onLogout, onRegister, onResetPassword } from "./actions.ts";
import { User } from "../../utils/types.ts";

const initialState: UserState = {
  user: null,
  isAuthChecked: false,
  isResetPassword: false,
  isChangePassword: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
    setIsResetPassword: (state, action) => {
      state.isResetPassword = action.payload;
    },
    setIsChangePassword: (state, action) => {
      state.isChangePassword = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    }
  },
  selectors: {
    getUserState: (state) => state,
    getIsAuthChecked: (state) => state.isAuthChecked,
    getIsResetPassword: (state) => state.isResetPassword,
    getIsChangePassword: (state) => state.isChangePassword,
    getUser: (state) => state.user,
  },
  extraReducers: (builder) => {
    builder
      .addCase(onLogin.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(onLogout.fulfilled, (state) => {
        state.user = null;
      })
      .addCase(onLogout.rejected, (state) => {
        state.user = null;
      })
      .addCase(onRegister.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthChecked = true;
      })
      .addCase(onForgotPassword.fulfilled, (state, action) => {
        state.isResetPassword = action.payload;
      })
      .addCase(onResetPassword.fulfilled, (state, action) => {
        state.isChangePassword = action.payload;
      })
  }
})

export const {
  setIsAuthChecked,
  setUser,
  setIsResetPassword,
  setIsChangePassword,
} = userSlice.actions;

export const {
  getIsAuthChecked,
  getUser,
  getUserState
} =  userSlice.selectors

interface UserState {
  user?: User | null;
  isAuthChecked: boolean;
  isResetPassword?: boolean;
  isChangePassword?: boolean;
}
