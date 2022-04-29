import React from "react";
import { Badge, Col, Row } from "react-bootstrap";
import { Match } from "./api";
export const Matches = ({
  matches,
  search,
}: {
  matches: Match[];
  search: string;
}) => {
  console.log({ matches });

  const filteredMatches = matches.filter((t) =>
    (
      t.borrower.user.firstName.toLowerCase() +
      t.borrower.user.lastName.toLowerCase() +
      t.companyName.toLowerCase() +
      t.companyName.toLowerCase() +
      t.borrower.user.email.toLowerCase()+
      t.labels?.map((r)=>r.toLowerCase())
    ).includes(search.toLowerCase())
  );
  const changeColorByCreditScore = (creditScore: number): string => {
    if (creditScore > 679) {
      return "success";
    }
    if (579 <= creditScore && creditScore <= 679) {
      return "warning";
    } else return "danger";
  };

  return (
    <Row className="matches">
      {filteredMatches.map((match) => (
        <Col sm={6}>
          <li
            style={{
              background: changeColorByCreditScore(match.borrower.creditScore),
            }}
            key={match.id}
            className="match"
          >
            <span>
              {" "}
              <Badge bg={changeColorByCreditScore(match.borrower.creditScore)}>
                creditScore:{match.borrower.creditScore}
              </Badge>
            </span>
            <h5 className="title">{match.companyName}</h5>
            <div className="matchData">
              <div>
                <p className="userDate">
                  <b>Full Name:</b> {match.borrower.user.firstName}{" "}
                  {match.borrower.user.lastName}
                </p>
                <p className="userDate">
                  <b>Email:</b> {match.borrower.user.email}
                </p>
                <p className="userDate">
                  <b>Amount Request: </b> {match.amountReq}
                </p>
                <p className="userDate">
                  <b>Balance: </b> {match.borrower.financeData.balance}{" "}
                  {match.borrower.financeData.currency}
                </p>
              </div>
            </div>
            <footer>
              <div className="meta-data">
                Created At {new Date(match.creationTime).toLocaleString()}
              </div>
            </footer>
          </li>
        </Col>
      ))}
    </Row>
  );
};
