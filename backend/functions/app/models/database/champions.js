const database = require('../../configs/firebase');

const setChampions = async (champions) => {
  const ref = (championId) => database.collection('champions').doc(championId);
  const batch = database.batch();
  champions.forEach((champion) => {
    batch.set(ref(champion.id), champion, { merge: true });
  });
  return await batch.commit();
};

const normalizeForResponse = (champion) => ({
  id: champion.id,
  name: champion.name,
  title: champion.title,
  image: champion.image,
  difficulty: champion.difficulty,
  role: {
    main: champion.role.main,
    all: Object.keys(champion.role.all),
  },
});

module.exports = { setChampions, normalizeForResponse };
