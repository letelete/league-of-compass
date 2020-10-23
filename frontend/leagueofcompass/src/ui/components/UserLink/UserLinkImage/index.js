import CircularImage from '../../CircularImage';
import { NavLink } from 'react-router-dom';
import PATHS from '../../../../config/paths';
import React from 'react';
import UserLinkContext from '../UserLinkContext';

const UserLinkImage = () => {
  return (
    <UserLinkContext.Consumer>
      {({ image }) => (
        <div className="user-link__image">
          <NavLink exact to={PATHS.MY_PROFILE}>
            <CircularImage src={image} alt={'User image'} />
          </NavLink>
        </div>
      )}
    </UserLinkContext.Consumer>
  );
};

export default UserLinkImage;
