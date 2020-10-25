import API from '../../../config/api';
import allTiersSerializer from '../../../serializers/tiers/all_tiers_serializer';
import { apiCallBegan } from '../../actions/api';
import { createSlice } from '@reduxjs/toolkit';
import getCountersForActionType from '../../selectors/counters';

const initialState = { all: [] };

const slice = createSlice({
  name: 'tiers',
  initialState,
  reducers: {
    fetchedTiers: (state, { payload }) => {
      state.all = allTiersSerializer(payload);
    },
  },
});

const thunks = {
  fetchTiers: () => (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        method: 'GET',
        url: API.ENDPOINTS.TIERS,
        onSucceed: slice.actions.fetchedTiers.type,
      })
    );
  },
};

export const actions = {
  ...thunks,
};

export const selectors = {
  getTiersCounters: getCountersForActionType(slice.actions.fetchedTiers.type),
};

export default slice.reducer;
