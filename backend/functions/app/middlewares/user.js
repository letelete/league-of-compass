const User = require('../models/database/user');
const { createError } = require('../errors/http_error');
const { NotFoundError } = require('../errors/4xx');

const validateUserFromPayload = async (req, res, next) => {
  const { id: userId } = res.locals.userPayload;
  const userData = await User.doc(userId).getData();

  if (!userData) {
    const error = createError('User not found', {
      details: 'User must register before accessing the data',
    });
    throw new NotFoundError([error]);
  }

  res.locals.userData = userData;
  return next();
};

module.exports = { validateUserFromPayload };
