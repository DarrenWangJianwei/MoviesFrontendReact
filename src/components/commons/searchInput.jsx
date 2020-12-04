import React from "react";

const SearchInput = ({ value, onChange, name }) => {
  return (
    <input
      className="form-control my-3"
      name={name}
      type="text"
      value={value}
      //onChange={onChange}
      onChange={(e) => onChange(e.currentTarget.value)}
      placeholder="Search..."
    ></input>
  );
};

export default SearchInput;
