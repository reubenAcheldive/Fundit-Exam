import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
export const PaginationMatches = ({
  paginated,
}: {
  paginated: (page: number) => void;
}) => {
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item onClick={() => paginated(number)} key={number}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div>
        <Pagination size="sm">{items}</Pagination>
      </div>
    </div>
  );
};
