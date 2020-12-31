import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ titlesArray, onSort, sortColumn, data }) => {
  return (
    <table className="table">
      <TableHeader
        titlesArray={titlesArray}
        onSort={onSort}
        sortColumn={sortColumn}
      />
      <TableBody data={data} titlesArray={titlesArray} />
    </table>
  );
};

export default Table;
