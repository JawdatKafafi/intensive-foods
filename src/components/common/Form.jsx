import React, { Component } from "react";
import Dropdown from "./Dropdown";
import Input from "./Input";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  validate() {
    const options = { abortEarly: false };
    const { error } = this.schema.validate(this.state.data, options);

    if (!error) return null;

    const errors = {};
    for (const detail of error.details)
      errors[detail.context.key] = detail.message;

    return errors;
  }

  validateProperty({ name, value }) {
    const subSchema = this.schema.extract(name);
    const { error } = subSchema.validate(value);

    if (!error) return null;

    return error.details[0].message;
  }

  handleChange = ({ target: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
  };
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors });
    if (errors) return;

    this.doSubmit();
  };
  renderButton(lable) {
    return (
      <button className="btn btn-primary" disabled={this.validate()}>
        {lable}
      </button>
    );
  }

  renderInput(name, lable, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        lable={lable}
        type={type}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
  renderSelect(name, lable, options, placeholder = "Select...") {
    const { data, errors } = this.state;
    return (
      <Dropdown
        name={name}
        lable={lable}
        options={options}
        placeholder={placeholder}
        value={data[name]}
        error={errors[name]}
        onChange={this.handleChange}
      />
    );
  }
}

export default Form;
