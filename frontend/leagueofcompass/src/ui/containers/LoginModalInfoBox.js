import ModalInfoBox from '../components/Modal/ModalInfoBox';
import React from 'react';
import { selectors } from '../../store/ducks/auth';
import useErrorDisplay from '../hooks/useErrorDisplay';
import { useSelector } from 'react-redux';

const LoginModalInfoBox = () => {
  const { error } = useSelector(selectors.getAuthenticationCounters);
  const modalContent = useErrorDisplay(
    error,
    'At this moment, we only support the Google authentication method.'
  );

  return <ModalInfoBox>{modalContent}</ModalInfoBox>;
};

export default LoginModalInfoBox;
