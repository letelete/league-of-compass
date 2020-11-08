const API = require('../../configs/api');

const tiers = {
  iron: {
    id: 'iron',
    name: 'Iron',
    image: `${API.URL}/assets/game/tiers/iron.png`,
    weight: 0,
  },
  bronze: {
    id: 'bronze',
    name: 'Bronze',
    image: `${API.URL}/assets/game/tiers/bronze.png`,
    weight: 1,
  },
  silver: {
    id: 'silver',
    name: 'Silver',
    image: `${API.URL}/assets/game/tiers/silver.png`,
    weight: 2,
  },
  gold: {
    id: 'gold',
    name: 'Gold',
    image: `${API.URL}/assets/game/tiers/gold.png`,
    weight: 3,
  },
  platinum: {
    id: 'platinum',
    name: 'Platinum',
    image: `${API.URL}/assets/game/tiers/platinum.png`,
    weight: 4,
  },
  diamond: {
    id: 'diamond',
    name: 'Diamond',
    image: `${API.URL}/assets/game/tiers/diamond.png`,
    weight: 5,
  },
  master: {
    id: 'master',
    name: 'Master',
    image: `${API.URL}/assets/game/tiers/master.png`,
    weight: 6,
  },
  grandmaster: {
    id: 'grandmaster',
    name: 'Grandmaster',
    image: `${API.URL}/assets/game/tiers/grandmaster.png`,
    weight: 7,
  },
  challenger: {
    id: 'challenger',
    name: 'Challenger',
    image: `${API.URL}/assets/game/tiers/challenger.png`,
    weight: 8,
  },
};

const rankRange = {
  min: 1,
  max: 4,
};

module.exports = { tiers, rankRange };
