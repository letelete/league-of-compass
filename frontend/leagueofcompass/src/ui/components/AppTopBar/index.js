import React from 'react';
import TopBar from '../TopBar';
import UserLink from '../UserLink';
import UserLinkImage from '../UserLink/UserLinkImage';
import UserLinkLabel from '../UserLink/UserLinkLabel';
import UserLinkProvider from '../UserLink/UserLinkProvider';

const AppTopBar = () => {
  return (
    <TopBar>
      <UserLinkProvider>
        <UserLink>
          <UserLinkLabel />
          <UserLinkImage />
        </UserLink>
      </UserLinkProvider>
    </TopBar>
  );
};

export default AppTopBar;
