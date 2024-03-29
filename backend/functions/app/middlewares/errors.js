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
          errors: [createError(err.message)],
        });
  res.status(response.status).set(response.headers).send(response.data);
};

module.exports = {
  logErrors,
  handleErrors,
};
