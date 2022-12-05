require('dotenv/config');

const { verify } = require('jsonwebtoken');

const isAuth = (req) => {
  const authorization = req.headers['authorization'];

  if (!authorization) throw new Error('you need to login');

  const token = authorization.split(' ')[1];

  const { username } = verify(token, process.env.TOKEN);

  return username;
};

module.exports = isAuth;
