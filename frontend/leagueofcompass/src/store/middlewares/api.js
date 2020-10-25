import * as apiActions from '../actions/api';

import apiConfig from '../../config/api';
import axios from 'axios';
import { actions as errorActions } from '../ducks/errors';
import { actions as loadingActions } from '../ducks/loadings';

const createErrorBlockFromError = (error) => {
  let title = 'Unable to perform a HTTP call to LoC API';
  let message = error.message;
  let statusCode = null;

  if (error.response) {
    const {
      status,
      statusText,
      data: { errors },
    } = error.response;
    title = statusText;
    statusCode = status;
    message = errors
      .map((err) => err.message)
      .reduce((msg, errMsg) => `${msg}\n${errMsg}`);
  } else if (error.request) {
    title = 'Setting up the LoC API request triggered an Error';
  }

  return Object.freeze({
    title,
    message,
    statusCode,
  });
};

/**
 * A middleware that communicates with the backend API and handles loading & error counters for given action.
 *
 * Is called by dispatching the {@link apiActions.apiCallBegan} action, which takes as a payload all arguments
 * required to customize the API call.
 *
 * @param {string} onSucceed A required action type that is dispatched after successful API transaction. Its type name is mandatory to identify a certain action across the app.
 * @param {string} [onFailed=null] An optional action type that is dispatched after unsuccessful API transaction.
 */
const apiMiddleware = ({ dispatch, getState }) => (next) => async (action) => {
  if (action.type !== apiActions.apiCallBegan.type) return next(action);

  const { data, headers, method, url, onSucceed, onFailed } = action.payload;
  const actionType = onSucceed;

  if (!onSucceed) {
    throw new Error('onSucceed in the API middleware cannot be undefined');
  }

  next(action);

  dispatch(errorActions.errorsRemoved({ actionType }));
  dispatch(loadingActions.loadingAdded({ actionType }));

  axios({
    baseURL: apiConfig.BASE_URL,
    data,
    headers,
    method,
    url,
  })
    .then((response) => {
      dispatch(apiActions.apiCallSucceed());
      dispatch({ type: onSucceed, payload: response.data });
    })
    .catch((error) => {
      const errorBlock = createErrorBlockFromError(error);
      dispatch(apiActions.apiCallFailed());
      dispatch(errorActions.errorsAdded({ actionType, ...errorBlock }));
      if (onFailed) dispatch({ type: onFailed, payload: errorBlock });
    })
    .finally(() => {
      dispatch(apiActions.apiCallEnded());
      dispatch(loadingActions.loadingRemoved({ actionType }));
    });
};

export default apiMiddleware;
