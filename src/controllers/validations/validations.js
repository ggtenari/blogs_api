const userValidation = require('../schemas/schemas');

const validateUser = (request) => {
  const { error } = userValidation.userRequest.validate(request);
  if (error) {
    return {
      type: 'INVALID_VALUE',
      message: error.message.replace(/\[\d+\]\./, ''),
    };
  } return { type: null, message: '' };
};

module.exports = { validateUser };