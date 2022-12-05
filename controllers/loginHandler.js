const { compare } = require('bcryptjs');
const User = require('../models/userModel');
const {
  createAccessToken,
  createRefreshToken,
  sendRefreshToken,
  sendAccessToken,
} = require('./tokens');

const loginHandler = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.find({ username });

    if (user.length != 0) {
      const valid = await compare(password, user[0].password);

      if (!valid) throw new Error('password not valid');

      const accessToken = await createAccessToken(username);
      const refreshToken = await createRefreshToken(username);

      await User.updateOne(
        { username },
        { refreshToken, accessToken },
        { multi: true }
      );

      sendRefreshToken(res, refreshToken);
      sendAccessToken(res, username, accessToken);
    } else {
      throw new Error('user tidak ditemukan');
    }
  } catch (err) {
    res.send({
      error: `${err}`,
    });
  }
};

module.exports = loginHandler;
