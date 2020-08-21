const { BadRequestError } = require('../../errors/4xx');
const allParams = require('./params');
const { createError } = require('../../errors/http_error');

const validate = {
  all: (req) => {
    let errors = [];
    const query = req.query;
    if (query.per_page > 50) {
      errors.push(
        createError(`Limit of 50 results for 'per_page' parameter exceeded`)
      );
    }
    if (query.per_page < 1) {
      errors.push(
        createError(`'per_page' parameter must be a positive number`)
      );
    }
    if (query.page < 0) {
      errors.push(createError(`'page' parameter must be a positive number`));
    }
    if (query.sort && !allParams.sort.hasOwnProperty(query.sort)) {
      errors.push(
        createError(`Invalid 'sort' parameter`, {
          details: `Expected one of the following: ${Object.keys(
            allParams.sort
          )}`,
        })
      );
    }
    if (query.order && !allParams.order.hasOwnProperty(query.order)) {
      errors.push(
        createError(`Invalid 'order' parameter`, {
          details: `Expected one of the following: ${Object.keys(
            allParams.order
          )}`,
        })
      );
    }
    handleErrors(errors);
    return req;
  },
};

const handleErrors = (errors) => {
  if (errors.length) {
    throw new BadRequestError(errors);
  }
};

module.exports = validate;
