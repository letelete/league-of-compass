const lol = require('../../configs/lol_endpoints');
const { createError } = require('../../errors/http_error');
const { InternalServerError } = require('../../errors/5xx');
const { BadRequestError } = require('../../errors/4xx');
const yup = require('yup');
const { response } = require('express');

const scoreSchema = yup
  .number()
  .required()
  .min(-1)
  .max(1)
  .test(
    'Decimals formatting',
    'Score field is incorrectly formatted. Expected format: X.YYYY, where X=<-1;1> (required), and Y=<0;9> (optional)',
    (value) => /^(-?)[0-1]((.[0-9]{1,4})|($))$/.test(value)
  );

const schema = yup.object().shape({
  championId: yup.string().required().trim(),
  difficulty: scoreSchema,
  excitement: scoreSchema,
});

const responseSchema = yup.object().shape({
  champion: yup.object().shape({
    id: yup.string().required().trim(),
    image: yup.string().required().url().trim(),
  }),
  scores: yup.object().shape({
    difficulty: scoreSchema,
    excitement: scoreSchema,
  }),
});

const validate = (data) => {
  let validated;
  try {
    validated = schema.validateSync(data);
  } catch (err) {
    throw new BadRequestError(err.errors);
  }
  return validated;
};

const create = validate;

const format = (data) => ({
  to: {
    response: (gameVersion) =>
      responseSchema.cast({
        champion: {
          id: data.championId,
          image: lol.endpoints(gameVersion).championAvatarById(data.championId),
        },
        scores: {
          difficulty: data.difficulty,
          excitement: data.excitement,
        },
      }),
  },
});

module.exports = { create, validate, format };
