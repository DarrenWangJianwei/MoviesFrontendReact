import React from "react";

const GenresNav = (props) => {
  const { genres, selectedItem, onItemSelect, textProperty } = props;

  return (
    <ul className="list-group">
      {genres.map((genre) => (
        <li
          key={genre[textProperty]}
          onClick={() => onItemSelect(genre)}
          className={
            selectedItem[textProperty] === genre[textProperty]
              ? "list-group-item active"
              : "list-group-item"
          }
        >
          {genre[textProperty]}
        </li>
      ))}
    </ul>
  );
};

GenresNav.defaultProps = {
  textProperty: "name",
  valueProperty: "_id",
};

export default GenresNav;
