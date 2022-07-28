import React, { Component } from "react";
import { getFoods } from "./Services/fakeFoodService";

class App extends Component {
  state = { foods: getFoods() };
  render() {
    return (
      <div>
        <p>Showing {this.state.foods.length} foods in the database</p>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Stocks</th>
              <th>Price</th>
            </tr>
            <tr />
          </thead>
          <tbody>
            {this.state.foods.map((food) => (
              <tr key={food._id}>
                <td>{food.name}</td>
                <td>{food.category.name}</td>
                <td>{food.numberInStock}</td>
                <td>{food.price}</td>
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
      </div>
    );
  }
  handleDelete = (food) => {
    const foods = this.state.foods.filter((f) => f._id !== food._id);
    this.setState({ foods });
  };
}

export default App;
