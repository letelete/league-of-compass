import authReducer from './ducks/auth';
import { combineReducers } from 'redux';
import errorsReducer from './ducks/errors';
import loadingsReducer from './ducks/loadings';
import ratingsReducer from './ducks/ratings';
import regionsReducer from './ducks/regions';
import tiersReducer from './ducks/tiers';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  loadings: loadingsReducer,
  ratings: ratingsReducer,
  regions: regionsReducer,
  tiers: tiersReducer,
});
