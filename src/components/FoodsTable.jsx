import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/Table";
import Favorite from "./common/Favorite";

class FoodsTable extends Component {
  columns = [
    {
      lable: "Name",
      path: "name",
      content: (food) => <Link to={`/foods/${food._id}`}>{food.name}</Link>,
    },
    { lable: "Category", path: "category.name" },
    { lable: "Stocks", path: "numberInStock" },
    { lable: "Price", path: "price" },
    {
      key: "favorite",
      content: (food) => (
        <Favorite
          isFavorite={food.isFavorite}
          onFavor={() => this.props.onFavor(food)}
        />
      ),
    },
    {
      key: "delete",
      content: (food) => (
        <button
          onClick={() => this.props.onDelete(food)}
          className="btn btn-danger"
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { foods, onSort, sortColumn } = this.props;
    return (
      <Table
        data={foods}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default FoodsTable;
