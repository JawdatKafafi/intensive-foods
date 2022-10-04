import React from "react";

function Input({ name, lable, value, type, onChange, error }) {
  return (
    <div className="mb3">
      <label htmlFor={name} className="form-lable">
        {lable}
      </label>
      <input
        onChange={onChange}
        value={value}
        className="form-control"
        id={name}
        name={name}
        type={type}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Input;
