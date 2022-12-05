const router = require('express').Router();

const loginRoute = require('./login-route');
const logoutRoute = require('./logout-route');
const TodoApp = require('./TodoApp');
const refreshTokenRoute = require('./refreshToken-route');
const registerRoute = require('./register-route');
const todoRoute = require('./todo-route');

router.use('/login', loginRoute);
router.use('/register', registerRoute);
router.use('/logout', logoutRoute);
router.use('/protected', TodoApp);
router.use('/refresh_token', refreshTokenRoute);
router.use('/todo', todoRoute);

module.exports = router;
