const Express = require('express');
const UserController = require('../../controllers/user_controller');
const { validateUserFromPayload } = require('../../middlewares/user');
const { verifyGoogleAuthToken } = require('../../middlewares/auth_token');
const RatingController = require('../../controllers/rating_controller');

require('../../helpers/async_wrapper');

const router = Express.Router();
const verifiedRouter = Express.Router();

router.use('/', verifyGoogleAuthToken, validateUserFromPayload, verifiedRouter);

verifiedRouter.get('/', UserController.getUser);

verifiedRouter.post('/', UserController.postUser);

verifiedRouter.get('/votes', UserController.getAllVotes);

verifiedRouter.post(
  '/votes/:championId',
  UserController.calculateVoteDelta,
  UserController.postVote,
  RatingController.postChampionRating,
  RatingController.getChampionRating
);

verifiedRouter.get('/votes/:championId', UserController.getVote);

module.exports = router;
