import React, { useEffect, useState } from "react";
import { Badge, Button, Col, Pagination, Row } from "react-bootstrap";
import { deleteApiClient } from "../../api";
import { PaginatedData } from "../../api.modals";

import { changeColorByCreditScore } from "../../utils/creditScoreColor";
import { searchFilters } from "../../utils/searchFilters";
import { Footer } from "./Footer";

import { UserDetails } from "./UserDetails";
export const Matches = ({
  matches,
  search,
  setDecline,
  setApproved,
}: {
  matches: PaginatedData[];
  search: string;
  paginated: (page: number) => void;
  setDecline: (prev: any) => any;
  setApproved: (prev: any) => any;
}) => {
  const [match, setMatches] = useState<PaginatedData[]>(matches);
  const [sort, setSort] = useState(false);

  const filteredMatches = match
    .filter(searchFilters(search))
    .sort((a, b) =>
      sort
        ? a.borrower.creditScore - b.borrower.creditScore
        : a.borrower.creditScore
    );

  const handelDecline = async (id: string) => {
    const res = await deleteApiClient(id);
    if (res) {
      const newMatches = match.filter(({ id }) => {
        return id !== res;
      });
      setMatches(newMatches);
      setDecline((prev: number) => prev + 1);
    }
  };

  useEffect(() => {
    setMatches(matches);
  }, []);

  return (
    <Row className="matches">
      {/* <span>
        <Button
          className="m-2"
          size="sm"
          onClick={() => setSort((prev) => !prev)}
        >
          Sort
        </Button>
      </span> */}
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
                  <span key={i}>{l.split(" ")[i]}</span>
                ))}
              </p>
              <Footer creationTime={creationTime} />
              <span>
                <Button
                  size="sm"
                  className="m-2"
                  onClick={() => setApproved((prev: number) => prev + 1)}
                  variant="primary"
                >
                  approved
                </Button>
                {labels[0] !== "Decline" ? (
                  <Button
                    size="sm"
                    onClick={() => handelDecline(id)}
                    variant="danger"
                  >
                    decline
                  </Button>
                ) : null}
              </span>
            </li>
          </Col>
        )
      )}
    </Row>
  );
};
