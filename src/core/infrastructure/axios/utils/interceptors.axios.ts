import type {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { HTTP_STATUS_MESSAGES, type AppError } from "@/core/domain/entities";
import type { BackendErrorResponse } from "@/core/infrastructure/axios/models";

export const requestInterceptor = (
  config: InternalAxiosRequestConfig,
): InternalAxiosRequestConfig => {
  if (!config.headers) {
    return config;
  }

  config.headers.set("Content-Type", "application/json");

  return config;
};

export const successInterceptor = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

export const errorInterceptor = (
  error: AxiosError<BackendErrorResponse>,
): Promise<AppError> => {
  // Construimos nuestro objeto de error personalizado
  const customError: AppError = {
    message: "Ocurrió un error desconocido.",
    code: error.code,
    status: error.response?.status,
    isNetworkError: false,
    raw: error,
  };

  if (error.response) {
    // Caso 1: El servidor respondió (4xx, 5xx)
    const { status, data } = error.response;
    customError.status = status;

    const backendMessage = data?.message || data?.error;
    customError.message =
      backendMessage || HTTP_STATUS_MESSAGES[status] || customError.message;

    // NOTA: El manejo especial para 401 (Redirección) podría ir acá
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
