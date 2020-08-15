const { HttpError } = require('../http_error');
class InternalServerError extends HttpError {
  constructor(errors, { headers } = {}) {
    super({
      statusCode: 500,
      name: 'Internal Server Error',
      headers,
      errors,
    });
  }
}

module.exports = {
  InternalServerError,
};
