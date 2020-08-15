const router = require('express').Router();

const championsRouter = require('./champions');

router.use('/champions', championsRouter);

module.exports = router;
