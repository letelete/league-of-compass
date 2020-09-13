const Yup = require('yup');
const { BadRequestError } = require('../../errors/4xx');
const { Database } = require('../../configs/firebase');

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

const format = {
  to: {
    response: (data) =>
      responseSchema.cast({
        ...data,
        role: { ...data.role, all: Object.keys(data.role.all) },
      }),
  },
};

const getAllChampions = async ({ searchName }) => {
  let ref = Database.collection('champions');

  if (searchName) {
    ref = ref.where('prefixes.name', 'array-contains', searchName);
  }

  return ref.get().then((snapshot) => snapshot.docs.map((doc) => doc.data()));
};

module.exports = { cast, format, getAllChampions };
