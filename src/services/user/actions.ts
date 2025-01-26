import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginRequest, logoutRequest, getUserRequest, registerRequest } from "../../utils/api.ts";
import { setIsAuthChecked, setUser } from "./slice.ts";

export const onLogin = createAsyncThunk (
  "user/onLogin",
  async (data) => {
    const response = await loginRequest(data);
    console.log('response onLogin', response)


    const accessToken = response.accessToken.split('Bearer ')[1];
    const refreshToken = response.refreshToken;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    return response;
  }
)

export const onLogout = createAsyncThunk (
  "user/onLogout",
  async () => {
    const response = await logoutRequest();
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    console.log('onLogout', response)
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
  async (data) => {
    const response = await registerRequest(data);
    console.log('response onRegister', response)
    return response.user;
  }
)