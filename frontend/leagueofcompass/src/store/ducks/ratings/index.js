import { createSelector, createSlice } from '@reduxjs/toolkit';

import API from '../../../config/api';
import allRatingsSerializer from '../../../serializers/ratings/all_ratings_serializer';
import { apiCallBegan } from '../../actions/api';
import getCountersForActionType from '../../selectors/counters';
import { sortInsideOutByPercentage } from '../../../helpers/sort';

const initialState = {
  all: {},
  fetchedAt: null,
  config: {
    region: 'global',
    tier: 'global',
  },
};

const slice = createSlice({
  name: 'ratings',
  initialState,
  reducers: {
    fetchedAllRatings: (state, { payload }) => {
      const fetchDate = new Date().toISOString();
      state.fetchedAt = fetchDate;
      state.all = Object.entries(allRatingsSerializer(payload)).reduce(
        (obj, [key, value]) => ({
          ...obj,
          [key]: {
            ...value,
            fetchedAt: fetchDate,
          },
        }),
        {}
      );
    },
  },
});

const thunks = {
  fetchAllRatings: () => (dispatch, getState) => {
    const { region, tier } = getState().ratings.config;
    dispatch(
      apiCallBegan({
        url: `${API.ENDPOINTS.RATINGS.ALL}?region=${region}&tier=${tier}`,
        method: 'GET',
        onSucceed: slice.actions.fetchedAllRatings.type,
      })
    );
  },
};

export const selectors = {
  getAllRatingsCounters: getCountersForActionType(
    slice.actions.fetchedAllRatings.type
  ),
  getAllRatings: createSelector(
    (state) => state.ratings.all,
    (ratings) =>
      sortInsideOutByPercentage({
        data: Object.values(ratings),
        getX: (entry) => entry.rating.ratings.excitement,
        getY: (entry) => entry.rating.ratings.difficulty,
      })
  ),
};

export const actions = {
  ...slice.actions,
  ...thunks,
};

export default slice.reducer;
