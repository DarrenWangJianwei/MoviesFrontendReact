import React, { Component } from "react";
import { toast } from "react-toastify";
import { getRentals, deleteRentalsById } from "../sources/rentalService";
import auth from "../sources/authService";
class Rentals extends Component {
  state = {
    data: [],
    prices: [],
    total: 0,
    isGold: false,
  };

  titlesArray = [
    { name: "title", label: "Title" },
    { name: "dailyRentalRate", label: "Rate($/day)" },
    { name: "days", label: "Days" },
    { name: "priceForDays", label: "price($)" },
  ];

  async componentDidMount() {
    const user = await auth.getCurrentUser();
    const { data } = await getRentals(user._id);
    let isGold = this.state.isGold;
    if (data[0]) {
      isGold = data[0].customer.isGold;
    }
    const prices = this.state.prices;
    for (let r of data) {
      prices[r._id] = 0;
    }
    this.setState({ data, prices, isGold });
  }

  handleChange = ({ currentTarget: input }) => {
    const sum = input.value * input.getAttribute("data-rate");
    const prices = this.state.prices;
    const rentalId = input.getAttribute("data-id");
    prices[rentalId] = sum;
    this.setState({ prices });
    this.sumPrices();
  };

  sumPrices() {
    const prices = this.state.prices;
    let total = 0;
    for (const [key] of Object.entries(prices)) {
      total += prices[key];
    }
    this.setState({ total });
  }

  onRemove = async (id) => {
    const originalRentals = this.state.data;
    const rentals = originalRentals.filter((r) => r._id !== id.toString());
    const originalPrices = this.state.prices;
    var prices = this.state.prices;
    delete prices[id];
    this.setState({ data: rentals, prices });
    this.sumPrices();
    try {
      await deleteRentalsById(id);
    } catch (err) {
      if (err.response && err.response.status === 404)
        toast.error("This movie has already been deleted!");

      this.setState({ movies: originalRentals, prices: originalPrices });
      this.sumPrices();
    }
  };

  render() {
    return (
      <div className="rentalsTable">
        <h1>{this.state.prices}</h1>
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
            {this.state.data.map((r) => (
              <tr key={r._id}>
                <td>{r.movie.title}</td>
                <td>{r.movie.dailyRentalRate}</td>
                <td>
                  <input
                    id="days"
                    type="number"
                    min="0"
                    data-rate={r.movie.dailyRentalRate}
                    data-id={r._id}
                    onChange={this.handleChange}
                  />
                </td>
                <td>{this.state.prices[r._id]}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => this.onRemove(r._id)}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table">
          <tbody>
            <tr>
              <td>Gold Member</td>
              <td colSpan="2">{this.state.isGold ? "Yes" : "No"}</td>
              {this.state.isGold ? <td>* 0.5</td> : <td></td>}
            </tr>
            <tr>
              <td colSpan="3">Total</td>
              <td>{this.state.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Rentals;
