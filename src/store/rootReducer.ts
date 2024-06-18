import { combineReducers } from "@reduxjs/toolkit";
import { authServiceReducer } from "./authService";
import { userServiceReducer } from "./userService";

export const rootReducer = combineReducers({
  authService: authServiceReducer,
  userService: userServiceReducer,
});
