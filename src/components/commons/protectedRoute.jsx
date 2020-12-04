import React from "react";
import auth from "../../sources/authService";
import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  console.log("ProtectedRouteProps", props);
  const { component: Component, render, ...rest } = props;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location },
              }}
            />
          );
        //if component is Component return Component,
        //if it is stateless component(function), render the function with props.
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
