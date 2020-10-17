import { Redirect, Route } from 'react-router-dom';

import PATHS from '../../config/paths';
import React from 'react';
import { useSelector } from 'react-redux';

const AuthRoute = ({ children, ...routeProps }) => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Route
      {...routeProps}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: PATHS.AUTH,
              state: { redirectedFrom: location },
            }}
          />
        )
      }
    />
  );
};

export default AuthRoute;
