import React from 'react';
import TopBar from '../TopBar';
import UserLink from '../AppNavbar/UserLink';
import UserLinkImage from '../AppNavbar/UserLink/UserLinkImage';
import UserLinkLabel from '../AppNavbar/UserLink/UserLinkLabel';

const AppTopBar = () => {
  return (
    <TopBar>
      <UserLink>
        {({ image, firstName }) => (
          <>
            <UserLinkLabel label={firstName} />
            <UserLinkImage src={image} />
          </>
        )}
      </UserLink>
    </TopBar>
  );
};

export default AppTopBar;
