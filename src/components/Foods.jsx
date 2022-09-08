import React, { Component } from "react";
import { getFoods } from "../Services/fakeFoodService";
import { getCategories } from "../Services/fakeCategoryService";
import _ from "lodash";
import { paginate } from "../utils/paginate";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import FoodsTable from "./FoodsTable";
const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    selectedCategory: DEFAULT_CATEGORY,
    sortColumn: { path: "name", order: "asc" },
  };

  componentDidMount = () => {
    const categories = [DEFAULT_CATEGORY, ...getCategories()];
    this.setState({ foods: getFoods(), categories });
  };

  handleFavor = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };

  handleSort = (sortColumn) => this.setState({ sortColumn });
  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleCategorySelect = (category) => {
    this.setState({ selectedCategory: category, selectedPage: 1 });
  };

  render() {
    const {
      pageSize,
      selectedPage,
      categories,
      selectedCategory,
      sortColumn,
      foods: allFoods,
    } = this.state;
    const { length: count } = allFoods;

    if (count === 0) return <p>There are no foods in the database.</p>;

    const filtredFoods = selectedCategory._id
      ? allFoods.filter((f) => f.category._id === selectedCategory._id)
      : allFoods;

    const sortedFoods = _.orderBy(
      filtredFoods,
      [sortColumn.path],
      [sortColumn.order]
    );

    const foods = paginate(sortedFoods, selectedPage, pageSize);

    return (
      <div className="row">
        <div className="col-2">
          <ListGroup
            items={categories}
            selectedItem={selectedCategory}
            onItemSelect={this.handleCategorySelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtredFoods.length} foods in the database</p>
          <FoodsTable
            foods={foods}
            onFavor={this.handleFavor}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={filtredFoods.length}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });
  };
}

export default Foods;
