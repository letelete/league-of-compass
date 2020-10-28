import ChampionsCompass from '../../components/ChampionsCompass';
import Page from '../Page';
import React from 'react';
import champions from './champions';

const GlobalRatingPage = () => {
  const sortedChampions = champions.sort((a, b) => {
    const distanceFromCenter = ({ x, y }) => {
      const centerPercentage = 50;
      return Math.hypot(x - centerPercentage, y - centerPercentage);
    };
    return distanceFromCenter(a) < distanceFromCenter(b) ? -1 : 1;
  });

  return (
    <Page className="page--global-rating">
      <ChampionsCompass champions={sortedChampions} />
    </Page>
  );
};

export default GlobalRatingPage;
