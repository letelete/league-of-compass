const express = require('express');
const UserController = require('../controllers/user_controller');
const { verifyGoogleAuthToken } = require('../middlewares/auth_token');

require('../helpers/async_wrapper');

const router = express.Router();
const verifiedRouter = express.Router();

router.use(
  '/',
  verifyGoogleAuthToken,
  UserController.validateUser,
  verifiedRouter
);

verifiedRouter.get('/', UserController.getUser);

verifiedRouter.post('/', UserController.postUser);

verifiedRouter.get('/votes', UserController.getVotes);

verifiedRouter.post('/votes', UserController.postVote);

verifiedRouter.get('/votes/:championId', UserController.getChampionVote);

module.exports = router;
