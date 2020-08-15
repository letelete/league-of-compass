const router = require('express').Router();

router.use('/', (req, res, next) => {
  res.status(200).send({ message: 'Hello World! 🌍' });
});

module.exports = router;
