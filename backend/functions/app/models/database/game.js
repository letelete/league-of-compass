const database = require('../../configs/firebase');

const getData = async () => {
  return await database
    .collection('lol')
    .doc('data')
    .get()
    .then(deserializeData);
};

const setData = async ({ version } = {}) => {
  const data = { version };
  return await database
    .collection('lol')
    .doc('data')
    .set(data, { merge: true });
};

const deserializeData = (response) => {
  const { version } = response.data();
  return { version };
};

module.exports = {
  getData,
  setData,
};
