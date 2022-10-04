import React, { Component } from "react";
import { deleteFood, getFoods } from "../Services/fakeFoodService";
import { getCategories } from "../Services/fakeCategoryService";
import { paginate } from "../utils/paginate";
import { Link } from "react-router-dom";
import _ from "lodash";
import Pagination from "./common/Pagination";
import ListGroup from "./common/ListGroup";
import FoodsTable from "./FoodsTable";
import SearchBox from "./common/SearchBox";

const DEFAULT_CATEGORY = { _id: "", name: "All categories" };

class Foods extends Component {
  state = {
    foods: [],
    categories: [],
    pageSize: 4,
    selectedPage: 1,
    searchQuery: "",
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

  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });
    deleteFood(food._id);
  };

  handleSearch = (searchQuery) =>
    this.setState({ searchQuery, selectedCategory: DEFAULT_CATEGORY });

  handleSort = (sortColumn) => this.setState({ sortColumn });

  handlePageChange = (page) => this.setState({ selectedPage: page });

  handleCategorySelect = (category) => {
    this.setState({
      selectedCategory: category,
      selectedPage: 1,
      searchQuery: "",
    });
  };

  getPaginatedFoods() {
    const {
      pageSize,
      selectedPage,
      selectedCategory,
      searchQuery,
      sortColumn,
      foods: allFoods,
    } = this.state;

    let filtredFoods = allFoods;

    if (selectedCategory._id) {
      filtredFoods = allFoods.filter(
        (f) => f.category._id === selectedCategory
      );
    } else if (searchQuery) {
      filtredFoods = allFoods.filter((f) =>
        f.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
      );
    }

    const sortedFoods = _.orderBy(
      filtredFoods,
      [sortColumn.path],
      [sortColumn.order]
    );

    const foods = paginate(sortedFoods, selectedPage, pageSize);
    return { foods, filtredCount: filtredFoods.length };
  }

  render() {
    const {
      pageSize,
      selectedPage,
      categories,
      selectedCategory,
      searchQuery,
      sortColumn,
      foods: allFoods,
    } = this.state;
    const { length: count } = allFoods;

    if (count === 0) return <p>There are no foods in the database.</p>;

    const { foods, filtredCount } = this.getPaginatedFoods();

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
          <Link to="/foods/new" className="btn btn-primary mt-4">
            New Food
          </Link>
          <p>Showing {filtredCount.length} foods in the database</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <FoodsTable
            foods={foods}
            onFavor={this.handleFavor}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
            sortColumn={sortColumn}
          />
          <Pagination
            itemCount={filtredCount.length}
            pageSize={pageSize}
            selectedPage={selectedPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Foods;
