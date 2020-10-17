import LoginModal from '../../components/LoginModal';
import Page from '../Page';
import React from 'react';

const LoginPage = () => {
  return (
    <Page className="page--login">
      <LoginModal />
    </Page>
  );
};

export default LoginPage;
