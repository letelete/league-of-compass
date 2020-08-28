const Yup = require('yup');

exports.attachWhenNotEmpty = (obj) => {
  return Yup.object().when({
    is: (obj) => obj && typeof obj === 'object' && Object.keys(obj).length,
    then: Yup.object().shape(obj),
  });
};
