const League = require('../../models/lol_api/league');
const Regions = require('../../models/lol_api/regions');
const RatingAttrs = require('../../models/database/rating/rating_attrs');
const API = require('../../configs/api');

const getAllRegions = async (req, res) => {
  const inGameRegions = Object.values(Regions.data);
  const globalRegion = {
    id: RatingAttrs.paths.global.region,
    name: 'All regions',
    abbrv: 'All',
    image: `${API.URL}/assets/game/regions/global.png`,
  };
  const regions = [
    globalRegion,
    ...inGameRegions.sort((a, b) => (a.abbrv < b.abbrv ? -1 : 1)),
  ];
  return res.status(200).send(regions);
};

const getAllTiers = async (req, res) => {
  const inGameTiers = Object.values(League.tiers);
  const globalTier = {
    id: RatingAttrs.paths.global.tier,
    name: 'All',
    image: `${API.URL}/assets/game/tiers/global.png`,
  };
  const tiers = [
    globalTier,
    ...inGameTiers
      .map((tier) => {
        const { weight, ...rest } = tier;
        return rest;
      })
      .sort((a, b) => (a.weight < b.weight ? -1 : 1)),
  ];
  return res.status(200).send(tiers);
};

module.exports = {
  getAllRegions,
  getAllTiers,
};
