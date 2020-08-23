const lol = require('../../configs/lol_endpoints');
const { createError } = require('../../errors/http_error');
const { InternalServerError } = require('../../errors/5xx');
const { BadRequestError } = require('../../errors/4xx');
const { roundToNDecimalPlaces } = require('../../helpers/math');

const scoreRange = {
  min: -1.0,
  max: 1.0,
};

const normalizeForResponse = (gameVersion, data) => {
  const { championId, difficulty, excitement } = data;
  const versionedLolEndpoints = lol.endpoints(gameVersion);
  const championImage = versionedLolEndpoints.championAvatarById(championId);
  return {
    champion: {
      id: championId,
      image: championImage,
    },
    scores: {
      difficulty,
      excitement,
    },
  };
};

const validate = (data) => {
  const { championId, difficulty, excitement } = data;
  let errors = [];

  const pushError = (msg, details = null) =>
    errors.push(createError(msg, (details && { details }) || {}));

  const validateEmptiness = (data, name) => {
    if (!data) {
      pushError(
        'Empty field',
        `Expected ${name} to have a value, but got an empty object instead`
      );
    }
  };

  const validateScore = (score, name) => {
    if (isNaN(score)) {
      pushError(`Invalid score type`, `${name} must be a number`);
    }
    if (score > scoreRange.max || score < scoreRange.min) {
      pushError(
        `Score value exceeds the score range`,
        `${name} must be in range of <${scoreRange.min}; ${scoreRange.max}>`
      );
    }
  };

  validateEmptiness(championId, 'Champion ID');
  validateEmptiness(difficulty, 'Difficulty');
  validateEmptiness(excitement, 'Excitement');

  validateScore(difficulty, 'Difficulty');
  validateScore(excitement, 'Excitement');

  if (errors.length) throw new BadRequestError(errors);
  return data;
};

const sanitize = (data) => {
  const { championId, difficulty, excitement } = data;
  const roundScore = (score) => roundToNDecimalPlaces(score, 4);
  return {
    championId: championId.toString().trim(),
    difficulty: roundScore(Number(difficulty)),
    excitement: roundScore(Number(excitement)),
  };
};

module.exports = { normalizeForResponse, validate, sanitize };
