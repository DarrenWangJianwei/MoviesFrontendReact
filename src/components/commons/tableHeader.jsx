import React, { Component } from "react";
class TableHeader extends Component {
  raiseSort = (path) => {
    let sortColumn = { ...this.props.sortColumn };
    if (path === sortColumn.path) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    this.props.onSort(sortColumn);
  };
  sortIcon(title) {
    const { sortColumn } = this.props;
    if (title.name !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fa fa-sort-asc"></i>;
    return <i className="fa fa-sort-down"></i>;
  }
  render() {
    const { titlesArray } = this.props;
    return (
      <thead>
        <tr>
          {titlesArray.map((title) => (
            <th
              key={title.name || title.key}
              onClick={() => this.raiseSort(title.name)}
              scope="col"
            >
              {title.label}
              {this.sortIcon(title)}
            </th>
          ))}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
