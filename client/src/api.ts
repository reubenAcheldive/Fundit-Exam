import axios from "axios";
import { Match, PaginatedData } from "./api.modals";
const base_api = "http://localhost:8888/api/match";
export const createApiClient = async (
  page: number
): Promise<{
  data: PaginatedData[];
  page: number;
  limit: number;
}> => {
  const { data } = await axios.get<Match>(`${base_api}?page=${page}`);
  return { data: data.paginatedData, page: data.page, limit: data.limit };
};

export const deleteApiClient = async (id: string) => {
  console.log(id);

  const { data } = await axios.delete<{ id: string }>(`${base_api}/delete`, {
    data: { id },
  });

  return data.id;
};
