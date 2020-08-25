const yup = require('yup');

exports.attachWhenNotEmpty = (obj) => {
  return yup.object().when({
    is: (obj) => obj && typeof obj === 'object' && Object.keys(obj).length,
    then: yup.object().shape(obj),
  });
};
