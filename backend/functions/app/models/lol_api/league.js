const API = require('../../configs/api');

const tiers = {
  iron: {
    id: 'iron',
    name: 'Iron',
    image: `${API.URL}/assets/game/tiers/iron.png`,
  },
  bronze: {
    id: 'bronze',
    name: 'Bronze',
    image: `${API.URL}/assets/game/tiers/bronze.png`,
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    image: `${API.URL}/assets/game/tiers/silver.png`,
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    image: `${API.URL}/assets/game/tiers/gold.png`,
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum',
    image: `${API.URL}/assets/game/tiers/platinum.png`,
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    image: `${API.URL}/assets/game/tiers/diamond.png`,
  },
  master: {
    id: 'master',
    name: 'Master',
    image: `${API.URL}/assets/game/tiers/master.png`,
  },
  grandmaster: {
    id: 'grandmaster',
    name: 'Grandmaster',
    image: `${API.URL}/assets/game/tiers/grandmaster.png`,
  },
  challenger: {
    id: 'challenger',
    name: 'Challenger',
    image: `${API.URL}/assets/game/tiers/challenger.png`,
  },
};

const rankRange = {
  min: 1,
  max: 4,
};

module.exports = { tiers, rankRange };
