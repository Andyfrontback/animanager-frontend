import { useApi } from "@/hooks";
import {
  getTopCurrentAnimesSchema,
  type getTopCurrentAnimesInput,
} from "../schemas/anime.schema";
import { getTopCurrentAnimes } from "../services/anime.service";
import type { Anime, UseApiResult } from "@/models";
import { useMemo } from "react";

interface UseTopCurrentAnimesResult extends UseApiResult<
  Anime[],
  getTopCurrentAnimesInput
> {
  paginateOptions: getTopCurrentAnimesInput;
}

const useTopCurrentAnimes = (
  reqParams?: getTopCurrentAnimesInput,
): UseTopCurrentAnimesResult => {
  // 1. Validamos la data que nos llega como prop (Se debe encerrar esto en el router entre boundaries)
  const paginateOptions = useMemo(
    () => getTopCurrentAnimesSchema.parse(reqParams),
    [reqParams],
  );

  // 2. Llamamos al hook con el servicio para que resuelvan la petición
  return {
    ...useApi<Anime[], getTopCurrentAnimesInput>(getTopCurrentAnimes, {
      autoFetch: true,
      param: paginateOptions,
    }),
    paginateOptions,
  };
};

export { useTopCurrentAnimes };
