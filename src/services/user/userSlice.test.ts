import {
  userSlice,
  initialState,
  setIsAuthChecked,
  setIsResetPassword,
  setIsChangePassword,
  setUser
} from "./slice.ts";
import { onLogin, onLogout, onRegister, onForgotPassword, onResetPassword, onChangeUser } from "./actions.ts";
import { User } from "../../utils/types.ts";

const mockUser: Omit<User, "password"> = {
  email: "test@test.ru",
  name: "Test Name"
}
describe("user reducer", () => {
  it("correct initial state", () => {
    const state = userSlice.reducer(undefined, { type: "" });
    expect(state).toEqual(initialState);
  });

  it("onLogin.fulfilled", () => {
    const action = { type: onLogin.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, user: mockUser, isAuthChecked: true});
  });

  it("onLogout.rejected", () => {
    const action = { type: onLogout.rejected.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, user: null});
  });

  it("onLogout.fulfilled", () => {
    const action = { type: onLogout.fulfilled.type };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, user: null});
  });

  it("onRegister.fulfilled", () => {
    const action = { type: onRegister.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, user: mockUser, isAuthChecked: true});
  });

  it("onForgotPassword.fulfilled", () => {
    const action = { type: onForgotPassword.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, isResetPassword: true});
  });

  it("onResetPassword.fulfilled", () => {
    const action = { type: onResetPassword.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, isChangePassword: true});
  });

  it("onChangeUser.fulfilled", () => {
    const action = { type: onChangeUser.fulfilled.type, payload: mockUser };
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, user: mockUser});
  });

  it("setIsAuthChecked", () => {
    const action = setIsAuthChecked(true);
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, isAuthChecked: true});
  });

  it("setIsResetPassword", () => {
    const action = setIsResetPassword(true);
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, isResetPassword: true});
  });

  it("setIsChangePassword", () => {
    const action = setIsChangePassword(true);
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, isChangePassword: true});
  });

  it("setUser", () => {
    const action = setUser(mockUser);
    const state = userSlice.reducer(initialState, action);
    expect(state).toEqual({...initialState, user: mockUser});
  });
});
