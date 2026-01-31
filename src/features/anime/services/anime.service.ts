import { api } from "@/lib/axios";
import type { Anime, UseApiCall } from "@/models";
import { loadController } from "@/utils";
import type { getTopCurrentAnimesInput } from "../schemas/anime.schema";

const getTopCurrentAnimes = ({
  start_date,
  page,
  limit,
}: getTopCurrentAnimesInput): UseApiCall<Anime[]> => {
  const controller = loadController();
  const call = api.get<Anime[]>(
    `/anime?order_by=score&sort=desc&start_date=${start_date}&page=${page}&limit=${limit}`,
  );

  return {
    call,
    controller,
  };
};

export { getTopCurrentAnimes };
