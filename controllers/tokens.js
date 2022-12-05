const { sign } = require('jsonwebtoken');

const createAccessToken = (username) => {
  return sign({ username }, process.env.TOKEN, {
    expiresIn: '1h',
  });
};

const createRefreshToken = (username) => {
  return sign({ username }, process.env.REFRESH_TOKEN, {
    expiresIn: '3d',
  });
};

const sendAccessToken = (res, username, accesstoken) => {
  res.send({
    username,
    accesstoken,
  });
};

const sendRefreshToken = (res, refreshtoken) => {
  res.cookie('refreshToken', refreshtoken, {
    httpOnly: true,
    path: '/refresh_token',
  });
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
};
