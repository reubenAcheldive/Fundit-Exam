import React, { useEffect, useState } from "react";
import { createApiClient, PaginatedData } from "../../api";

export const useFetch = () => {
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [matches, setMatches] = useState<PaginatedData[]>([]);
  const api = createApiClient(page);
  const paginated = (page: number) => {
    setMatches([]);
    setPage(page);
  };
  useEffect(() => {
    fetchMatches();
  }, [page]);
  async function fetchMatches() {
    try {
      setLoading(true);
      const resMatches = (await api).data;

      setMatches(resMatches);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  }
  return { matches, loading, paginated,page };
};
