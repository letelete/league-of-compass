const database = require('../../configs/firebase');
const Vote = require('./Vote');
const Regions = require('../lol_api/regions');
const League = require('../lol_api/league');
const { BadRequestError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');
const yup = require('yup');
const filterObject = require('../../helpers/object');

const {
  attachWhenNotEmpty,
} = require('../../helpers/yup/attach_obj_when_not_empty');

const schema = yup.object().shape({
  personal: attachWhenNotEmpty({
    id: yup.string().trim(),
    name: yup.string().trim(),
    image: yup.string().url().trim(),
    email: yup.string().email().trim(),
  }),
  game: attachWhenNotEmpty({
    region: yup
      .string()
      .nullable()
      .uppercase()
      .trim()
      .test('Region exists', "Unknown user's game region", (region) =>
        region ? Regions.data.hasOwnProperty(region) : true
      ),
  }),
  summoner: attachWhenNotEmpty({
    accountId: yup.string().nullable().trim(),
    puuid: yup.string().nullable().trim(),
    name: yup.string().nullable().trim().min(3).max(16),
    profileIconId: yup.number().nullable(),
    league: attachWhenNotEmpty({
      tier: yup
        .string()
        .nullable()
        .uppercase()
        .trim()
        .test('Tier exists', "Unknown user's league tier", (tier) =>
          tier ? League.tiers.hasOwnProperty(tier) : true
        ),
      rank: yup.number().nullable().min(1).max(4),
    }),
  }),
});

const validate = (data) => {
  let validated;
  try {
    validated = schema.validateSync(data, { abortEarly: false });
  } catch (err) {
    throw new BadRequestError(err.errors);
  }
  return validated;
};

const create = validate;

const doc = (id) => {
  const getData = async () => {
    return await database
      .doc(userPath())
      .get()
      .then((doc) => (doc.exists ? doc.data() : null));
  };

  const setData = async (data) => {
    const user = validate(data);
    await database.doc(userPath()).set(user, { merge: true });
    return user;
  };

  const getVotes = async () => {
    const deserialize = (snapshot) => {
      const docs = snapshot.docs;
      return docs.map((doc) => doc.data());
    };
    return await database.collection(votesPath()).get().then(deserialize);
  };

  const setVote = async (data) => {
    const vote = Vote.validate(data);
    const path = `${votesPath()}/${vote.championId}`;
    await database.doc(path).set(vote, { merge: true });
    return vote;
  };

  const getChampionVote = async (championId) => {
    const path = `${votesPath()}/${championId}`;
    return await database
      .doc(path)
      .get()
      .then((doc) => (doc.exists ? doc.data() : null));
  };

  const userPath = () => `users/${id}`;

  const votesPath = () => `users/${id}/votes`;

  return Object.freeze({
    getData,
    setData,
    getVotes,
    setVote,
    getChampionVote,
  });
};

module.exports = { doc, create, validate };
