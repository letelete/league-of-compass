const { createSelector } = require('@reduxjs/toolkit');

export const hasErrorForAction = (actionType) =>
  createSelector(
    (state) => state.errors,
    (errors) => errors.registeredActions[actionType]
  );
