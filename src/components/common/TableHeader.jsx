import React, { Component } from "react";

class TableHeader extends Component {
  raisSort = (path) => {
    const sortColumn = { ...this.props.sortColumn };
    if (sortColumn.path === path) {
      sortColumn.path = path;
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }

    this.props.onSort(sortColumn);
  };

  renderSortIcon(column) {
    const { sortColumn } = this.props;
    if (sortColumn.path !== column.path) return null;
    if (sortColumn.order === "asc")
      return <i className="fa-solid fa-sort-down" />;
    return <i className="fa-solid fa-sort-up" />;
  }

  render() {
    return (
      <thead>
        <tr>
          {this.props.columns.map((columns) => (
            <th
              key={columns.path || columns.key}
              onClick={() => this.raisSort(columns.path)}
            >
              {columns.lable} {this.renderSortIcon(columns)}
            </th>
          ))}
          <th />
          <th />
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
