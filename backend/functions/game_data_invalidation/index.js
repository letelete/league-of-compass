const game = require('../app/models/database/game');
const { getChampions } = require('../app/models/lol_api/champions');
const { setChampions } = require('../app/models/database/champions');

const invalidateGameData = async (change, context) => {
  const before = change.before.data();
  const after = change.after.data();
  let promises = [];

  if (before.version === after.version) {
    console.log('Aborting an update, because the game version did not change');
    return null;
  }

  return Promise.all([
    game.setData({ version: after.version }),
    getChampions().then(setChampions),
  ]);
};

module.exports = invalidateGameData;
