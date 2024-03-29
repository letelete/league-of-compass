import { createAction } from '@reduxjs/toolkit';

export const apiCallBegan = createAction('api/callBegan');

export const apiCallEnded = createAction('api/callEnded');

export const apiCallSucceed = createAction('api/callSucceed');

export const apiCallFailed = createAction('api/callFailed');
