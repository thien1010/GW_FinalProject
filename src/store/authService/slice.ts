import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getUserByTokenThunk, loginThunk } from "./thunk";
import { UserLogin } from "types";
import { getToken, removeToken } from "utils";
type AuthServiceInitialState = {
  accesstoken: string | null;
  userLogin?: UserLogin;
  isFetchingLogin: boolean;
};
const initialState: AuthServiceInitialState = {
  accesstoken: getToken() ?? null,
  isFetchingLogin: false,
};

const authServiceSlice = createSlice({
  name: "authService",
  initialState,
  reducers: {
    logOut: (state, { payload }: PayloadAction<string>) => {
      console.log("payload: ", payload);
      state.accesstoken = undefined;
      state.userLogin = undefined;
      removeToken();
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.isFetchingLogin = true;
      })
      .addCase(loginThunk.rejected, (state) => {
        state.isFetchingLogin = false;
      })
      .addCase(loginThunk.fulfilled, (state, { payload }) => {
        console.log("payload: ", payload);
        localStorage.setItem("ACCESSTOKEN", payload.accesstoken);
        state.accesstoken = payload.accesstoken;
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
