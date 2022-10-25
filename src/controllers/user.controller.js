require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;
const userService = require('../services/user.service');

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

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { email: userData.email } }, secret, jwtConfig);
  res.status(200).json({ token });
} catch (err) {
  res.status(500).json({ message: 'Ocorreu um erro' });
}
};

module.exports = {
  login,
};