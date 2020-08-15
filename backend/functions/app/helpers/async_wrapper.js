/**
 * A required module that must be imported on top of the router file that performs async callbacks.
 *
 * It's a not intrusive hack that minimizes the code making it more readable
 * in comparison to the approach with wrapping each Async callback with the middleware function.
 *
 * @see {@link https://github.com/davidbanham/express-async-errors#how-does-this-work}
 */
module.exports = require('express-async-errors');
