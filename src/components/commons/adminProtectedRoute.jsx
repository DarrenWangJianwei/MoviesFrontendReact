import React from "react";
import { Redirect, Route } from "react-router-dom";
import auth from "../../sources/authService";

const AdminProtectedRoute = (props) => {
  const { component: Component, render, ...rest } = props;

  return (
    <Route
      {...rest}
      render={(props) => {
        const user = auth.getCurrentUser();
        if (!user.isAdmin)
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

export default AdminProtectedRoute;
