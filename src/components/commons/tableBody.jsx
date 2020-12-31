import React, { Component } from "react";
import _ from "lodash";

class TableBody extends Component {
  createLink(id) {
    return "/movies/" + id;
  }

  renderCell(r, c) {
    if (c.content) return c.content(r);
    //_.get(r,c.name) return movie[genre.name] becasue the data is a nested structure
    return _.get(r, c.name);
  }

  createKey(r, c) {
    return r._id + (c.name || c.key);
  }

  createClassName(r, c) {
    if (c.key === "add" || c.key === "remove") return "removeCellMargin";
  }

  render() {
    const { data, titlesArray } = this.props;
    return (
      <React.Fragment>
        <tbody>
          {data.map((r) => (
            <tr key={r._id}>
              {titlesArray.map((c) => (
                <td
                  key={this.createKey(r, c)}
                  className={this.createClassName(r, c)}
                >
                  {this.renderCell(r, c)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </React.Fragment>
    );
  }
}

export default TableBody;
