const Yup = require('yup');
const { BadRequestError } = require('../../errors/4xx');

const schema = Yup.object()
  .noUnknown()
  .shape({
    id: Yup.string().trim().required(),
    name: Yup.string().trim().required(),
    title: Yup.string().trim().required(),
    image: Yup.string().url().trim().required(),
    difficulty: Yup.number().required(),
    role: Yup.object().shape({
      main: Yup.string().trim(),
      all: Yup.object(),
    }),
    prefixes: Yup.object().shape({
      name: Yup.array(),
    }),
  });

const responseSchema = Yup.object()
  .noUnknown()
  .shape({
    id: Yup.string().trim().required(),
    name: Yup.string().trim().required(),
    title: Yup.string().trim().required(),
    image: Yup.string().url().trim().required(),
    difficulty: Yup.number().required(),
    role: Yup.object().shape({
      main: Yup.string().trim(),
      all: Yup.array(),
    }),
  });

const cast = (data) => {
  let casted;
  try {
    casted = schema.validateSync(data);
  } catch (err) {
    throw new BadRequestError(err.errors);
  }
  return casted;
};

const format = (data) => ({
  to: {
    response: () =>
      responseSchema.cast({
        ...data,
        role: { ...data.role, all: Object.keys(data.role.all) },
      }),
  },
});

module.exports = { cast, format };
