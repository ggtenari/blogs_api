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

const getAllUsers = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  return user;
};

const deleteUser = async (id) => {
    await User.destroy({ where: { id } });
};

module.exports = { getUser, createUser, getUserByEmail, getAllUsers, getUserById, deleteUser };