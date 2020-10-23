import './style.css';

import React from 'react';

const AppGrid = ({ navigation, content }) => {
  return (
    <div className="app__grid">
      <section className="app__navigation">{navigation}</section>
      <section className="app__content">{content}</section>
    </div>
  );
};

export default AppGrid;
