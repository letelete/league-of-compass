const LolEndpoints = require('../../configs/lol_endpoints');
const Yup = require('yup');
const { createError } = require('../../errors/http_error');
const { InternalServerError } = require('../../errors/5xx');
const { BadRequestError } = require('../../errors/4xx');
const { response } = require('express');

const scoreSchema = Yup.number()
  .required()
  .min(-1)
  .max(1)
  .test(
    'Decimals formatting',
    'Score field is incorrectly formatted. Expected format: X.YYYY, where X=<-1;1> (required), and Y=<0;9> (optional)',
    (value) => /^(-?)[0-1]((.[0-9]{1,4})|($))$/.test(value)
  );

const schema = Yup.object().shape({
  championId: Yup.string().required().trim(),
  difficulty: scoreSchema,
  excitement: scoreSchema,
});

const responseSchema = Yup.object().shape({
  champion: Yup.object().shape({
    id: Yup.string().required().trim(),
    image: Yup.string().required().url().trim(),
  }),
  scores: Yup.object().shape({
    difficulty: scoreSchema,
    excitement: scoreSchema,
  }),
});

const cast = (data) => {
  let validated;
  try {
    validated = schema.validateSync(data);
  } catch (err) {
    throw new BadRequestError(err.errors);
  }
  return validated;
};

const format = (data) => ({
  to: {
    response: (gameVersion) =>
      responseSchema.cast({
        champion: {
          id: data.championId,
          image: LolEndpoints.endpoints(gameVersion).championAvatarById(
            data.championId
          ),
        },
        scores: {
          difficulty: data.difficulty,
          excitement: data.excitement,
        },
      }),
  },
});

module.exports = { cast, format };
