const Express = require('express');
const GameDataController = require('../../controllers/game_data_controller');

require('../../helpers/async_wrapper');

const router = Express.Router();

router.use('/regions', GameDataController.getAllRegions);

router.use('/tiers', GameDataController.getAllTiers);

module.exports = router;
