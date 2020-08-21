const router = require('express').Router();
require('../helpers/async_wrapper');

const AuthController = require('../controllers/auth_controller');
const { verifyGoogleAuthToken } = require('../middlewares/auth_token');

router.post(
  '/google',
  verifyGoogleAuthToken,
  AuthController.fetchUserData,
  AuthController.createUserIfNoData,
  AuthController.respondWithUserData
);

module.exports = router;
