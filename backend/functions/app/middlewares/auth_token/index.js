const validate = require('./validation');
const axios = require('axios');
const { createError } = require('../../errors/http_error');
const { UnauthorizedError } = require('../../errors/4xx');

const verifyGoogleAuthToken = async (req, res, next) => {
  validate.verifyGoogleTokenRequest(req);

  const idToken = req.body.id_token;

  const deserializeResponse = (response) => {
    const { sub: id, email, name, picture: image } = response.data;
    return { id, email, name, image };
  };

  res.locals.userPayload = await axios
    .get(`https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`)
    .then(deserializeResponse)
    .catch((err) => {
      if (err.response) {
        const errors = [createError('Invalid Google ID token')];
        throw new UnauthorizedError(errors);
      }
      throw err;
    });

  next();
};

module.exports = {
  verifyGoogleAuthToken,
};
