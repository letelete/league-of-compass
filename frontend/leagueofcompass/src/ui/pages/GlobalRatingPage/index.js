import './style.css';

import React, { useEffect } from 'react';
import {
  actions as ratingsActions,
  selectors as ratingsSelectors,
} from '../../../store/ducks/ratings';
import { useDispatch, useSelector } from 'react-redux';

import ChampionsCompass from '../../components/ChampionsCompass';
import GlobalRatingInfoBar from '../../containers/GlobalRatingInfoBar';
import Page from '../Page';

const GlobalRatingPage = () => {
  const dispatch = useDispatch();

  const ratings = useSelector(ratingsSelectors.getAllRatings);
  const { region: selectedRegion, tier: selectedTier } = useSelector(
    (state) => state.ratings.config
  );

  useEffect(() => {
    dispatch(ratingsActions.fetchAllRatings());
  }, [dispatch, selectedRegion, selectedTier]);

  return (
    <Page className="page--global-rating">
      <GlobalRatingInfoBar />
      <ChampionsCompass ratings={ratings} />
    </Page>
  );
};

export default GlobalRatingPage;
