const router = require('express').Router();

const authRouter = require('./auth');
const championsRouter = require('./champions');

router.use('/auth', authRouter);

router.use('/champions', championsRouter);

module.exports = router;
