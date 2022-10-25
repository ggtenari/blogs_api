const { User } = require('../models');

const getUser = async (userDate) => {
  const user = await User.findOne({
    where: { email: userDate.email, password: userDate.password },
  });

  return user;
};

const createUser = async (userDate) => {
  const newUser = await User.create({
    displayName: userDate.displayName,
    email: userDate.email,
    password: userDate.password,
    image: userDate.image,
  });

  return newUser;
};

const getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: { email },
  });

  return user;
};

module.exports = { getUser, createUser, getUserByEmail };