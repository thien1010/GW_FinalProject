import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { getUserByTokenThunk } from "./authService";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
});
store.dispatch(getUserByTokenThunk());

type AppDispatch = (typeof store)["dispatch"];

export const useAppDispatch: () => AppDispatch = useDispatch;

export type RootState = ReturnType<(typeof store)["getState"]>;
