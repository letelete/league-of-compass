import React, { useEffect } from 'react';
import {
  actions as ratingsActions,
  selectors as ratingsSelectors,
} from '../../store/ducks/ratings';
import { useDispatch, useSelector } from 'react-redux';

import CircularImage from '../components/CircularImage';
import CircularLabeledLoadingIndicator from '../components/LoadingIndicators/CircularLabeledLoadingIndicator';
import CircularLoadingIndicator from '../components/LoadingIndicators/CircularLoadingIndicator';
import EmphasizedText from '../components/PartialEmphasis/EmphasizedText';
import InfoBar from '../components/InfoBar';
import InlineDropdown from '../components/InlineDropdown';
import InlineTextWithImage from '../components/InlineTextWithImage';
import PartialEmphasis from '../components/PartialEmphasis';
import makeInlineDropdownItem from '../components/InlineDropdown/makeInlineDropdownItem';
import { useState } from 'react';

const {
  getAllRatings,
  getAllRatingsCounters,
  getVotesCount,
} = ratingsSelectors;

// TODO: remove hardcoded data
const tiers = [
  {
    region: 'Iron',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/9/95/Season_2019_-_Iron_3.png/revision/latest/scale-to-width-down/130?cb=20181229234927',
  },
  {
    region: 'Bronze',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/f/f4/Season_2019_-_Bronze_1.png/revision/latest/scale-to-width-down/130?cb=20181229234910',
  },
  {
    region: 'Silver',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/7/70/Season_2019_-_Silver_1.png/revision/latest/scale-to-width-down/130?cb=20181229234936',
  },
  {
    region: 'Gold',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/9/96/Season_2019_-_Gold_1.png/revision/latest/scale-to-width-down/130?cb=20181229234920',
  },
  {
    region: 'Platinum',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/7/74/Season_2019_-_Platinum_1.png/revision/latest/scale-to-width-down/130?cb=20181229234932',
  },
  {
    region: 'Diamond',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/9/91/Season_2019_-_Diamond_1.png/revision/latest/scale-to-width-down/130?cb=20181229234917',
  },
  {
    region: 'Master',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/1/11/Season_2019_-_Master_1.png/revision/latest/scale-to-width-down/130?cb=20181229234929',
  },
  {
    region: 'Grandmaster',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/7/76/Season_2019_-_Grandmaster_1.png/revision/latest/scale-to-width-down/130?cb=20181229234923',
  },
  {
    region: 'Challenger',
    image:
      'https://static.wikia.nocookie.net/leagueoflegends/images/5/5f/Season_2019_-_Challenger_1.png/revision/latest/scale-to-width-down/130?cb=20181229234913',
  },
];
const regions = [
  {
    region: 'BR',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'EUNE',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'EUW',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'LAN',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'LAS',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'NA',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'OCE',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'RU',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'TR',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'JP',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
  {
    region: 'KR',
    image:
      'https://www.unrankedsmurfs.com/storage/blogposts/lol-servers/EUW.jpg',
  },
];

const GlobalRatingInfoBar = () => {
  const dispatch = useDispatch();

  const { region: selectedRegion, tier: selectedTier } = useSelector(
    (state) => state.ratings.config
  );
  const ratings = useSelector(getAllRatings);
  const votesCount = useSelector(getVotesCount);

  const handleRegionChange = (region) => {
    dispatch(ratingsActions.regionChanged({ region }));
  };

  const handleTierChange = (tier) => {
    dispatch(ratingsActions.tierChanged({ tier }));
  };

  return (
    <InfoBar>
      <PartialEmphasis>
        {votesCount ? (
          <>
            <EmphasizedText text={votesCount} />
            {` vote${votesCount.length !== 1 ? 's' : ''} for `}
            <EmphasizedText text={ratings.length} />
            {` unique champion${
              votesCount.length !== 1 ? 's' : ''
            } were submitted`}
          </>
        ) : (
          'No votes were submitted yet'
        )}
      </PartialEmphasis>
      <PartialEmphasis>
        {'by '}
        <InlineDropdown
          selectedId={selectedRegion}
          onSelected={handleRegionChange}
          items={regions.map((region) =>
            makeInlineDropdownItem({
              id: region.region,
              view: (
                <InlineTextWithImage
                  label={region.region}
                  src={region.image}
                  alt={'Region image'}
                />
              ),
            })
          )}
        />
        {'players with'}
        <InlineDropdown
          selectedId={selectedTier}
          onSelected={handleTierChange}
          items={tiers.map((region) =>
            makeInlineDropdownItem({
              id: region.region,
              view: (
                <InlineTextWithImage
                  label={region.region}
                  src={region.image}
                  alt={'Tier image'}
                />
              ),
            })
          )}
        />
        {'tiers'}
      </PartialEmphasis>
    </InfoBar>
  );
};

export default GlobalRatingInfoBar;
