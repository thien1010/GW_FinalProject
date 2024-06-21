import { createSlice } from "@reduxjs/toolkit";
import { getUserByTokenThunk, loginThunk } from "./thunk";
import { UserLogin } from "types";
import { getToken, removeToken } from "utils";

type AuthServiceInitialState = {
  token: string | null;
  userLogin?: UserLogin;
  isFetchingLogin: boolean;
};

const initialState: AuthServiceInitialState = {
  token: getToken() ?? null,
  isFetchingLogin: false,
};

const authServiceSlice = createSlice({
  name: "authService",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.userLogin = undefined;
      removeToken();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isFetchingLogin = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        localStorage.setItem("TOKEN", payload.token);
        state.token = payload.token;
        state.userLogin = payload;
        state.isFetchingLogin = false;
      })
      .addCase(getUserByTokenThunk.fulfilled, (state, { payload }) => {
        state.userLogin = payload;
      });
  },
});

export const { actions: authServiceActions, reducer: authServiceReducer } =
  authServiceSlice;
