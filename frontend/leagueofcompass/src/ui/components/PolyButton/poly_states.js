const POLY_STATES = {
  LOADING: 'poly-button--loading',
  ERROR: 'poly-button--error',
  SUCCESS: 'poly-button--success',
};

export const isPolyState = (polyState) =>
  Object.values(POLY_STATES).includes(polyState);

export default POLY_STATES;
