import { apiInstance } from "constant";
import { LoginSchemaType, RegisterSchemaType } from "schema";
import { UserLogin } from "types";

const api = apiInstance({
  baseURL: import.meta.env.VITE_AUTH_SERVICES_API,
});

export const authService = {
  register: (data: RegisterSchemaType) => api.post("/register", data),
  login: (data: LoginSchemaType) =>
    api.post<ApiResponse<UserLogin>>("/login", data),
};
