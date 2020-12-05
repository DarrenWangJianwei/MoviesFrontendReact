import React from "react";
import _ from "lodash";
import PropTypes from "prop-types";

const Pagination = (props) => {
  const { totalNumber, pageSize, currentPage, handlePageChange } = props;
  const pageNumber = Math.ceil(totalNumber / pageSize);
  if (pageNumber === 1) return null;
  const pages = _.range(1, pageNumber + 1);
  return (
    <ul className="pagination">
      {pages.map((page) => {
        return (
          <li
            key={page}
            className={page === currentPage ? "page-item active" : "page-item"}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(page)}
            >
              {page}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
Pagination.propTypes = {
  totalNumber: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handlePageChange: PropTypes.func.isRequired,
};

export default Pagination;
