import React from "react";
import TableBody from "./TableBody";
import TableHeader from "./TableHeader";

function Table({ onSort, data, columns, sortColumn }) {
  return (
    <table className="table">
      <TableHeader columns={columns} sortColumn={sortColumn} onSort={onSort} />
      <TableBody data={data} columns={columns} />
    </table>
  );
}

export default Table;
