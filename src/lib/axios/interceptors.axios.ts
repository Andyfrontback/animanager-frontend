// interceptors.ts
import {
  statusMessages,
  type ApiError,
  type BackendErrorResponse,
  type JikanResponse,
} from "@/models";
import type {
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

// --- Request Interceptor ---
export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  if (!config.headers) {
    return config;
  }

  config.headers.set("Content-Type", "application/json");

  return config;
};

// --- Response Interceptor (Success) ---
export const successInterceptor = <T>(
  response: AxiosResponse<JikanResponse<T>>,
): JikanResponse<T> => {
  return response.data;
};

// --- Response Interceptor (Error) ---
export const errorInterceptor = (
  error: AxiosError<BackendErrorResponse>,
): Promise<ApiError> => {
  // Construimos nuestro objeto de error personalizado
  const customError: ApiError = {
    message: "Ocurrió un error desconocido.",
    code: error.code || null,
    status: null,
    isNetworkError: false,
  };

  // 1. Error con respuesta del servidor (4xx, 5xx)
  if (error.response) {
    const { status, data } = error.response;
    customError.status = status;

    // Lógica de prioridad del mensaje:
    // 1. Mensaje que viene del Backend (data.message o data.error)
    // 2. Mensaje de nuestro diccionario (statusMessages)
    // 3. Mensaje genérico
    const backendMessage = data?.message || data?.error;
    customError.message =
      backendMessage || statusMessages[status] || customError.message;

    // NOTA: Manejo especial para 401 (Redirección)
    // Es mejor evitar window.location aquí si usas React Router,
    // pero para una solución rápida funciona.
    if (status === 401) {
      // Opcional: Emitter.emit('logout') si usas eventos globales
      // localStorage.removeItem('token');
    }
  }
  // 2. Error de Red (sin respuesta)
  else if (error.request) {
    customError.isNetworkError = true;
    customError.message =
      "No pudimos conectar con el servidor. Revisa tu conexión a internet.";
  }
  // 3. Error de configuración (bug en el código)
  else {
    customError.message = `Error inesperado: ${error.message}`;
  }

  // Rechazamos con NUESTRO objeto limpio, no con el AxiosError gigante
  return Promise.reject(customError);
};
