require('dotenv/config');

const { verify } = require('jsonwebtoken');
const User = require('../models/userModel');
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
} = require('./tokens');

const refreshTokenHandler = async (req, res) => {
  const token = req.cookies.refreshtoken;

  if (!token) return res.send({ accesstoken: '' });

  let payload = null;

  try {
    payload = verify(token, process.env.REFRESH_TOKEN);
  } catch (err) {
    return res.send({ accesstoken: '' });
  }

  const { username } = req.body;

  const user = User.find({ username });

  if (!user) return res.send({ accesstoken: '' });

  if (user.refreshToken != token) return res.send({ accesstoken: '' });

  const accesstoken = createAccessToken(username);
  const refreshtoken = createRefreshToken(username);

  await User.updateOne({ username }, { refreshToken }, { multi: true });

  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
};

module.exports = refreshTokenHandler;
