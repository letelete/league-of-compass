const Yup = require('yup');
const { roundToNDecimalPlaces } = require('../../../helpers/math');

require('../../../helpers/yup/round_to_n_decimals');

const attrs = ['excitement', 'difficulty'];

const maxAllowedDecimalPlaces = 5;

const paths = {
  global: {
    region: 'global',
    tier: 'global',
  },
};

const schema = Yup.number().required().integer().min(-100).max(100);

const getAttrsAsSchema = (attrSchema = schema) => {
  const attrsObj = attrs.reduce(
    (obj, attr) => ({ ...obj, [attr]: attrSchema }),
    {}
  );
  return Yup.object().noUnknown().shape(attrsObj);
};

const calculateScore = (ratingsCount, totalRatingValue) => {
  const score = totalRatingValue / ratingsCount;
  return roundToNDecimalPlaces(score, maxAllowedDecimalPlaces);
};

module.exports = {
  attrs,
  maxAllowedDecimalPlaces,
  paths,
  schema,
  getAttrsAsSchema,
  calculateScore,
};
