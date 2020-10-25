import React, { useState } from 'react';
import {
  actions as ratingsActions,
  selectors as ratingsSelectors,
} from '../../store/ducks/ratings';
import { useDispatch, useSelector } from 'react-redux';

import CircularLoadingIndicator from '../components/LoadingIndicators/CircularLoadingIndicator';
import EmphasizedText from '../components/PartialEmphasis/EmphasizedText';
import InfoBar from '../components/InfoBar';
import InlineDropdown from '../components/InlineDropdown';
import InlineTextWithImage from '../components/InlineTextWithImage';
import PartialEmphasis from '../components/PartialEmphasis';
import makeInlineDropdownItem from '../components/InlineDropdown/makeInlineDropdownItem';
import { actions as regionsActions } from '../../store/ducks/regions';
import { actions as tiersActions } from '../../store/ducks/tiers';

const GlobalRatingInfoBar = () => {
  const dispatch = useDispatch();

  const { region: selectedRegion, tier: selectedTier } = useSelector(
    (state) => state.ratings.config
  );
  const ratings = useSelector(ratingsSelectors.getAllRatings);
  const votesCount = useSelector(ratingsSelectors.getVotesCount);
  const regions = useSelector((state) => state.regions.all);
  const tiers = useSelector((state) => state.tiers.all);

  const handleRegionChange = (region) => {
    dispatch(ratingsActions.regionChanged({ region }));
  };

  const handleTierChange = (tier) => {
    dispatch(ratingsActions.tierChanged({ tier }));
  };

  useState(() => {
    dispatch(regionsActions.fetchRegions());
    dispatch(tiersActions.fetchTiers());
  }, []);

  return (
    <InfoBar
      style={{
        lineHeight: '1.5',
      }}
    >
      <PartialEmphasis>
        <EmphasizedText text={votesCount} />
        {` vote${votesCount.length !== 1 ? 's' : ''} for `}
        <EmphasizedText text={ratings.length} />
        {` unique champion${votesCount.length !== 1 ? 's' : ''} were submitted`}
      </PartialEmphasis>
      {regions.length && tiers.length ? (
        <PartialEmphasis>
          {'by '}
          <InlineDropdown
            selectedId={selectedRegion}
            onSelected={handleRegionChange}
            items={regions.map((region) =>
              makeInlineDropdownItem({
                id: region.id,
                view: (
                  <InlineTextWithImage
                    label={region.abbrv}
                    src={region.image}
                    alt={region.name}
                  />
                ),
              })
            )}
          />
          {'players with '}
          <InlineDropdown
            selectedId={selectedTier}
            onSelected={handleTierChange}
            items={tiers.map((tier) =>
              makeInlineDropdownItem({
                id: tier.id,
                view: (
                  <InlineTextWithImage
                    label={tier.name}
                    src={tier.image}
                    alt={`${tier.name} tier avatar`}
                  />
                ),
              })
            )}
          />
          {'tiers'}
        </PartialEmphasis>
      ) : (
        <CircularLoadingIndicator />
      )}
    </InfoBar>
  );
};

export default GlobalRatingInfoBar;
