import './style.css';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import CircularLabeledLoadingIndicator from '../../components/LoadingIndicators/CircularLabeledLoadingIndicator';
import Page from '../Page';
import { Redirect } from 'react-router-dom';
import { actions as authActions } from '../../../store/ducks/auth';
import { firstWord } from '../../../helpers/strings';

const LogoutPage = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authActions.loggedOut());
  });

  return (
    <Page className="page--logout">
      {user ? (
        <CircularLabeledLoadingIndicator
          label={
            user
              ? `See you later ${firstWord(user.personal.name)}`
              : 'Logging out'
          }
        />
      ) : (
        <Redirect
          to={{
            pathname: '/',
          }}
        />
      )}
    </Page>
  );
};

export default LogoutPage;
