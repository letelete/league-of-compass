const database = require('../../configs/firebase');

const getData = async (id) => {
  return await database
    .collection('users')
    .doc(id)
    .get()
    .then((doc) => (doc.exists ? doc.data() : null));
};

const setData = async (id, data) => {
  return await database
    .collection('users')
    .doc(id)
    .set(data, { merge: true })
    .then((_) => data);
};

const create = ({ id, name, image, email }) => ({
  personal: {
    id,
    name,
    image,
    email,
  },
  rating: {
    votes: {},
  },
  game: {
    region: null,
    summoner: {
      name: null,
      division: null,
    },
  },
});

module.exports = { create, getData, setData };
