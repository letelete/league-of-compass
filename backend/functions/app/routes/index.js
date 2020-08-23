const router = require('express').Router();

const authRouter = require('./auth');
const championsRouter = require('./champions');
const userRouter = require('./user');

router.use('/auth', authRouter);

router.use('/champions', championsRouter);

router.use('/users', userRouter);

module.exports = router;
