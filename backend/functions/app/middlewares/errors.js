const { HttpError, createError } = require('../errors/http_error');

const logErrors = (err, req, res, next) => {
  console.error('Logging API error', err);
  next(err);
};

const handleErrors = (err, req, res, next) => {
  const { response } =
    err instanceof HttpError
      ? err
      : new HttpError({
          status: 500,
          name: err.name,
          errors: [createError({ message: err.message })],
        });
  res
    .status(response.status)
    .set(response.headers)
    .send({ errors: response.errors });
};

module.exports = {
  logErrors,
  handleErrors,
};
