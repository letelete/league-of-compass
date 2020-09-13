const Express = require('express');

const AuthRouter = require('./routers/auth');
const UserRouter = require('./routers/user');
const RatingRouter = require('./routers/rating');
const ChampionsRouter = require('./routers/champions');

const router = Express.Router();

router.use('/auth', AuthRouter);

router.use('/users', UserRouter);

router.use('/ratings', RatingRouter);

router.use('/champions', ChampionsRouter);

module.exports = router;
