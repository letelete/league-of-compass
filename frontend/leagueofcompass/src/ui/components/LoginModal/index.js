import './style.css';

import GoogleAuthPolyButton from '../../containers/AuthPolyButtons/GoogleAuthPolyButton';
import LoginModalInfoBox from '../../containers/LoginModalInfoBox';
import Modal from '../Modal';
import ModalActions from '../Modal/ModalActions';
import ModalTitle from '../Modal/ModalTitle';
import React from 'react';

const LoginModal = () => {
  return (
    <Modal className="modal--login">
      <ModalTitle title={'Login required'} />
      <LoginModalInfoBox />
      <ModalActions>
        <GoogleAuthPolyButton />
      </ModalActions>
    </Modal>
  );
};

export default LoginModal;
