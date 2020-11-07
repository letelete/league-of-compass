import './style.css';

import React, { useEffect } from 'react';
import {
  actions,
  selectors as ratingsSelectors,
} from '../../../store/ducks/ratings';
import { useDispatch, useSelector } from 'react-redux';

import ChampionsCompass from '../../components/ChampionsCompass';
import CircularImage from '../../components/CircularImage';
import CircularLabeledLoadingIndicator from '../../components/LoadingIndicators/CircularLabeledLoadingIndicator';
import CircularLoadingIndicator from '../../components/LoadingIndicators/CircularLoadingIndicator';
import EmphasizedText from '../../components/PartialEmphasis/EmphasizedText';
import GlobalRatingInfoBar from '../../containers/GlobalRatingInfoBar';
import InfoBar from '../../components/InfoBar';
import InlineDropdown from '../../components/InlineDropdown';
import Page from '../Page';
import PartialEmphasis from '../../components/PartialEmphasis';
import makeInlineDropdownItem from '../../components/InlineDropdown/makeInlineDropdownItem';
import { useState } from 'react';

const {
  getAllRatings,
  getAllRatingsCounters,
  getVotesCount,
} = ratingsSelectors;

const GlobalRatingPage = () => {
  const dispatch = useDispatch();

  const ratings = useSelector(getAllRatings);

  useEffect(() => {
    if (!ratings.length) {
      dispatch(actions.fetchAllRatings());
    }
  }, []);

  return (
    <Page className="page--global-rating">
      <GlobalRatingInfoBar />
      <ChampionsCompass ratings={ratings} />
    </Page>
  );
};

export default GlobalRatingPage;
