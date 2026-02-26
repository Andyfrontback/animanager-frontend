import type { SearchPanelInput } from "../schemas/anime.schema";

const currentYear = new Date().getFullYear();

export const DEFAULT_VALUES: Partial<SearchPanelInput> = {
  start_date: `${currentYear}-01-01`,
  page: "1",
  limit: "12",
  sort: "desc",
  order_by: "score",
  end_date: "",
  q: "",
};
