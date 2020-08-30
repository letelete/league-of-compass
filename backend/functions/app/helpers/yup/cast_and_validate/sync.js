const Yup = require('yup');
const { BadRequestError } = require('../../../errors/4xx');

Yup.addMethod(Yup.mixed, 'castAndValidateSync', function (data) {
  let casted;
  let errors;
  try {
    casted = this.validateSync(data);
  } catch (err) {
    errors = err.errors;
  }
  if (errors) throw new BadRequestError(errors);
  return casted;
});
