const Express = require('express');
const AuthController = require('../../controllers/auth_controller');
const { verifyGoogleAuthToken } = require('../../middlewares/auth_token');

require('../../helpers/async_wrapper');

const router = Express.Router();

router.post(
  '/google',
  verifyGoogleAuthToken,
  AuthController.fetchUserData,
  AuthController.createUserIfNoData,
  AuthController.respondWithUserData
);

module.exports = router;
