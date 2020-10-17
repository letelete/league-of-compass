import AuthPolyButton from './AuthPolyButton';
import FIREBASE from '../../../config/firebase';
import GoogleLogin from 'react-google-login';
import React from 'react';
import { actions as authActions } from '../../../store/ducks/auth';
import { useDispatch } from 'react-redux';

const GoogleAuthPolyButton = () => {
  const dispatch = useDispatch();

  const handleGoogleResponse = (response) => {
    const idToken = response.tokenId;
    dispatch(authActions.authenticate(idToken));
  };

  return (
    <GoogleLogin
      clientId={FIREBASE.CLIENT_ID}
      render={(renderProps) => (
        <AuthPolyButton
          onAuthClick={renderProps.onClick}
          defaultLabel={'Continue with Google'}
        />
      )}
      onSuccess={handleGoogleResponse}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleAuthPolyButton;
