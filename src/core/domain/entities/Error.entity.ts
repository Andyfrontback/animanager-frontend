export interface AppError {
  message: string;
  code?: string;
  status?: number;
  isNetworkError: boolean;
  raw?: unknown;
}

// Diccionario de mensajes por defecto
export const HTTP_STATUS_MESSAGES: Record<number, string> = {
  400: "La solicitud es incorrecta.",
  401: "Sesión expirada. Por favor, inicia sesión de nuevo.",
  403: "No tienes permisos para realizar esta acción.",
  404: "El recurso solicitado no existe.",
  500: "Error interno del servidor. Inténtalo más tarde.",
};
