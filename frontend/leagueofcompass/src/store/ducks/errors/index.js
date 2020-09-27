import * as selectors from './selectors';

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registeredActions: {},
};

const slice = createSlice({
  name: 'errors',
  initialState,
  reducers: {
    errorsAdded: (
      state,
      { payload: { actionType, title, message, statusCode } }
    ) => {
      state.registeredActions[actionType] = { title, message, statusCode };
    },
    errorsRemoved: (state, { payload: { actionType } }) => {
      delete state.registeredActions[actionType];
    },
  },
});

export { selectors };

export const actions = {
  ...slice.actions,
};

export default slice.reducer;
