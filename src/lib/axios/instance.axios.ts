import axios, { type AxiosResponse } from "axios";
import {
  errorInterceptor,
  requestInterceptor,
  successInterceptor,
} from "./interceptors.axios";
import type { CustomAxiosInstance } from "./schema.axios";

const BASE_URL = import.meta.env.VITE_API_URL || "https://api.jikan.moe/v4";

const axiosConfig = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosConfig.interceptors.request.use(requestInterceptor);

type AxiosOnFulfilled = (response: AxiosResponse) => AxiosResponse;

axiosConfig.interceptors.response.use(
  successInterceptor as unknown as AxiosOnFulfilled,
  errorInterceptor,
);

export const api = axiosConfig as unknown as CustomAxiosInstance;
