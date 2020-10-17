import React from 'react';
import { firstWord } from '../../../../../helpers/strings';

const UserLinkLabel = ({ userName }) => {
  return (
    <p className="user-link__label">{`Hi, ${
      userName ? firstWord(userName) : 'Anon!'
    }`}</p>
  );
};

export default UserLinkLabel;
