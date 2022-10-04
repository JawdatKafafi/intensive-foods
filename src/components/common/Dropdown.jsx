import React from "react";

function Dropdown({
  lable,
  name,
  options,
  error,
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="mb3">
      <label htmlFor={name} className="form-lable">
        {lable}
      </label>
      <select className="form-select">
        <option name={name} value={value} onChange={onChange}>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
}

export default Dropdown;
