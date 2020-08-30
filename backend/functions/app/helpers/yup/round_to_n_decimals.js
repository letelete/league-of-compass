const Yup = require('yup');
const { roundToNDecimalPlaces } = require('../math');

Yup.addMethod(Yup.number, 'roundToNDecimals', function (N) {
  return this.transform((value, original) => roundToNDecimalPlaces(value, N));
});
