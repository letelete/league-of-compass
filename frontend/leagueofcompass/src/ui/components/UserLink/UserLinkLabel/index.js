import React from 'react';
import UserLinkContext from '../UserLinkContext';

const UserLinkLabel = () => {
  return (
    <UserLinkContext.Consumer>
      {({ label }) => <p className="user-link__label">{label}</p>}
    </UserLinkContext.Consumer>
  );
};

export default UserLinkLabel;
