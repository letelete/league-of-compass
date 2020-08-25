const User = require('../../models/database/user');
const Game = require('../../models/database/game');
const Vote = require('../../models/database/vote');
const { InternalServerError } = require('../../errors/5xx');
const { HttpError, createError } = require('../../errors/http_error');
const { BadRequestError, NotFoundError } = require('../../errors/4xx');
const { buildObjectFromQuery } = require('../../helpers/query');

const validateUser = async (req, res, next) => {
  const { id: userId } = res.locals.userPayload;
  const userData = await User.doc(userId).getData();

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
  const userDocRef = User.doc(userId);

  const queryTree = (obj, value) => ({
    image: { personal: { ...obj.personal, image: value } },
    name: { personal: { ...obj.personal, name: value } },
    region: { game: { ...obj.game, region: value } },
    summoner_name: { summoner: { ...obj.summoner, name: value } },
  });
  const data = buildObjectFromQuery(req.body, queryTree);
  await userDocRef.setData(data);

  const response = await userDocRef.getData();

  res.status(201).send(response);
};

const getVotes = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const [votes, { version: gameVersion }] = await Promise.all([
    User.doc(userId).getVotes(),
    Game.doc().getData(),
  ]);
  const response = votes.map((vote) =>
    Vote.format(vote).to.response(gameVersion)
  );
  res.status(200).send(response);
};

const postVote = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const userDocRef = User.doc(userId);

  const { champion_id: championId, difficulty, excitement } = req.body;
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
    User.doc(userId).getChampionVote(championId),
    Game.doc().getData(),
  ]);

  if (!voteData) throw new NotFoundError([createError('Vote not found')]);

  const response = Vote.format(voteData).to.response(gameVersion);

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
