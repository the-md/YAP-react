import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginRequest,
  logoutRequest,
  getUserRequest,
  registerRequest,
  forgotPasswordRequest,
  resetPasswordRequest, updateUserRequest
} from "../../utils/api.ts";
import { setIsAuthChecked, setUser } from "./slice.ts";
import { User } from "../../utils/types.ts";

export const onLogin = createAsyncThunk (
  "user/onLogin",
  async (data: User) => {
    const response = await loginRequest(data);
    localStorage.setItem('accessToken', response.accessToken.split('Bearer ')[1]);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
)

export const onLogout = createAsyncThunk (
  "user/onLogout",
  async () => {
    const refreshToken = {
      "token": localStorage.getItem("refreshToken") || ''
    }
    const response = await logoutRequest(refreshToken);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    return response;
  }
)

export const checkUserAuth = createAsyncThunk(
  "user/checkUserAuth",
  async (_, { dispatch }) => {
    if (localStorage.getItem("accessToken")) {
      getUserRequest()
        .then(user => dispatch(setUser(user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
)

export const onRegister = createAsyncThunk (
  "user/onRegister",
  async (data: User) => {
    const response = await registerRequest(data);
    localStorage.setItem('accessToken', response.accessToken.split('Bearer ')[1]);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
)

export const onForgotPassword = createAsyncThunk (
  "user/onForgotPassword",
  async (data: User) => {
    const response = await forgotPasswordRequest(data);
    return response.success;
  }
)

export const onResetPassword = createAsyncThunk (
  "user/onResetPassword",
  async (data: resetPasswordRequestProps) => {
    const response = await resetPasswordRequest(data);
    return response.success;
  }
)

export const onChangeUser = createAsyncThunk (
  "user/onChangeUser",
  async (data: User) => {
    const response = await updateUserRequest(data);
    return response.user;
  }
)



interface resetPasswordRequestProps {
  password: string,
  token: string
}