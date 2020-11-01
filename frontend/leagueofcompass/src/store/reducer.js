import authReducer from './ducks/auth';
import { combineReducers } from 'redux';
import errorsReducer from './ducks/errors';
import loadingsReducer from './ducks/loadings';
import ratingsReducer from './ducks/ratings';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  loadings: loadingsReducer,
  ratings: ratingsReducer,
});
