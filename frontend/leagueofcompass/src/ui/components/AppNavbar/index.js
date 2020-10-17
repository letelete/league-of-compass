import './style.css';

import {
  GlobalRatingIcon,
  LoginIcon,
  LogoutIcon,
  MyRatingIcon,
  RateChampionsIcon,
} from '../../icons';
import {
  useLargeScreenMediaQuery,
  useMobileMediaQuery,
} from '../../hooks/useMediaQuery';

import HorizontalDivider from '../Dividers/HorizontalDivider';
import NavBar from '../NavBar';
import NavItem from '../NavBar/NavItem';
import PATHS from '../../../config/paths';
import React from 'react';
import UserLink from './UserLink';
import UserLinkImage from './UserLink/UserLinkImage';
import UserLinkLabel from './UserLink/UserLinkLabel';
import { useSelector } from 'react-redux';

const AppNavbar = () => {
  const user = useSelector((state) => state.auth.user);
  const isLargeScreen = useLargeScreenMediaQuery();
  const isMobileScreen = useMobileMediaQuery();

  return (
    <NavBar>
      {!isMobileScreen && (
        <section className="nav__section nav__section--user">
          <UserLink>
            <UserLinkImage src={user && user.personal.image} />
            {isLargeScreen && (
              <UserLinkLabel userName={user && user.personal.name} />
            )}
          </UserLink>
          <HorizontalDivider />
        </section>
      )}
      <section className="nav__section nav__section--main-routes">
        <NavItem
          Icon={<GlobalRatingIcon />}
          label={'Global rating'}
          path={PATHS.GLOBAL_RATING}
        />
        <NavItem
          Icon={<MyRatingIcon />}
          label={'My rating'}
          path={PATHS.MY_RATING}
        />
        <NavItem
          Icon={<RateChampionsIcon />}
          label={'Rate champions'}
          path={PATHS.RATE}
        />
      </section>
      {!isMobileScreen && (
        <section className="nav__section nav__section--bottom">
          {user ? (
            <NavItem
              Icon={<LogoutIcon />}
              label={'Logout'}
              path={PATHS.LOGOUT}
            />
          ) : (
            <NavItem Icon={<LoginIcon />} label={'Login'} path={PATHS.AUTH} />
          )}
        </section>
      )}
    </NavBar>
  );
};

export default AppNavbar;
