import Joi from "joi";
import React from "react";
import Form from "./common/Form";
import { getCategories } from "../Services/fakeCategoryService";
import { getFood, saveFood } from "../Services/fakeFoodService";

class FoodForm extends Form {
  state = {
    data: {
      _id: "",
      name: "",
      category: "",
      categoryId: "",
      numberInStock: "",
      price: "",
    },
    errors: {},
    categories: [],
  };

  schema = Joi.object({
    _id: Joi.string().allow(""),
    name: Joi.string().required().label("Name"),
    categoryId: Joi.string().required().label("Category"),
    numberInStock: Joi.number().required().min(0).max(100).label("Stock"),
    price: Joi.number().required().min(0).max(10).label("Price"),
  });
  componentDidMount() {
    this.populateCategories();
    this.populateFood();
  }

  populateFood() {
    const foodId = this.props.match.params.id;
    if (!foodId === "new") return;

    const food = getFood(foodId);
    if (!food) this.props.history.replace("/not-found");

    this.setState({ data: this.mapToViewModel(food) });
  }

  populateCategories() {
    const categories = getCategories();
    this.setState({ categories });
  }

  mapToViewModel(food) {
    return {
      _id: food._id,
      name: food.name,
      categoryId: food.category._id,
      numberInStock: food.numberInStock,
      price: food.price,
    };
  }

  doSubmit = () => {
    saveFood(this.state.data);
    this.props.history.push("/foods");
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("name", "Name")}
        {this.renderSelect(
          "categoryId",
          "Category",
          this.state.categories,
          "Select Category..."
        )}
        {this.renderInput("numberInStock", "Stock")}
        {this.renderInput("price", "Price")}
        {this.renderButton("Save")}
      </form>
    );
  }
}

export default FoodForm;
