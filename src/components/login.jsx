import React from "react";
import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Form from "./commons/form";
import Auth from "../sources/authService";

class Login extends Form {
  state = {
    // username, password cann't be null or undefined because we use the username and
    // password on value={this.state.data.useranme or password}
    data: { username: "", password: "" },
    errors: {},
  };
  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  doSubmit = async () => {
    try {
      await Auth.login(this.state.data.username, this.state.data.password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/";
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (Auth.getCurrentUser()) return <Redirect to="/" />;
    return (
      <div id="login">
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Passwrod", "password")}
          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default Login;
