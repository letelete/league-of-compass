const Database = require('../../configs/firebase');
const Vote = require('./Vote');
const Regions = require('../lol_api/regions');
const League = require('../lol_api/league');
const Yup = require('yup');
const { BadRequestError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');

const {
  attachWhenNotEmpty,
} = require('../../helpers/Yup/attach_obj_when_not_empty');

const schema = Yup.object().shape({
  personal: attachWhenNotEmpty({
    id: Yup.string().trim(),
    name: Yup.string().trim(),
    image: Yup.string().url().trim(),
    email: Yup.string().email().trim(),
  }),
  game: attachWhenNotEmpty({
    region: Yup.string()
      .nullable()
      .uppercase()
      .trim()
      .test('Region exists', "Unknown user's game region", (region) =>
        region ? Regions.data.hasOwnProperty(region) : true
      ),
  }),
  summoner: attachWhenNotEmpty({
    accountId: Yup.string().nullable().trim(),
    puuid: Yup.string().nullable().trim(),
    name: Yup.string().nullable().trim().min(3).max(16),
    profileIconId: Yup.number().nullable(),
    league: attachWhenNotEmpty({
      tier: Yup.string()
        .nullable()
        .uppercase()
        .trim()
        .test('Tier exists', "Unknown user's league tier", (tier) =>
          tier ? League.tiers.hasOwnProperty(tier) : true
        ),
      rank: Yup.number().nullable().min(1).max(4),
    }),
  }),
});

const cast = (data) => {
  let validated;
  try {
    validated = schema.validateSync(data, { abortEarly: false });
  } catch (err) {
    throw new BadRequestError(err.errors);
  }
  return validated;
};

const doc = (id) => {
  const getData = async () => {
    return await Database.doc(userPath())
      .get()
      .then((doc) => (doc.exists ? doc.data() : null));
  };

  const setData = async (data) => {
    const user = cast(data);
    await Database.doc(userPath()).set(user, { merge: true });
    return user;
  };

  const getVotes = async () => {
    const deserialize = (snapshot) => {
      const docs = snapshot.docs;
      return docs.map((doc) => doc.data());
    };
    return await Database.collection(votesPath()).get().then(deserialize);
  };

  const setVote = async (data) => {
    const vote = Vote.cast(data);
    const path = `${votesPath()}/${vote.championId}`;
    await Database.doc(path).set(vote, { merge: true });
    return vote;
  };

  const getChampionVote = async (championId) => {
    const path = `${votesPath()}/${championId}`;
    return await Database.doc(path)
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

module.exports = { doc, cast };
