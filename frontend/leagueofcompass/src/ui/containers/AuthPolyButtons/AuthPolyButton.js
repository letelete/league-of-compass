import POLY_STATES from '../../components/PolyButton/poly_states';
import PolyButton from '../../components/PolyButton';
import React from 'react';
import { selectors } from '../../../store/ducks/auth';
import { useSelector } from 'react-redux';
import { selectors as userSelectors } from '../../../store/ducks/auth';

const AuthPolyButton = ({ defaultLabel, onAuthClick }) => {
  const isAuthenticated = useSelector(userSelectors.isUserAuthenticated);
  const userName = useSelector((state) => {
    const { user } = state.auth;
    return user && user.personal.name;
  });
  const { loading, error } = useSelector(selectors.getAuthenticationCounters);

  const handleOnAuthClick = () => {
    onAuthClick();
  };

  const currentStateData = () => {
    if (error) {
      return {
        label: 'Try again',
        onClick: handleOnAuthClick,
        polyState: POLY_STATES.ERROR,
      };
    } else if (loading) {
      return { polyState: POLY_STATES.LOADING };
    } else if (isAuthenticated) {
      return {
        label: `Hello, ${userName}`,
        polyState: POLY_STATES.SUCCESS,
      };
    }
    return {
      label: defaultLabel,
      onClick: handleOnAuthClick,
    };
  };

  return <PolyButton {...currentStateData()} />;
};

export default AuthPolyButton;
