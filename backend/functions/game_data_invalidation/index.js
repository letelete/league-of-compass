const LolApi = require('../app/models/lol_api/champions');
const { Database } = require('../app/configs/firebase');

const invalidateGameData = async (change, context) => {
  const before = change.before.data();
  const after = change.after.data();
  let promises = [];

  if (before.version === after.version) {
    console.log('Aborting an update, because the game version did not change');
    return null;
  }

  const champions = await LolApi.getChampions();
  return await setChampions(champions);
};

const setChampions = async (champions) => {
  const ref = (championId) => Database.collection('champions').doc(championId);
  const batch = Database.batch();
  champions.forEach((champion) => {
    batch.set(ref(champion.id), champion, { merge: true });
  });
  return await batch.commit();
};

module.exports = invalidateGameData;
