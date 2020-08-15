const router = require('express').Router();
require('../helpers/async_wrapper');

const ChampionsController = require('../controllers/champions_controller');

router.get('/', ChampionsController.getAll);

module.exports = router;
