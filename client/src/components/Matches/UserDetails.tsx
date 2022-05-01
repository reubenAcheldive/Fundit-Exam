import React from "react";
import { Match, PaginatedData } from "../../api";

export const UserDetails: React.FC<Partial<PaginatedData>> = ({ borrower }) => {
  return (
    <>
      <p className="userDate">
        <b>Full Name:</b> {borrower?.user.firstName} {borrower?.user.lastName}
      </p>
      <p className="userDate">
        <b>Email:</b> {borrower?.user.email}
      </p>
    </>
  );
};
