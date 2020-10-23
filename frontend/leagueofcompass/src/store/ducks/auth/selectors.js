import { actions } from './index';
import { createSelector } from '@reduxjs/toolkit';
import { selectors as errorSelectors } from '../errors';
import { selectors as loadingSelectors } from '../loadings';

export const getAuthenticationCounters = createSelector(
  errorSelectors.hasErrorForAction(actions.authenticated.type),
  loadingSelectors.hasLoadingForAction(actions.authenticated.type),
  (error, loading) => ({ error, loading })
);

export const isUserAuthenticated = createSelector(
  (state) => state.auth.user,
  (user) => user !== null
);
