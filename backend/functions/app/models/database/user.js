const database = require('../../configs/firebase');
const vote = require('./vote');
const regions = require('../lol_api/regions');
const league = require('../lol_api/league');
const { BadRequestError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');

const doc = (id) => {
  const getData = async () => {
    return await database
      .doc(userPath())
      .get()
      .then((doc) => (doc.exists ? doc.data() : null));
  };

  const setData = async (data) => {
    const validated = validate(data);
    const sanitized = sanitize(validated);
    await database.doc(userPath()).set(sanitized, { merge: true });
    return sanitized;
  };

  const getVotes = async () => {
    const deserialize = (snapshot) => {
      const docs = snapshot.docs;
      return docs.map((doc) => doc.data());
    };
    return await database.collection(votesPath()).get().then(deserialize);
  };

  const setVote = async (data) => {
    const validated = vote.validate(data);
    const sanitized = vote.sanitize(validated);
    const path = `${votesPath()}/${sanitized.championId}`;
    await database.doc(path).set(sanitized, { merge: true });
    return sanitized;
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

const create = ({ id, name, image, email }) => {
  const data = {
    personal: {
      id,
      name,
      image,
      email,
    },
    game: {
      region: null,
    },
    summoner: {
      accountId: null,
      puuid: null,
      name: null,
      profileIconId: null,
      league: {
        tier: null,
        rank: null,
      },
    },
  };
  const validated = validate(data);
  const sanitized = sanitize(validated);
  return Object.freeze(sanitized);
};

const validate = (data) => {
  const errors = [];
  const pushError = (msg, details = null) =>
    errors.push(createError(msg, (details && { details }) || {}));

  if (!data) pushError('Expected user data, but got empty object instead');

  const { personal, game, summoner } = data || {};

  const validateEmptiness = (data, name) => {
    if (!data) {
      pushError(
        'Empty field',
        `Expected ${name} to have a value, but got an empty object instead`
      );
    }
  };

  const validatePersonal = () => {
    if (!personal) return;

    if (personal.hasOwnProperty('id')) {
      validateEmptiness(personal.id, 'ID');
    }
    if (personal.hasOwnProperty('name')) {
      validateEmptiness(personal.name, 'Name');
    }
    if (personal.hasOwnProperty('image')) {
      validateEmptiness(personal.image, 'Image');
    }
    if (personal.hasOwnProperty('email')) {
      validateEmptiness(personal.email, 'Email');
    }
  };

  const validateGame = () => {
    if (!game) return;

    if (game.region && !regions.data.hasOwnProperty(game.region)) {
      pushError(
        'Invalid game region',
        `Expected one of the following: ${Object.keys(regions.data)}`
      );
    }
  };

  const validateSummoner = () => {
    if (!summoner) return;
    const { league: sLeague, sProfileIconId } = summoner;

    if (sLeague && sLeague.tier && !league.tiers.hasOwnProperty(sLeague.tier)) {
      pushError(
        `Invalid league tier`,
        `Expected one of the following: ${Object.keys(league.tiers)}`
      );
    }
    if (sLeague && sLeague.rank && isNaN(sLeague.rank)) {
      pushError(
        'Invalid type',
        'Expected rank to be a number, but got NaN instead'
      );
    }
    if (
      sLeague &&
      sLeague.rank &&
      (sLeague.rank > league.rankRange.max ||
        sLeague.rank < league.rankRange.min)
    ) {
      pushError(
        `Invalid rank value`,
        `Expected rank to be in range of <${league.rankRange.min}; ${league.rankRange.max}>`
      );
    }
    if (sProfileIconId && isNaN(sProfileIconId)) {
      pushError(
        'Invalid type',
        'Expected profileIconId to be a number, but got NaN instead'
      );
    }
  };

  validatePersonal();
  validateGame();
  validateSummoner();

  if (errors.length) {
    throw new BadRequestError(errors);
  }

  return data;
};

const sanitize = (data) => {
  const { personal, game, summoner } = data;

  const sanitizePersonal = () => {
    let sanitized = {};
    if (personal.hasOwnProperty('id')) {
      sanitized = { ...sanitized, id: personal.id.toString().trim() };
    }
    if (personal.hasOwnProperty('name')) {
      sanitized = { ...sanitized, name: personal.name.toString().trim() };
    }
    if (personal.hasOwnProperty('image')) {
      sanitized = { ...sanitized, image: personal.image.toString().trim() };
    }
    if (personal.hasOwnProperty('email')) {
      sanitized = { ...sanitized, email: personal.email.toString().trim() };
    }
    return sanitized;
  };

  const sanitizeGame = () => {
    let sanitized = {};
    if (game.hasOwnProperty('region')) {
      sanitized = {
        ...sanitized,
        region: game.region
          ? game.region.toString().trim().toUpperCase()
          : null,
      };
    }
    return sanitized;
  };

  const sanitizeLeague = () => {
    let sanitized = {};
    if (summoner.league.hasOwnProperty('tier')) {
      sanitized = {
        ...sanitized,
        tier: summoner.league.tier
          ? summoner.league.tier.toString().trim().toUpperCase()
          : null,
      };
    }
    if (summoner.league.hasOwnProperty('rank')) {
      sanitized = {
        ...sanitized,
        rank: summoner.league.rank ? Number(summoner.league.rank) : null,
      };
    }
    return sanitized;
  };

  const sanitizeSummoner = () => {
    let sanitized = {};
    if (summoner.hasOwnProperty('accountId')) {
      sanitized = {
        ...sanitized,
        accountId: summoner.accountId
          ? summoner.accountId.toString().trim()
          : null,
      };
    }
    if (summoner.hasOwnProperty('puuid')) {
      sanitized = {
        ...sanitized,
        puuid: summoner.puuid
          ? summoner.puuid.toString().trim().toUpperCase()
          : null,
      };
    }
    if (summoner.hasOwnProperty('name')) {
      sanitized = {
        ...sanitized,
        name: summoner.name ? summoner.name.toString().trim() : null,
      };
    }
    if (summoner.hasOwnProperty('profileIconId')) {
      sanitized = {
        ...sanitized,
        profileIconId: summoner.profileIconId
          ? Number(summoner.profileIconId)
          : null,
      };
    }
    if (summoner.hasOwnProperty('league')) {
      sanitized = {
        ...sanitized,
        league: sanitizeLeague(),
      };
    }
    return sanitized;
  };

  let sanitized = {};

  if (personal) {
    sanitized = { ...sanitized, personal: sanitizePersonal() };
  }
  if (game) {
    sanitized = { ...sanitized, game: sanitizeGame() };
  }
  if (summoner) {
    sanitized = { ...sanitized, summoner: sanitizeSummoner() };
  }

  return sanitized;
};

module.exports = { doc, create, validate };
