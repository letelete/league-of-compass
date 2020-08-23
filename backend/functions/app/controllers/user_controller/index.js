const user = require('../../models/database/user');
const game = require('../../models/database/game');
const vote = require('../../models/database/vote');
const { InternalServerError } = require('../../errors/5xx');
const { HttpError, createError } = require('../../errors/http_error');
const { BadRequestError, NotFoundError } = require('../../errors/4xx');
const filterObject = require('../../helpers/object');
const { buildObjectFromQuery } = require('../../helpers/query');
const { query } = require('express');

const validateUser = async (req, res, next) => {
  const { id: userId } = res.locals.userPayload;
  const userData = await user.doc(userId).getData();

  if (!userData) {
    const error = createError('User not found', {
      details: 'User must register before accessing the data',
    });
    throw new NotFoundError([error]);
  }

  res.locals.userData = userData;
  return next();
};

const getUser = async (req, res) => {
  const response = res.locals.userData;
  res.status(200).send(response);
};

const postUser = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const { image, name, region, summoner_name: summonerName } = req.query;

  const queryTree = (obj, value) => ({
    image: { personal: { ...obj.personal, image: value } },
    name: { personal: { ...obj.personal, name: value } },
    region: { game: { ...obj.game, region: value } },
    summoner_name: { summoner: { ...obj.summoner, name: value } },
  });
  const data = buildObjectFromQuery(req.query, queryTree);

  await user.doc(userId).setData(data);

  const response = await user.doc(userId).getData();
  res.status(201).send(response);
};

const getVotes = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const [votes, { version: gameVersion }] = await Promise.all([
    user.doc(userId).getVotes(),
    game.getData(),
  ]);
  const normalizeVote = (voteEntry) => {
    return vote.normalizeForResponse(gameVersion, voteEntry);
  };

  const response = votes.map(normalizeVote);
  res.status(200).send(response);
};

const postVote = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const userDocRef = user.doc(userId);

  const { champion_id: championId, difficulty, excitement } = req.query;
  const voteData = {
    championId,
    difficulty,
    excitement,
  };
  const response = await userDocRef.setVote(voteData);

  res.status(201).send(response);
};

const getChampionVote = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const { championId } = req.params;

  const [voteData, { version: gameVersion }] = await Promise.all([
    user.doc(userId).getChampionVote(championId),
    game.getData(),
  ]);

  if (!voteData) throw new NotFoundError([createError('Vote not found')]);

  const response = vote.normalizeForResponse(gameVersion, voteData);

  res.status(200).send(response);
};

module.exports = {
  validateUser,
  getUser,
  postUser,
  getVotes,
  postVote,
  getChampionVote,
};
