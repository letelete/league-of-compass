import React from 'react';
import TopBar from '../components/TopBar';
import UserLink from '../components/AppNavbar/UserLink';
import UserLinkImage from '../components/AppNavbar/UserLink/UserLinkImage';
import UserLinkLabel from '../components/AppNavbar/UserLink/UserLinkLabel';
import { useSelector } from 'react-redux';

const AppTopBar = () => {
  const user = useSelector((state) => state.auth.user);
  return (
    <TopBar>
      <UserLink>
        <UserLinkLabel userName={user && user.personal.name} />
        <UserLinkImage src={user && user.personal.image} />
      </UserLink>
    </TopBar>
  );
};

export default AppTopBar;
