const Yup = require('yup');
const League = require('../../models/lol_api/league');
const Game = require('../../models/database/game');
const ChampionRating = require('../../models/database/rating/champion_rating');
const RatingAttrs = require('../../models/database/rating/rating_attrs');
const LolEndpoints = require('../../configs/lol_endpoints');
const { NotFoundError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');

const getRatingPathFromQuery = (query) => {
  const region = query.region || RatingAttrs.paths.global.region;
  const tier = query.tier || RatingAttrs.paths.global.tier;
  return { region, tier };
};

const getAllChampionsRating = async (req, res) => {
  const attrs = getRatingPathFromQuery(req.query);
  const [ratingsData, game] = await Promise.all([
    ChampionRating.getAllRatings(attrs),
    Game.doc().getData(),
  ]);

  const ratings = await Object.entries(ratingsData).map(([championId, data]) =>
    ChampionRating.format.to.response({
      championId,
      gameVersion: game.version,
      rating: ChampionRating.filterWithAttrs(data, attrs),
    })
  );

  res.status(200).send({
    length: ratings.length,
    data: ratings,
  });
};

const getChampionRating = async (req, res) => {
  const { championId } = req.params;
  const attrs = getRatingPathFromQuery(req.query);
  const [rating, game] = await Promise.all([
    ChampionRating.getRating(championId).then((rating) =>
      ChampionRating.filterWithAttrs(rating, attrs)
    ),
    Game.doc().getData(),
  ]);

  if (!rating) {
    throw new NotFoundError([
      createError(
        `No one has voted for ${championId} with ${Object.entries(attrs).map(
          ([key, val]) => `<${key}: ${val}>`
        )} yet`
      ),
    ]);
  }

  const response = ChampionRating.format.to.response({
    championId,
    gameVersion: game.version,
    rating,
  });

  res.status(200).send(response);
};

const postChampionRating = async (req, res, next) => {
  const { championId } = req.params;
  const { ratingsDelta: ratings } = res.locals;
  const attrs = getRatingPathFromQuery(req.query);

  await ChampionRating.postRatings({
    championId,
    attrs,
    ratings,
    isAuthorUnique: res.locals.hasNotVotedForChampionYet,
  });

  next();
};

module.exports = {
  getAllChampionsRating,
  getChampionRating,
  postChampionRating,
};
