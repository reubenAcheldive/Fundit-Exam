import React from "react";
import { splitDateAndTime } from "../../utils/splitDate";

export const Footer: React.FC<{ creationTime: number }> = ({
  creationTime,
}) => {
  return (
    <footer>
      <div className="meta-data">
        Created on {splitDateAndTime(creationTime, 0)}
        <br />
        At {splitDateAndTime(creationTime, 1)}
      </div>
    </footer>
  );
};
