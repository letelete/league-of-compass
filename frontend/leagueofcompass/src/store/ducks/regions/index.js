import API from '../../../config/api';
import allRegionsSerializer from '../../../serializers/regions/all_regions_serializer';
import { apiCallBegan } from '../../actions/api';
import { createSlice } from '@reduxjs/toolkit';
import getCountersForActionType from '../../selectors/counters';

const initialState = { all: [] };

const slice = createSlice({
  name: 'regions',
  initialState,
  reducers: {
    fetchedRegions: (state, { payload }) => {
      state.all = allRegionsSerializer(payload);
    },
  },
});

const thunks = {
  fetchRegions: () => (dispatch, getState) => {
    dispatch(
      apiCallBegan({
        method: 'GET',
        url: API.ENDPOINTS.REGIONS,
        onSucceed: slice.actions.fetchedRegions.type,
      })
    );
  },
};

export const actions = {
  ...thunks,
};

export const selectors = {
  getRegionsCounters: getCountersForActionType(
    slice.actions.fetchedRegions.type
  ),
};

export default slice.reducer;
