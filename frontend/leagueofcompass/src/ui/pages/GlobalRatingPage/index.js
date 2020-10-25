import ChampionsCompass from '../../components/ChampionsCompass';
import Page from '../Page';
import React from 'react';
import champions from './champions';

const GlobalRatingPage = () => {
  return (
    <Page className="page--global-rating">
      <ChampionsCompass champions={champions} />
    </Page>
  );
};

export default GlobalRatingPage;
