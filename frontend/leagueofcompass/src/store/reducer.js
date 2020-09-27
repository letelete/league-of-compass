import authReducer from './ducks/auth';
import { combineReducers } from 'redux';
import errorsReducer from './ducks/errors';
import loadingsReducer from './ducks/loadings';

export default combineReducers({
  auth: authReducer,
  errors: errorsReducer,
  loadings: loadingsReducer,
});
