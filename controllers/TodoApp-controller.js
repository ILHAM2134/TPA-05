require('dotenv/config');
const { compare } = require('bcryptjs');
const User = require('../models/userModel');
const isAuth = require('./isAuth');

const todoAppController = async (req, res) => {
  try {
    const username = isAuth(req);
    if (username) {
      const userDB = await User.find({ username });

      const userReq = req.headers['authorization'].split(' ')[1];

      const isValid = userReq == userDB[0].accessToken;

      if (!isValid) {
        throw new Error(`username token expired, try to login : ${username}`);
      }

      res.send({
        data: `successfully get you protected data`,
      });
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
};

module.exports = todoAppController;
