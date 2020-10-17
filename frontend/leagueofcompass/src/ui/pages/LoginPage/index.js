import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import LoginModal from '../../components/LoginModal';
import Page from '../Page';
import { useSelector } from 'react-redux';

const LoginPage = () => {
  const { user } = useSelector((state) => state.auth);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    if (user) {
      const { redirectedFrom } = location.state || { redirectedFrom: '/' };
      history.replace(redirectedFrom);
    }
  }, [history, location, user]);

  return (
    <Page className="page--login">
      <LoginModal />
    </Page>
  );
};

export default LoginPage;
