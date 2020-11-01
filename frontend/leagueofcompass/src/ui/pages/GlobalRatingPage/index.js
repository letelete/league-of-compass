import React, { useEffect } from 'react';
import {
  actions,
  selectors as ratingsSelectors,
} from '../../../store/ducks/ratings';
import { useDispatch, useSelector } from 'react-redux';

import ChampionsCompass from '../../components/ChampionsCompass';
import CircularLabeledLoadingIndicator from '../../components/LoadingIndicators/CircularLabeledLoadingIndicator';
import CircularLoadingIndicator from '../../components/LoadingIndicators/CircularLoadingIndicator';
import Page from '../Page';

const { getAllRatings, getAllRatingsCounters } = ratingsSelectors;

const GlobalRatingPage = () => {
  const dispatch = useDispatch();

  const ratings = useSelector(getAllRatings);
  const allRatingsCounters = useSelector(getAllRatingsCounters);

  useEffect(() => {
    if (!ratings.length) {
      dispatch(actions.fetchAllRatings());
    }
  }, []);

  return (
    <Page className="page--global-rating">
      <ChampionsCompass ratings={ratings} />
    </Page>
  );
};

export default GlobalRatingPage;
