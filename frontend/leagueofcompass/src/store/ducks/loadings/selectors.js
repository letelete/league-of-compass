const { createSelector } = require('@reduxjs/toolkit');

export const hasLoadingForAction = (actionType) =>
  createSelector(
    (state) => state.loadings,
    (loadings) => loadings.registeredActions[actionType]
  );
