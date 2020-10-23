import { Route, Switch } from 'react-router-dom';

import AppTopBar from '../AppTopBar';
import AuthRoute from '../../containers/AuthRoute';
import GlobalRatingPage from '../../pages/GlobalRatingPage';
import LoginPage from '../../pages/LoginPage';
import LogoutPage from '../../pages/LogoutPage';
import MyProfilePage from '../../pages/MyProfilePage';
import MyRatingPage from '../../pages/MyRatingPage';
import PATHS from '../../../config/paths';
import RatePage from '../../pages/RatePage';
import React from 'react';
import { useMobileMediaQuery } from '../../hooks/useMediaQuery';

const AppContent = () => {
  const isMobile = useMobileMediaQuery();

  return (
    <>
      {isMobile && <AppTopBar />}
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
    </>
  );
};

export default AppContent;
