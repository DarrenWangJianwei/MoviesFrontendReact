import React from "react";

// ...rest includes value={value}, type={type} onChange={onChange}.
// Note: can't be name={name} because we have name element as a parameter into this function.
// So, We need declear name={name} manually in the <input> companent.
const Input = ({ name, label, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        // value={value}
        // type={type}
        // onChange={onChange}
        {...rest}
        name={name}
        autoFocus
        className="form-control"
        id={name}
      />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
