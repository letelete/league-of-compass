const { BadRequestError } = require('../../errors/4xx');
const { createError } = require('../../errors/http_error');

const validate = {
  verifyGoogleTokenRequest: (req) => {
    let errors = [];
    const idToken = req.body.id_token;
    if (!idToken) {
      errors.push(createError('Given Google Id token is empty'));
    }
    handleErrors(errors);
  },
};

const handleErrors = (errors) => {
  if (errors.length) throw new BadRequestError(errors);
};

module.exports = validate;
