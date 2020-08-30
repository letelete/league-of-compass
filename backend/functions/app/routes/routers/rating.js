const Express = require('express');
const RatingController = require('../../controllers/rating_controller');
const UserController = require('../../controllers/user_controller');

require('../../helpers/async_wrapper');

const router = Express.Router();

router.get('/', RatingController.getAllChampionsRating);

router.get('/:championId', RatingController.getChampionRating);

module.exports = router;
