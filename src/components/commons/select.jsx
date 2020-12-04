import React from "react";

const Select = ({ value, name, onChange, options, label, error }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className="form-control"
        value={value}
        onChange={onChange}
      >
        {options.map((g) => (
          <option key={g._id} value={g._id}>
            {g.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
