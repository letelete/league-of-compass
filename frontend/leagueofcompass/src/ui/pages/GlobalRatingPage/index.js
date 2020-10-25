import React, { useEffect, useState } from 'react';

import ChampionCompassItem from '../../components/ChampionsCompass/ChampionCompassItem';
import ChampionsCompass from '../../components/ChampionsCompass';
import CircularLabeledLoadingIndicator from '../../components/LoadingIndicators/CircularLabeledLoadingIndicator';
import Compass from '../../components/Compass';
import Page from '../Page';
import champions from './champions';
import { createRef } from 'react';
import usePanZoom from '../../hooks/usePanZoom';

const GlobalRatingPage = () => {
  return (
    <Page className="page--global-rating">
      <ChampionsCompass champions={champions} />
    </Page>
  );
};

export default GlobalRatingPage;
