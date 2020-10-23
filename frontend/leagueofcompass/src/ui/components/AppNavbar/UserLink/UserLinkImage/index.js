import CircularImage from '../../../CircularImage';
import { NavLink } from 'react-router-dom';
import PATHS from '../../../../../config/paths';
import React from 'react';
import srcPlaceholder from '../../../../../assets/images/placeholders/user_image.jpg';

const UserLinkImage = ({ src }) => {
  return (
    <div className="user-link__image">
      <NavLink
        exact
        to={PATHS.MY_PROFILE}
        style={{
          background: 'blue',
          borderRadius: 'inherit',
        }}
      >
        <CircularImage
          src={src || srcPlaceholder}
          alt={'User image' + (!src ? ' placeholder' : '')}
        />
      </NavLink>
    </div>
  );
};

export default UserLinkImage;
