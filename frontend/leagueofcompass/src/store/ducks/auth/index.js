import * as selectors from './selectors';

import API from '../../../config/api';
import { apiCallBegan } from '../../actions/api';
import { createSlice } from '@reduxjs/toolkit';
import qs from 'qs';

const initialState = {
  idToken: null,
  user: null,
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    receivedIdToken: (state, { payload: { idToken } }) => {
      state.idToken = idToken;
    },
    authenticated: (state, { payload }) => {
      state.user = payload;
    },
    loggedOut: (state) => {
      state.idToken = null;
      state.user = null;
    },
  },
});

const thunks = {
  authenticate: (idToken) => (dispatch, getState) => {
    dispatch(slice.actions.receivedIdToken({ idToken }));
    dispatch(
      apiCallBegan({
        url: API.ENDPOINTS.AUTH.GOOGLE,
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        data: qs.stringify({ id_token: idToken }),
        onSucceed: slice.actions.authenticated.type,
        onFailed: slice.actions.loggedOut.type,
      })
    );
  },
};

export { selectors };

export const actions = {
  ...slice.actions,
  ...thunks,
};

export default slice.reducer;
