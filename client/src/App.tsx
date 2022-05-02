import React, { useState } from "react";
import "./App.css";
import { Matches } from "./components/Matches/Matches";

import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Row } from "react-bootstrap";
import { ISpinner } from "./components/ISpinner";

import { PaginationMatches } from "./components/Matches/PaginationMatches";
import { useFetch } from "./components/customHook/customHook";
import { Match } from "./api.modals";
export type AppState = {
  matches?: Match[];
  search: string;
};

const App = () => {
  const [search, setSearch] = useState<string>("");
  const { matches, loading, paginated, page } = useFetch();
  let searchDebounce: any;

  const onSearch = (val: string) => {
    clearTimeout(searchDebounce);
    searchDebounce = setTimeout(async () => {
      setSearch(val);
    }, 1000);
  };
  const [approved, setApproved] = useState<number>(0);
  const [decline, setDecline] = useState<number>(0);
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
          <span>
            <Button className="m-2" size="sm" variant="outline-dark">
              decline : {decline}
            </Button>
            <Button size="sm" variant="outline-danger">
              approved : {approved}
            </Button>
          </span>
          <PaginationMatches paginated={paginated} page={page} />
          {!matches.length && <h1>No List Data</h1>}
          {matches.length ? (
            <Matches
              setApproved={setApproved}
              setDecline={setDecline}
              matches={matches}
              search={search}
              paginated={paginated}
            />
          ) : (
            loading && <ISpinner />
          )}
        </Row>
      </main>
    </Container>
  );
};
export default App;
