import React from "react";
import "./App.css";
import { Matches } from "./Matches";
import { createApiClient, Match } from "./api";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row } from "react-bootstrap";
export type AppState = {
  matches?: Match[];
  search: string;
};

const api = createApiClient();
const App = () => {
  const [search, setSearch] = React.useState<string>("");
  const [matches, setMatches] = React.useState<Match[]>([]);
  React.useEffect(() => {
    async function fetchMatches() {
      setMatches(await api.getMatches());
    }
    fetchMatches();
  }, []);
  let searchDebounce: any;

  const onSearch = (val: string, newPage?: number) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(async () => {
      setSearch(val);
    }, 300);
  };
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
          {matches ? (
            <Matches matches={matches} search={search} />
          ) : (
            <h2>Loading...</h2>
          )}
        </Row>
      </main>
    </Container>
  );
};
export default App;
