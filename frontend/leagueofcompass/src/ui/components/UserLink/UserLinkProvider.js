import UserLinkContext, {
  defaultValue as defaultContextValue,
  getFormattedLabel,
} from './UserLinkContext';

import React from 'react';
import { useSelector } from 'react-redux';

const UserLinkProvider = ({ children }) => {
  const userValues = useSelector((state) => {
    const user = state.auth.user;
    return (
      (user && {
        image: user.personal.image,
        label: getFormattedLabel(user.personal.name),
      }) ||
      defaultContextValue
    );
  });

  return (
    <UserLinkContext.Provider value={userValues}>
      {children}
    </UserLinkContext.Provider>
  );
};

export default UserLinkProvider;
