import axios, { AxiosRequestHeaders, CreateAxiosDefaults } from "axios";
import { getToken } from "utils";

export const apiInstance = (config?: CreateAxiosDefaults) => {
  const api = axios.create(config);
  api.interceptors.request.use((config) => {
    return {
      ...config,
      headers: {
        Authorization: "Bearer " + getToken(),
      } as unknown as AxiosRequestHeaders,
    };
  });
  return api;
};
