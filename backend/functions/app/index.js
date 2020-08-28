const Express = require('express');
const BodyParser = require('body-parser');
const Cors = require('cors');
const AppRouter = require('./routes');
const { logErrors, handleErrors } = require('./middlewares/errors');

const app = Express();

app.use(Cors({ origin: true }));
app.use(BodyParser.json());
app.use(BodyParser.urlencoded({ extended: true }));

app.use('/', AppRouter);
app.use(logErrors);
app.use(handleErrors);

module.exports = app;
