const League = require('../../models/lol_api/league');
const Regions = require('../../models/lol_api/regions');

const getAllRegions = async (req, res) => {
  const regions = Object.values(Regions.data);
  return res.status(200).send(regions);
};

const getAllTiers = async (req, res) => {
  const tiers = Object.values(League.tiers);
  return res.status(200).send(tiers);
};

module.exports = {
  getAllRegions,
  getAllTiers,
};
