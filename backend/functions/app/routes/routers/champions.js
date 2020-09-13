const Express = require('express');
const ChampionsController = require('../../controllers/champions_controller');
const { verifyGoogleAuthToken } = require('../../middlewares/auth_token');

require('../../helpers/async_wrapper');

const router = Express.Router();

router.get('/', verifyGoogleAuthToken, ChampionsController.getAllChampions);

module.exports = router;
