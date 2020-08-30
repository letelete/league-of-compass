const Yup = require('yup');
const Regions = require('../../lol_api/regions');
const RatingAttrs = require('./rating_attrs');
const League = require('../../lol_api/league');

require('../../../helpers/yup/cast_and_validate/sync');

const baseAttrSchema = Yup.string().trim().lowercase().required();

const supportedRegions = [
  RatingAttrs.paths.global.region,
  ...Object.keys(Regions.data),
];

const supportedTiers = [
  RatingAttrs.paths.global.tier,
  ...Object.keys(League.tiers),
];

const attrsSchema = Yup.object().shape({
  region: baseAttrSchema.oneOf(supportedRegions),
  tier: baseAttrSchema.oneOf(supportedTiers),
});

const castAttrs = (data) => attrsSchema.castAndValidateSync(data);

module.exports = { castAttrs };
