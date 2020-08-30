const { Database } = require('../../configs/firebase');
const Regions = require('../lol_api/regions');
const League = require('../lol_api/league');
const Yup = require('yup');
const { BadRequestError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');

const {
  attachWhenNotEmpty,
} = require('../../helpers/Yup/attach_obj_when_not_empty');

const schema = Yup.object().shape({
  personal: attachWhenNotEmpty({
    id: Yup.string().trim(),
    name: Yup.string().trim(),
    image: Yup.string().url().trim(),
    email: Yup.string().email().trim(),
  }),
  game: attachWhenNotEmpty({
    region: Yup.string()
      .nullable()
      .lowercase()
      .trim()
      .test(
        'is region valid',
        `Invalid region. Expected one of following: ${Object.keys(
          Regions.data
        )}`,
        (region) => (region ? Regions.data.hasOwnProperty(region) : true)
      ),
  }),
  summoner: attachWhenNotEmpty({
    accountId: Yup.string().nullable().trim(),
    puuid: Yup.string().nullable().trim(),
    name: Yup.string().nullable().trim().min(3).max(16),
    profileIconId: Yup.number().nullable(),
    league: attachWhenNotEmpty({
      tier: Yup.string()
        .lowercase()
        .trim()
        .nullable()
        .test(
          'is tier valid',
          `Invalid tier. Expected one of following: ${Object.keys(
            League.tiers
          )}`,
          (tier) => (tier ? League.tiers.hasOwnProperty(tier) : true)
        ),
      rank: Yup.number().nullable().min(1).max(4),
    }),
  }),
});

const cast = (data) => schema.validateSync(data);

const doc = (id) => {
  const getData = async () => {
    return Database.doc(userPath)
      .get()
      .then((doc) => (doc.exists ? doc.data() : null));
  };

  const setData = async (data) => {
    const user = cast(data);
    return Database.doc(userPath).set(user, { merge: true });
  };

  const userPath = `users/${id}`;

  const ratingsPath = `users/${id}/ratings`;

  return Object.freeze({
    getData,
    setData,
  });
};

module.exports = { doc, cast };
