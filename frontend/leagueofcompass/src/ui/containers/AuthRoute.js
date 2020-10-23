import { Redirect, Route } from 'react-router-dom';

import AuthBasedComponent from './AuthBasedComponent';
import PATHS from '../../config/paths';
import React from 'react';

const AuthRoute = ({ children, ...routeProps }) => {
  return (
    <Route
      {...routeProps}
      render={({ location }) => (
        <AuthBasedComponent>
          {({ isAuthenticated }) =>
            isAuthenticated ? (
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
        </AuthBasedComponent>
      )}
    />
  );
};

export default AuthRoute;
