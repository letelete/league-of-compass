import './style.css';

import { Route, Switch } from 'react-router-dom';

import AppNavbar from '../AppNavbar';
import AuthRoute from '../../containers/AuthRoute';
import GlobalRatingPage from '../../pages/GlobalRatingPage';
import LoginPage from '../../pages/LoginPage';
import LogoutPage from '../../pages/LogoutPage';
import MyProfilePage from '../../pages/MyProfilePage';
import MyRatingPage from '../../pages/MyRatingPage';
import PATHS from '../../../config/paths';
import RatePage from '../../pages/RatePage';
import React from 'react';

const AppGrid = () => {
  return (
    <div className="app__grid">
      <section className="app__navigation">
        <AppNavbar />
      </section>
      <section className="app__content">
        <Switch>
          <Route exact path={PATHS.GLOBAL_RATING}>
            <GlobalRatingPage />
          </Route>
          <AuthRoute exact path={PATHS.MY_RATING}>
            <MyRatingPage />
          </AuthRoute>
          <AuthRoute exact path={PATHS.RATE}>
            <RatePage />
          </AuthRoute>
          <AuthRoute exact path={PATHS.MY_PROFILE}>
            <MyProfilePage />
          </AuthRoute>
          <Route exact path={PATHS.LOGOUT}>
            <LogoutPage />
          </Route>
          <Route exact path={PATHS.AUTH}>
            <LoginPage />
          </Route>
        </Switch>
      </section>
    </div>
  );
};

export default AppGrid;
