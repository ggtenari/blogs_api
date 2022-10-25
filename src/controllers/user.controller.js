require('dotenv/config');
const jwt = require('jsonwebtoken');
const validation = require('./validations/validations');

const secret = process.env.JWT_SECRET;
const userService = require('../services/user.service');

const jwtConfig = {
  expiresIn: '7d',
  algorithm: 'HS256',
};

const login = async (req, res) => {
  try {
    const userData = req.body;

  if (!userData.email || !userData.password) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const user = await userService.getUser(userData);

  if (!user) {
    return res.status(400).json({ message: 'Invalid fields' });
  }

  const token = jwt.sign({ data: { email: userData.email } }, secret, jwtConfig);
  res.status(200).json({ token });
} catch (err) {
  res.status(500).json({ message: 'Ocorreu um erro' });
}
};

const createUser = async (req, res) => {
  try {
    const userData = req.body;
    const userExists = await userService.getUserByEmail(req.body.email);
    if (userExists) {
      return res.status(409).json({ message: 'User already registered' });
    }
    const validateUser = validation.validateUser(userData);
    if (validateUser.type) {
      return res.status(400).json({ message: validateUser.message });
    }
    await userService.createUser(userData);
    const token = jwt.sign({ data: { email: userData.email } }, secret, jwtConfig);
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).json({ message: 'Ocorreu um erro' });
  }
};

module.exports = {
  login,
  createUser,
};