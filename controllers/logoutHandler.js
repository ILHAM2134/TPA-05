require('cookie-parser');

const logoutHandler = async (_req, res) => {
  try {
    res.clearCookie('refreshToken', { path: '/refresh_token' });
    return res.send({
      msg: 'logged out',
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = logoutHandler;
