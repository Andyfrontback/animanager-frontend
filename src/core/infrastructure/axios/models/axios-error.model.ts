// Estructura común de errores en APIs REST
export interface BackendErrorResponse {
  status?: number;
  type?: string;
  message?: string;
  error?: string;
  messages?: Record<string, string[]>;
}
