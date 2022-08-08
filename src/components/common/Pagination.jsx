import React from "react";

function Pagination({ itemCount, pageSize }) {
  const pageCount = Math.ceil(itemCount / pageSize);

  if (pageCount === 1) return null;

  const pages = range(1, pageCount);

  return (
    <ul className="pagination">
      {pages.map((page) => (
        <li key={page} className="page-item">
          <button href="" className="page-link">
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default Pagination;

function range(start, end) {
  const result = [];

  for (let i = start; i <= end; i++) result.push(i);
  return result;
}
