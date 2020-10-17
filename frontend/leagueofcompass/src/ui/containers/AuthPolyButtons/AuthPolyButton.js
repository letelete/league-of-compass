import POLY_STATES from '../../components/PolyButton/poly_states';
import PolyButton from '../../components/PolyButton';
import React from 'react';
import { selectors } from '../../../store/ducks/auth';
import { useSelector } from 'react-redux';

const AuthPolyButton = ({ defaultLabel, onAuthClick }) => {
  const authUser = useSelector((state) => state.auth.user);
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
    } else if (authUser) {
      return {
        label: `Hello, ${authUser.personal.name}`,
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
