const { Database } = require('../../configs/firebase');

const doc = () => {
  const getData = async () => ref.get().then((doc) => doc.data());

  const ref = Database.collection('lol').doc('data');

  return Object.freeze({ getData });
};

module.exports = {
  doc,
};
