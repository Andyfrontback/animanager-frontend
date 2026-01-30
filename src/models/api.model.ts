//api.model.ts
export interface JikanResponse<T> {
  data: T;
  pagination?: {
    last_visible_page: number;
    has_next_page: boolean;
    current_page: number;
    items: {
      count: number;
      total: number;
      per_page: number;
    };
  };
}

// Definimos la forma que tendrán las promesas de los services
export interface UseApiCall<T> {
  call: Promise<T>;
  controller: AbortController;
}

// Definimos la forma bonita que tendrán nuestros errores
export interface ApiError {
  message: string;
  code: string | null;
  status: number | null;
  isNetworkError: boolean;
}

// models/error.model.ts (o dentro de interceptors si prefieres)
export interface BackendErrorResponse {
  message?: string;
  error?: string; // Algunas APIs usan 'error' en vez de message
  status?: number;
}

// Mapa de mensajes amigables para el usuario
export const statusMessages: Record<number, string> = {
  400: "La información enviada no es válida. Por favor verifica los datos.",
  401: "Tu sesión ha expirado o no tienes permisos. Por favor inicia sesión nuevamente.",
  403: "No tienes permiso para realizar esta acción.",
  404: "No encontramos lo que estabas buscando.",
  409: "Hubo un conflicto con la solicitud (posiblemente datos duplicados).",
  500: "Tuvimos un problema en nuestros servidores. Inténtalo más tarde.",
  503: "El servicio no está disponible en este momento.",
};
