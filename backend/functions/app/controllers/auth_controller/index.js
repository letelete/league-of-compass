const user = require('../../models/database/user');
const { createError } = require('../../errors/http_error');

const fetchUserData = async (req, res, next) => {
  const {
    userPayload: { id: userId },
  } = res.locals;

  res.locals.userData = await user.doc(userId).getData();

  return next();
};

const createUserIfNoData = async (req, res, next) => {
  const { userPayload, userData } = res.locals;
  const userDocRef = user.doc(userPayload.id);

  if (userData) return next();

  res.locals.isUserNew = true;

  const createdUserData = user.create(userPayload);
  await userDocRef.setData(createdUserData);
  res.locals.userData = await userDocRef.getData();

  return next();
};

const respondWithUserData = async (req, res) => {
  const { userData, isUserNew } = res.locals;
  const status = isUserNew ? 201 : 200;

  if (!userData) {
    const missingDataError = createError(
      'Failure on responding with user data',
      {
        details: `Expected to respond with user data on user ${
          isUserNew ? 'register' : 'authorization'
        } action, but got an empty object instead.`,
      }
    );
    const errors = [missingDataError];
    throw new InternalServerError(errors);
  }

  return res.status(status).send(userData);
};

module.exports = {
  fetchUserData,
  createUserIfNoData,
  respondWithUserData,
};
