import * as selectors from './selectors';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registeredActions: {},
};

const slice = createSlice({
  name: 'loadings',
  initialState,
  reducers: {
    loadingAdded: (state, { payload: { actionType } }) => {
      state.registeredActions[actionType] = true;
    },
    loadingRemoved: (state, { payload: { actionType } }) => {
      delete state.registeredActions[actionType];
    },
  },
});

export { selectors };

export const actions = {
  ...slice.actions,
};

export default slice.reducer;
