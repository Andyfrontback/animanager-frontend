import type { AxiosInstance, AxiosRequestConfig } from "axios";
import type { JikanResponse } from "@/models";

// Modificamos la interfaz para que envuelva T automáticamente en JikanResponse
export interface CustomAxiosInstance extends Omit<
  AxiosInstance,
  "get" | "post" | "put" | "delete" | "patch"
> {
  // Ahora T representa SOLO la data útil (ej: Anime[]),
  // y TS sabe que eso viene dentro de una estructura JikanResponse.
  get<T>(url: string, config?: AxiosRequestConfig): Promise<JikanResponse<T>>;

  post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<JikanResponse<T>>;
  put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<JikanResponse<T>>;
  delete<T>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<JikanResponse<T>>;
  patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig,
  ): Promise<JikanResponse<T>>;
}
