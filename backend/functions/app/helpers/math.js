exports.roundToNDecimalPlaces = (num, N) => {
  const savePlaces = Math.pow(10, N);
  return Math.round((num + Number.EPSILON) * savePlaces) / savePlaces;
};
