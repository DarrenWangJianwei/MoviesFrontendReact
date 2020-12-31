import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../sources/authService";

const ProtectedRoute = (props) => {
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
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
