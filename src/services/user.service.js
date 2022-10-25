const { User } = require('../models');

const getUser = async (userDate) => {
  const user = await User.findOne({
    where: { email: userDate.email, password: userDate.password },
  });

  return user;
};

module.exports = { getUser };