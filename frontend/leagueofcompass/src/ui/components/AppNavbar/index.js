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

import AuthBasedComponent from '../../containers/AuthBasedComponent';
import HorizontalDivider from '../Dividers/HorizontalDivider';
import NavBar from '../NavBar';
import NavItem from '../NavBar/NavItem';
import PATHS from '../../../config/paths';
import React from 'react';
import UserLink from './UserLink';
import UserLinkImage from './UserLink/UserLinkImage';
import UserLinkLabel from './UserLink/UserLinkLabel';

const AppNavbar = () => {
  const isLargeScreen = useLargeScreenMediaQuery();
  const isMobileScreen = useMobileMediaQuery();

  return (
    <NavBar>
      {!isMobileScreen && (
        <section className="nav__section nav__section--user">
          <UserLink>
            {({ image, firstName }) => (
              <>
                <UserLinkImage src={image} />
                {isLargeScreen && <UserLinkLabel label={firstName} />}
              </>
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
          <AuthBasedComponent>
            {({ isAuthenticated }) =>
              isAuthenticated ? (
                <NavItem
                  Icon={<LogoutIcon />}
                  label={'Logout'}
                  path={PATHS.LOGOUT}
                />
              ) : (
                <NavItem
                  Icon={<LoginIcon />}
                  label={'Login'}
                  path={PATHS.AUTH}
                />
              )
            }
          </AuthBasedComponent>
        </section>
      )}
    </NavBar>
  );
};

export default AppNavbar;
