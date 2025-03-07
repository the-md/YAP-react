import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginRequest,
  logoutRequest,
  getUserRequest,
  registerRequest,
  forgotPasswordRequest,
  resetPasswordRequest,
  updateUserRequest
} from "../../utils/api.ts";
import { setIsAuthChecked, setUser } from "./slice.ts";
import { MessageResponseProps, User } from "../../utils/types.ts";

export const onLogin = createAsyncThunk<Omit<User, 'password'>, Omit<User, 'name'>> (
  "user/onLogin",
  async (data) => {
    const response = await loginRequest(data);
    localStorage.setItem('accessToken', response.accessToken.split('Bearer ')[1]);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
)

export const onLogout = createAsyncThunk<MessageResponseProps, void> (
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

export const checkUserAuth = createAsyncThunk<void, void> (
  "user/checkUserAuth",
  async (_, { dispatch }) => {
    if (localStorage.getItem("accessToken")) {
      getUserRequest()
        .then(user => dispatch(setUser(user.user)))
        .finally(() => dispatch(setIsAuthChecked(true)));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
)

export const onRegister = createAsyncThunk<Omit<User, 'password'>, User> (
  "user/onRegister",
  async (data) => {
    const response = await registerRequest(data);
    localStorage.setItem('accessToken', response.accessToken.split('Bearer ')[1]);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  }
)

export const onForgotPassword = createAsyncThunk<boolean, Pick<User, 'email'>> (
  "user/onForgotPassword",
  async (data) => {
    const response = await forgotPasswordRequest(data);
    return response.success;
  }
)

export const onResetPassword = createAsyncThunk<boolean, resetPasswordRequestProps> (
  "user/onResetPassword",
  async (data) => {
    const response = await resetPasswordRequest(data);
    return response.success;
  }
)

export const onChangeUser = createAsyncThunk<Omit<User, 'password'>, Partial<User>> (
  "user/onChangeUser",
  async (data) => {
    const response = await updateUserRequest(data);
    return response.user;
  }
)


interface resetPasswordRequestProps {
  password: string,
  token: string
}