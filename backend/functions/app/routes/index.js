const Express = require('express');

const AuthRouter = require('./routers/auth');
const UserRouter = require('./routers/user');
const RatingRouter = require('./routers/rating');
const ChampionsRouter = require('./routers/champions');
const AssetsRouter = require('./routers/assets');
const GameDataRouter = require('./routers/game_data');

const router = Express.Router();

router.use('/auth', AuthRouter);

router.use('/users', UserRouter);

router.use('/ratings', RatingRouter);

router.use('/champions', ChampionsRouter);

router.use('/assets', AssetsRouter);

router.use('/game-data', GameDataRouter);

module.exports = router;
