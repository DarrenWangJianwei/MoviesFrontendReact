import React from "react";
import { getCustomer } from "../sources/customerService";
import auth from "../sources/authService";
import Form from "./commons/form";
import Joi from "joi-browser";
import { updateCustomer } from "../sources/customerService";
class Customers extends Form {
  state = {
    data: {
      name: "",
      email: "",
      phone: 0,
      address: "",
      city: "",
      province: "",
      zip: "",
      isGold: false,
      _id: "",
      user: "",
    },
    provinceCollection: [],
    errors: {},
  };
  schema = {
    name: Joi.string().label("name"),
    email: Joi.string().label("email"),
    phone: Joi.number().label("Number"),
    address: Joi.string().label("address"),
    city: Joi.string().label("city"),
    province: Joi.string().label("province"),
    zip: Joi.string().label("zip"),
    isGold: Joi.boolean().label("isGold"),
    _id: Joi.string().label("ID"),
    user: Joi.string().label("userId"),
  };
  async componentDidMount() {
    const user = await auth.getCurrentUser();
    console.log(user._id);
    const { data } = await getCustomer(user._id);
    console.log(data);
    this.setState({ data });
  }
  doSubmit = async () => {
    await updateCustomer(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <div className="customerForm">
          <h1>Customer Info</h1>
          <form className="row g-3" onSubmit={this.handleSubmit}>
            <div className="col-md-6">{this.renderInput("name", "Name")}</div>
            <div className="col-md-6">
              {this.renderInput("email", "Email Address")}
            </div>
            <div className="col-12">{this.renderInput("phone", "Phone")}</div>
            <div className="col-12">
              {this.renderInput("address", "Address")}
            </div>
            <div className="col-md-6">{this.renderInput("city", "City")}</div>
            <div className="col-md-4">
              {this.renderInput("province", "Province")}
            </div>
            <div className="col-md-2">{this.renderInput("zip", "Zip")}</div>
            <div className="col-12">{this.renderButton("Save")}</div>
          </form>
        </div>
      </div>
    );
  }
}

export default Customers;
