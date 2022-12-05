const User = require('../models/userModel');
const { hash } = require('bcryptjs');

const registerHandler = async (req, res) => {
  const { username, password, fullName } = req.body;

  try {
    const user = await User.find({ username });

    if (user.length != 0) throw new Error(`User ${username} already exist`);

    const hashedPassword = await hash(password, 10);

    const saveUser = { username, password: hashedPassword, fullName };

    const newUser = new User(saveUser);
    newUser.save();

    res.json({
      msg: `account created success : ${username}`,
    });
  } catch (err) {
    res.status(400).json({
      msg: `account already exist : ${username}, try to login`,
    });
  }
};

module.exports = registerHandler;
