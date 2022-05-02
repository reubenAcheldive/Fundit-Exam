import React from "react";
import { PaginatedData } from "../../api.modals";

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
