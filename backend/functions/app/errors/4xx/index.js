const { HttpError } = require('../http_error');

class BadRequestError extends HttpError {
  constructor(errors, { headers } = {}) {
    super({
      status: 400,
      name: 'Bad Request',
      headers,
      errors,
    });
  }
}

class UnauthorizedError extends HttpError {
  constructor(errors, { headers } = {}) {
    super({
      status: 401,
      name: 'Unauthorized',
      headers,
      errors,
    });
  }
}

class ForbiddenError extends HttpError {
  constructor(errors, { headers } = {}) {
    super({
      status: 403,
      name: 'Forbidden',
      headers,
      errors,
    });
  }
}

class NotFoundError extends HttpError {
  constructor(errors, { headers } = {}) {
    super({
      status: 404,
      name: 'Not Found',
      headers,
      errors,
    });
  }
}

class TooManyRequestsError extends HttpError {
  constructor(errors, { headers } = {}) {
    super({
      status: 429,
      name: 'Too Many Requests',
      headers,
      errors,
    });
  }
}

module.exports = {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  TooManyRequestsError,
};
