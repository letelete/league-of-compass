import apiMiddleware from './middlewares/api';
import { getDefaultMiddleware } from '@reduxjs/toolkit';

export default [
  ...getDefaultMiddleware(), // This comment forces prettier to newline every new array element
  apiMiddleware,
];
