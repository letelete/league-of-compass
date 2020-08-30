const User = require('../../models/database/user');
const Game = require('../../models/database/game');
const UserRating = require('../../models/database/rating/user_rating');
const { InternalServerError } = require('../../errors/5xx');
const { HttpError, createError } = require('../../errors/http_error');
const { BadRequestError, NotFoundError } = require('../../errors/4xx');
const { buildObjectFromQuery } = require('../../helpers/query');
const LolEndpoints = require('../../configs/lol_endpoints');
const RatingAttrs = require('../../models/database/rating/rating_attrs');
const { getRatingAttrsDelta } = require('../../helpers/rating_attrs');

const getUser = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const user = await getUserAsResponse(userId);
  res.status(200).send(user);
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

  const response = await getUserAsResponse(userId);
  res.status(201).send(response);
};

const getAllVotes = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const [ratings, { version: gameVersion }] = await Promise.all([
    UserRating.doc(userId).getAllRatings(),
    Game.doc().getData(),
  ]);
  const versionedLolEndpoints = LolEndpoints.endpoints(gameVersion);
  const allRatingsData = ratings.map((rating) => ({
    ...rating,
    champion: {
      ...rating.champion,
      image: versionedLolEndpoints.championAvatarById(rating.champion.id),
    },
  }));
  res.status(200).send({
    length: allRatingsData.length,
    data: allRatingsData,
  });
};

const calculateVoteDelta = async (req, res, next) => {
  const { championId } = req.params;
  const {
    personal: { id: userId },
  } = res.locals.userData;
  const newRating = req.body.ratings;

  const prevRating = await UserRating.doc(userId)
    .getRating(championId)
    .then((response) => response && response.ratings);

  res.locals.hasNotVotedForChampionYet = prevRating === null;
  res.locals.ratingsDelta = prevRating
    ? getRatingAttrsDelta(prevRating, newRating)
    : newRating;
  next();
};

const postVote = async (req, res, next) => {
  const { championId } = req.params;
  const { ratings } = req.body;
  const {
    personal: { id: userId },
    game,
    summoner,
  } = res.locals.userData;

  await UserRating.doc(userId).postRating(championId, { ratings });

  req.query = {
    ...req.query,
    region: game.region,
    tier: summoner.league.tier,
  };

  next();
};

const getVote = async (req, res) => {
  const { id: userId } = res.locals.userPayload;
  const { championId } = req.params;

  const rating = await UserRating.doc(userId).getRating(championId);
  if (!rating) {
    throw new NotFoundError([
      createError(`Rating with id ${championId} not found`),
    ]);
  }

  const { version: gameVersion } = await Game.doc().getData();
  const versionedLolEndpoints = LolEndpoints.endpoints(gameVersion);
  const ratingData = {
    ...rating,
    champion: {
      id: championId,
      image: versionedLolEndpoints.championAvatarById(championId),
    },
  };
  res.status(200).send(ratingData);
};

const getUserAsResponse = async (userId) => User.doc(userId).getData();

module.exports = {
  getUser,
  postUser,
  getAllVotes,
  calculateVoteDelta,
  postVote,
  getVote,
};
