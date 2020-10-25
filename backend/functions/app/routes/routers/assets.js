const Express = require('express');
const Path = require('path');

const router = Express.Router();

router.use(
  '/game/regions',
  Express.static(Path.join(__dirname, '../../assets/images/regions'))
);

router.use(
  '/game/tiers',
  Express.static(Path.join(__dirname, '../../assets/images/tiers'))
);

module.exports = router;
