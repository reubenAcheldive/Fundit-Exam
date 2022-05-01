import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Pagination, Row } from "react-bootstrap";
import { Match, PaginatedData } from "../../api";
import { changeColorByCreditScore } from "../../utils/creditScoreColor";
import { searchFilters } from "../../utils/searchFilters";
import { Footer } from "./Footer";
import { PaginationMatches } from "./PaginationMatches";
import { UserDetails } from "./UserDetails";
export const Matches = ({
  matches,
  search,
  paginated,
}: {
  matches: PaginatedData[];
  search: string;
  paginated: (page: number) => void;
}) => {
  const [match, setMatches] = useState(matches);
  const [sort, setSort] = useState(false);
  const [active, setActive] = useState(1);
  const filteredMatches = match
    .filter(searchFilters(search))
    .sort((a, b) =>
      sort
        ? a.borrower.creditScore - b.borrower.creditScore
        : a.borrower.creditScore
    );
  useEffect(() => {
    setMatches(matches);
  });

  return (
    <Row className="matches">
      <span>
        {" "}
        <Button onClick={() => setSort((prev) => !prev)}>Sort</Button>
      </span>
      {filteredMatches.map(
        ({ borrower, creationTime, id, companyName, amountReq, labels }) => (
          <Col md={4} sm={6} key={id}>
            <li className="match">
              <span>
                {" "}
                <Badge bg={changeColorByCreditScore(borrower.creditScore)}>
                  Credit Score:{borrower.creditScore}
                </Badge>
              </span>
              <h5 className="title">{companyName}</h5>
              <div className="matchData">
                <div>
                  <UserDetails borrower={borrower} />

                  <p className="userDate">
                    <b>Amount Request: </b> {amountReq}
                  </p>
                  <p className="userDate">
                    <b>Balance: </b> {borrower.financeData.balance}{" "}
                    {borrower.financeData.currency}
                  </p>
                </div>
              </div>
              <p className="userDate">
                <b> Label: </b>
                {labels?.map((l, i) => (
                  <span key={i}>{l.split(' ')[i]}</span>
                ))}
              </p>
              <Footer creationTime={creationTime} />
            </li>
          </Col>
        )
      )}
    </Row>
  );
};
