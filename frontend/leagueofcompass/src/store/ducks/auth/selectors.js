import { actions } from './index';
import { selectors as errorSelectors } from '../errors';
import { selectors as loadingSelectors } from '../loadings';

export const getAuthenticationCounters = (state) => {
  const actionType = actions.authenticated.type;
  return {
    error: errorSelectors.hasErrorForAction(actionType)(state),
    loading: loadingSelectors.hasLoadingForAction(actionType)(state),
  };
};
