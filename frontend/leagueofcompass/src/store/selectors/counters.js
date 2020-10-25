import { createSelector } from '@reduxjs/toolkit';
import { selectors as errorSelectors } from '../ducks/errors';
import { selectors as loadingSelectors } from '../ducks/loadings';

const getCountersForActionType = (actionType) => {
  return createSelector(
    errorSelectors.hasErrorForAction(actionType),
    loadingSelectors.hasLoadingForAction(actionType),
    (error, loading) => ({
      error,
      loading,
    })
  );
};

export default getCountersForActionType;
