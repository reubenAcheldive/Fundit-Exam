import React, { useEffect, useState } from "react";
import "./App.css";
import { Matches } from "./components/Matches/Matches";
import { createApiClient, Match, PaginatedData } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
import { ISpinner } from "./components/ISpinner";
export type AppState = {
  matches?: Match[];
  search: string;
};

const App = () => {
  const [search, setSearch] = useState<string>("");
  const [matches, setMatches] = useState<PaginatedData[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    fetchMatches();
  }, [page]);
  const api = createApiClient(page);
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
  let searchDebounce: any;

  const paginated = (page: number) => {
    setPage(page);
  };
  const onSearch = (val: string) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(async () => {
      setSearch(val);
    }, 1000);
  };
  console.log(matches);

  return (
    <Container>
      <main>
        <h1>Matches List</h1>
        <header>
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => onSearch(e.target.value)}
          />
        </header>

        <Row>
          {matches ? (
            <div className="results">Showing {matches.length} results</div>
          ) : null}
        </Row>
        <Row>
          {matches.length ? (
            <Matches matches={matches} search={search} paginated={paginated} />
          ) : (
            loading && <ISpinner />
          )}
        </Row>
      </main>
    </Container>
  );
};
export default App;
