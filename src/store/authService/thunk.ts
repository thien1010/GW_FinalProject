import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginSchemaType } from "schema";
import { authService, userService } from "services";
import { getToken, sleep } from "utils";

export const loginThunk = createAsyncThunk(
  "authService/login",
  async (payload: LoginSchemaType, { rejectWithValue }) => {
    try {
      const { data } = await authService.login(payload);
      await sleep();
      return data.content;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUserByTokenThunk = createAsyncThunk(
  "userService/getUserByToken",
  async (_, { rejectWithValue }) => {
    try {
      const token = getToken();
      if (!token) {
        console.error("No token found in storage."); 
        throw new Error("No token found");
      }
      const response = await userService.getUserByToken({ token });
      if (response.data && response.data.content) {
        return response.data.content;
      } else {
        throw new Error("Invalid user data structure");
      }
    } catch (err) {
      console.error("Error fetching user by token:", err);
      return rejectWithValue({
        message: err.message || "An unknown error occurred",
      });
    }
  }
);
