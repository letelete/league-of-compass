import { configureStore } from '@reduxjs/toolkit';
import middleware from './middleware';
import reducer from './reducer';

export default configureStore({
  reducer,
  middleware,
});
