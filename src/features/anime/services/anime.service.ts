import { api } from "@/lib/axios";
import type { Anime, UseApiCall } from "@/models";
import { loadController } from "@/utils";
import type { queryParamsInput } from "../schemas/anime.schema";

const searchAnimesService = ({
  start_date,
  page,
  limit,
  order_by,
  sort,
}: queryParamsInput): UseApiCall<Anime[]> => {
  const controller = loadController();
  const call = api.get<Anime[]>(
    `/anime?order_by=${order_by}&sort=${sort}&start_date=${start_date}&page=${page}&limit=${limit}`,
  );

  return {
    call,
    controller,
  };
};

export { searchAnimesService };
