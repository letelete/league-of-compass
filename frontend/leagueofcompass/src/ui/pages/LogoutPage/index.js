import './style.css';

import CircularLabeledLoadingIndicator from '../../components/LoadingIndicators/CircularLabeledLoadingIndicator';
import Page from '../Page';
import React from 'react';
import { useSelector } from 'react-redux';

const LogoutPage = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Page className="page--logout">
      <CircularLabeledLoadingIndicator
        label={user ? `See you later ${user.personal.name}` : 'Logging out'}
      />
    </Page>
  );
};

export default LogoutPage;
