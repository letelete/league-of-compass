import './style.css';

import React from 'react';
import { firstWord } from '../../../../helpers/strings';
import { useSelector } from 'react-redux';

const UserLink = ({ children }) => {
  const destructUsedProps = (user) =>
    (user && {
      image: user.personal.image,
      firstName: firstWord(user.personal.name),
    }) ||
    {};

  const childrenProps = useSelector((state) =>
    destructUsedProps(state.auth.user)
  );

  return <div className="user-link">{children(childrenProps)}</div>;
};

export default UserLink;
