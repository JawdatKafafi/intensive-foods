import React, { Component } from "react";
import { getFoods } from "../Services/fakeFoodService";
import Favorite from "./common/Favorite";
import Pagination from "./common/Pagination";
class Foods extends Component {
  state = {
    foods: getFoods(),
    pageSize: 4,
  };

  handleFavor = (food) => {
    const foods = [...this.state.foods];
    const index = foods.indexOf(food);
    foods[index] = { ...food };
    foods[index].isFavorite = !foods[index].isFavorite;
    this.setState({ foods });
  };

  render() {
    const { length: count } = this.state.foods;

    if (count === 0) return <p>There are no foods in the database.</p>;

    return (
      <div>
        <p>Showing {count} foods in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stocks</th>
              <th>Price</th>
              <th />
              <th />
            </tr>
          </thead>
          <tbody>
            {this.state.foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category.name}</td>
                <td>{food.numberInStock}</td>
                <td>{food.price}</td>
                <td>
                  <Favorite
                    onFavor={() => this.handleFavor(food)}
                    isFavorite={food.isFavorite}
                  />
                </td>
                <td>
                  <button
                    onClick={() => this.handleDelete(food)}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination itemCount={count} pageSize={this.state.pageSize} />
      </div>
    );
  }
  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });
  };
}

export default Foods;
