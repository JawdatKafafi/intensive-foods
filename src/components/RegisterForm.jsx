import React from "react";
import http from "../Services/httpService";
import Joi from "joi";
import Form from "./common/Form";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().allow().label("Name"),
  });

  doSubmit = async () => {
    const data = {
      name: this.state.data.name,
      email: this.state.data.username,
      password: this.state.data.password,
    };
    await http.post("http://localhost:8000/api/users", data);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInput("username", "Username")}
        {this.renderInput("password", "Password", "password")}
        {this.renderInput("name", "Name")}
        {this.renderButton("Registrera")}
      </form>
    );
  }
}

export default RegisterForm;
