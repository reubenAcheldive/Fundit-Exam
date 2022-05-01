import React, { useState } from "react";
import Pagination from "react-bootstrap/Pagination";
export const PaginationMatches = ({
  paginated,
  page
}: {
  paginated: (page: number) => void;
  page: number
}) => {
  let items = [];
  for (let number = 1; number <= 5; number++) {
    items.push(
      <Pagination.Item className={number == page ? 'active' :''}   onClick={() => paginated(number)} key={number}>
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
