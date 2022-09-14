import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ children, isLoggedIn }) => {
  return (
    <Route>
      {() =>
        isLoggedIn ? children : <Redirect to="/sign-in" />
      }
    </Route>
  );
};

export default ProtectedRoute;
