import type { AxiosInstance, AxiosRequestConfig } from "axios";

export interface CustomAxiosInstance extends Omit<
  AxiosInstance,
  "get" | "post" | "put" | "delete" | "patch"
> {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<T>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<T>;
}
