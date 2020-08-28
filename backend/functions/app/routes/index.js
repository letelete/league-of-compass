const Express = require('express');

const AuthRouter = require('./routers/auth');
const UserRouter = require('./routers/user');

const router = Express.Router();

router.use('/auth', AuthRouter);

router.use('/users', UserRouter);

module.exports = router;
