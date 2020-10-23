import React from 'react';

const UserLinkLabel = ({ label }) => {
  return <p className="user-link__label">{`Hi, ${label || 'Anon'}!`}</p>;
};

export default UserLinkLabel;
