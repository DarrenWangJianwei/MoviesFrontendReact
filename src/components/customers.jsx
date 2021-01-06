import React, { Component } from "react";
import { toast } from "react-toastify";
import {
  getCustomers,
  saveChangedAndRemoved,
} from "../sources/customerService";
import _ from "lodash";

class Customers extends Component {
  state = {
    data: [],
    reset: [],
    errors: {},
    changed: [],
    removed: [],
  };

  titlesArray = [
    { name: "account", label: "Account" },
    { name: "name", label: "Name" },
    { name: "isGold", label: "IsGold" },
    { name: "remove", label: "" },
  ];

  async componentDidMount() {
    const { data } = await getCustomers();
    const reset = _.cloneDeep(data);
    this.setState({ data, reset });
  }

  onChangeIsGold = (c, { currentTarget: input }) => {
    const customers = this.state.data;
    const index = customers.indexOf(c);
    customers[index].isGold = input.value === "true";
    const changed = this.state.changed;
    changed.push(customers[index]);
    this.setState({ data: customers, changed });
  };

  onReset = () => {
    const reset = this.state.reset;
    const data = _.cloneDeep(reset);
    this.setState({ data });
  };

  onRemove = (c) => {
    const customers = this.state.data;
    const index = customers.indexOf(c);
    const removed = this.state.removed;
    removed.push(customers[index]);
    delete customers[index];
    this.setState({ data: customers, removed });
  };

  onSave = async () => {
    try {
      await saveChangedAndRemoved(this.state.removed, this.state.changed);
      window.location.reload();
    } catch (err) {
      if (err.response && err.response.status === 404)
        toast.error(err.response.data);
    }
  };

  render() {
    return (
      <div className="customersTable">
        <table className="table">
          <thead>
            <tr>
              {this.titlesArray.map((title) => (
                <th key={title.name} scope="col">
                  {title.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((c) => (
              <tr key={c._id}>
                <td>{c.user.email}</td>
                <td>{c.name}</td>
                <td>
                  <div className="form-group">
                    <select
                      className="form-control"
                      value={c.isGold}
                      onChange={(e) => this.onChangeIsGold(c, e)}
                    >
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                    </select>
                  </div>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => this.onRemove(c)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="2">
                <button className="btn btn-warning" onClick={this.onReset}>
                  Reset
                </button>
              </td>
              <td>
                <button className="btn btn-primary" onClick={this.onSave}>
                  Save
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Customers;
