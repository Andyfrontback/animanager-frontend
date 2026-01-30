// useApi.ts
import { useCallback, useEffect, useState, useRef } from "react";
import axios from "axios";
import { type UseApiCall, type ApiError } from "@/models";

interface UseApiOptions<P> {
  autoFetch?: boolean;
  param: P;
}

type Data<T> = T | null;
type CustomError = ApiError | null;

interface UseApiResult<T, P> {
  data: Data<T>;
  error: CustomError;
  loading: boolean;
  fetch: (param: P) => void;
}

export const useApi = <T, P>(
  apiCall: (param: P) => UseApiCall<T>,
  options?: UseApiOptions<P>,
): UseApiResult<T, P> => {
  const [data, setData] = useState<Data<T>>(null);
  const [error, setError] = useState<CustomError>(null);
  const [loading, setLoading] = useState<boolean>(false); // Inicia en false hasta que se active

  // Usamos un ref para guardar el controller de la petición ACTUAL
  const controllerRef = useRef<AbortController | null>(null);

  const fetchData = useCallback(
    async (param: P) => {
      // 1. Si hay una petición en curso, la cancelamos antes de hacer la nueva
      if (controllerRef.current) {
        controllerRef.current.abort();
      }

      setLoading(true);

      const { call, controller } = apiCall(param);

      controllerRef.current = controller;

      try {
        const response = await call;
        setData(response);
        setError(null);
      } catch (err) {
        // IMPORTANTE: Solo setteamos error si NO fue una cancelación
        if (axios.isCancel(err)) {
          return;
        }

        setError(err as CustomError);
        setData(null);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }

      return () => {
        controller.abort();
      };
    },
    [apiCall],
  );

  useEffect(() => {
    if (options?.autoFetch && options.param !== undefined) {
      fetchData(options.param);
    }

    // Cleanup function del useEffect: Cancelar petición al desmontar el componente
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, [fetchData, options?.autoFetch, options?.param]);

  return { data, error, loading, fetch: fetchData };
};
