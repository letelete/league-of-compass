class HttpError extends Error {
  constructor({ status, headers, name, errors }) {
    super(errors.reduce((msg, next) => `${msg},\n${next}`));

    const defaultStatus = 500;
    const defaultHeaders = { 'Content-Type': 'application/json' };
    const defaultError = {
      message: 'An exception with no details provided has been thrown',
      details:
        'If you see this error, please create a new issue with detailed description in the project repository. https://github.com/letelete/league-of-compass/issues/new',
    };

    this.response = {
      status: status || defaultStatus,
      headers: { ...defaultHeaders, ...headers },
      data: {
        errors: errors || [defaultError],
      },
    };
  }
}

const createError = (message, { details } = {}) => ({ message, details });

module.exports = { HttpError, createError };
